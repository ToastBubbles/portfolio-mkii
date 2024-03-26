import { ReactNode, useEffect, useRef, useState } from "react";
import DesktopIcon from "../components/DesktopIcon";

interface ISlot {
  id: number | undefined;
  row: number;
  col: number;
  x: number;
  y: number;
  icon: ReactNode | undefined;
}

export default function Desktop() {
  const minX = 80;
  const minY = 93;
  const [slots, setSlots] = useState<ISlot[]>([]);
  const desktopRef = useRef<HTMLDivElement>(null);
  const [draggedIconId, setDraggedIconId] = useState<number | undefined>(
    undefined
  );
  const [offestX, setOffsetX] = useState<number | undefined>(undefined);
  const [offestY, setOffsetY] = useState<number | undefined>(undefined);
  const [dragging, setDragging] = useState(false);

  const initialIcons: ReactNode[] = [
    <DesktopIcon
      key={0}
      name="Recycle Bin"
      iconName="bin_empty.png"
      clickFn={binClick}
    />,
    <DesktopIcon
      key={1}
      name="Recycle Bin"
      iconName="bin_empty.png"
      clickFn={binClick}
    />,
  ];
  useEffect(() => {
    if (slots.length == 0) {
      genSlots();
    }
  }, [slots]);

  return (
    <div className="desktop" ref={desktopRef}>
      {slots.map((slot) => {
        if (slot.icon != undefined) {
          return (
            <div
              key={`${slot.row}-${slot.col}`}
              draggable="true"
              style={{
                position: "absolute",
                left: `${slot.x}px`,
                top: `${slot.y}px`,
              }}
              className={dragging ? "dragging" : "clickable"}
              onDragStart={(e) => {
                setOffsetX(e.clientX - slot.x);
                setOffsetY(e.clientY - slot.y);
                setDragging(true);
              }}
              onDragEnd={(e) => {
                setDragging(false);
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
    console.log(
      "Desktop Width:",
      desktopWidth,
      "Desktop Height:",
      desktopHeight
    );
    console.log("Columns: ", columns, "Rows: ", rows);
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
          row: r,
          col: c,
          x: c * minX,
          y: r * minY,
          icon,
        });
      }
    }
    console.log(slotPosistions);

    setSlots(slotPosistions);
  }

  function binClick() {
    console.log("click");
  }
}
