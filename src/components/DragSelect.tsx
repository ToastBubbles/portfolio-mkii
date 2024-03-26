import { useEffect } from "react";
import { coords } from "../general/interfaces";

interface iProps {
  startPos: coords | undefined;
  mousePos: coords | undefined;
}
export default function DragSelect({ startPos, mousePos }: iProps) {
  if (startPos == undefined || mousePos == undefined) return null;

  // Calculate the width and height of the rectangle
  const width = Math.abs(mousePos.x - startPos.x);
  const height = Math.abs(mousePos.y - startPos.y);

  // Calculate the left and top positions of the rectangle
  const left = Math.min(startPos.x, mousePos.x);
  const top = Math.min(startPos.y, mousePos.y);

  return (
    <div
      className="drag-select"
      style={{
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        border: "1px dashed #000",
        pointerEvents: "none", // Ensure the selection rectangle doesn't capture mouse events
      }}
    ></div>
  );
}
