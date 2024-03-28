import { ReactNode, useEffect, useRef, useState } from "react";
import DesktopIcon from "../components/DesktopIcon";
import { coords } from "../general/interfaces";
import DragSelect from "../components/DragSelect";
// import { initialIcons } from "../general/desktopExports";

interface ISlot {
  id: number;
  selected: boolean;
  x: number;
  y: number;
  icon: ReactNode | undefined;
}

export default function Desktop() {
  const minX = 80;
  const minY = 93;
  const [slots, setSlots] = useState<ISlot[]>([]);
  const desktopRef = useRef<HTMLDivElement>(null);
  const [selectedIconId, setSelectedIconId] = useState<number | undefined>(
    undefined
  );

  const [offestX, setOffsetX] = useState<number | undefined>(undefined);
  const [offestY, setOffsetY] = useState<number | undefined>(undefined);
  const [draggingIcon, setDraggingIcon] = useState(false);
  const [dragSelect, setDragSelect] = useState(false);
  const [dragSelectStart, setDragSelectStart] = useState<coords | undefined>(
    undefined
  );

  const [dragSelectMousePos, setDragSelectMousePos] = useState<
    coords | undefined
  >(undefined);

  useEffect(() => {
    if (slots.length == 0) {
      genSlots();
    }
  }, [slots]);
  useEffect(() => {}, [dragSelect]);
  function handleMouseDown(e: any) {
    if (!draggingIcon) {
      setDragSelectStart({ x: e.clientX, y: e.clientY });
    }
  }

  function handleMouseMove(e: any) {
    if (!draggingIcon) {
      setDragSelect(true);
      setDragSelectMousePos({ x: e.clientX, y: e.clientY });
    } else {
      setDragSelect(false);
      setDragSelectStart(undefined);
      setDragSelectMousePos(undefined);
    }
  }

  function handleMouseUp() {
    setDragSelect(false);
    setDragSelectStart(undefined);
    markIconsInSelection();
  }
  const initialIcons: ReactNode[] = [
    <DesktopIcon
      key={0}
      name="Projects"
      iconName="folder.png"
      link={"/projects"}
    />,
    <DesktopIcon
      key={1}
      name="Recycle Bin"
      iconName="bin_empty.png"
      link={"/bin"}
    />,
  ];
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInsideProject = target.closest(".clickable");
      if (!isInsideProject) {
        setSelectedIconId(undefined);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="desktop"
      ref={desktopRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <DragSelect startPos={dragSelectStart} mousePos={dragSelectMousePos} />
      {slots.map((slot) => {
        if (slot.icon != undefined) {
          return (
            <div
              onClick={() => {
                if (slot.icon != undefined) setSelectedIconId(slot.id);
              }}
              key={slot.id}
              draggable="true"
              style={{
                position: "absolute",
                left: `${slot.x}px`,
                top: `${slot.y}px`,
              }}
              className={`${
                slot.selected || selectedIconId == slot.id
                  ? "selected-icon"
                  : ""
              } ${draggingIcon ? "dragging" : "clickable"}`}
              onDragStart={(e) => {
                setDraggingIcon(true);
                setOffsetX(e.clientX - slot.x);
                setOffsetY(e.clientY - slot.y);
              }}
              onDragEnd={(e) => {
                setDraggingIcon(false);
                console.log("Mouse Coordinates:", e.clientX, e.clientY);
                handleDragIcon(e.clientX, e.clientY, slot);
              }}
            >
              {slot.icon}
            </div>
          );
        }
      })}
    </div>
  );
  function markIconsInSelection() {
    const selectedIconIds: number[] = [];
    if (!dragSelectStart || !dragSelectMousePos) return;

    const minX = Math.min(dragSelectStart.x, dragSelectMousePos.x);
    const maxX = Math.max(dragSelectStart.x, dragSelectMousePos.x);
    const minY = Math.min(dragSelectStart.y, dragSelectMousePos.y);
    const maxY = Math.max(dragSelectStart.y, dragSelectMousePos.y);

    const updatedSlots = slots.map((slot) => {
      const slotX = slot.x;
      const slotY = slot.y;

      const isSelected =
        slot.icon != undefined &&
        slotX >= minX &&
        slotX + minX <= maxX &&
        slotY >= minY &&
        slotY + minY <= maxY;

      if (isSelected) {
        selectedIconIds.push(slot.id);
      }

      return {
        ...slot,
        selected: isSelected,
      };
    });

    setSlots(updatedSlots);
  }
  function handleDragIcon(mouseX: number, mouseY: number, slot: ISlot) {
    if (slot.id == undefined) return;
    let xOffset = offestX ? offestX : 10;
    let yOffset = offestY ? offestY : 10;

    let closestSlot: ISlot | undefined;
    let minDistance: number | undefined;

    slots.forEach((slot) => {
      const distance = Math.sqrt(
        Math.pow(slot.x - (mouseX - xOffset), 2) +
          Math.pow(slot.y - (mouseY - yOffset), 2)
      ); //the minus ten is to simulate the mouse being closer to the top left corner

      if (minDistance === undefined || distance < minDistance) {
        minDistance = distance;
        closestSlot = slot;
      }
    });

    if (closestSlot !== undefined && closestSlot !== slots[slot.id]) {
      // Reassign the icon from the old slot to the new slot
      closestSlot.icon = slots[slot.id].icon;
      // Set the old slot's icon to undefined
      slots[slot.id].icon = undefined;

      // Update state to reflect the changes
      setSlots([...slots]);
    }
    setOffsetX(undefined);
    setOffsetY(undefined);
  }

  function genSlots() {
    if (!desktopRef.current) return;
    const desktopWidth = desktopRef.current.clientWidth;
    const desktopHeight = desktopRef.current.clientHeight;
    const columns = Math.floor(desktopWidth / minX);
    const rows = Math.floor(desktopHeight / minY);

    let slotPosistions: ISlot[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        let id = c + r * columns;
        let icon = undefined;
        if (initialIcons[id]) {
          icon = initialIcons[id];
        }
        slotPosistions.push({
          id,
          selected: false,
          x: c * minX,
          y: r * minY,
          icon,
        });
      }
    }

    setSlots(slotPosistions);
  }
}
