import { useState } from "react";
import { coords } from "../general/interfaces";

interface iProps {
  closeWindow: () => void;
}
export default function Window({ closeWindow }: iProps) {
  const [count, setCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<coords>({ x: 0, y: 0 });
  const [windowPosition, setWindowPosition] = useState<coords>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("clickeds");

    setIsDragging(true);
    const offsetX = e.clientX - windowPosition.x;
    const offsetY = e.clientY - windowPosition.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    setWindowPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <div
      style={{
        width: 300,
        position: "absolute",
        top: windowPosition.y,
        left: windowPosition.x,
      }}
      className="window"
    >
      <div
        className="title-bar"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: 'default' }}
      >
        <div className="title-bar-text">Counter</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" onClick={() => closeWindow()} />
        </div>
      </div>{" "}
      <div className="window-body">
        <p style={{ textAlign: "center" }}>Current count: {count}</p>
        <div className="field-row" style={{ justifyContent: "center" }}>
          <button onClick={() => setCount(count + 1)}>+</button>
          <button onClick={() => setCount(count - 1)}>-</button>
          <button onClick={() => setCount(0)}>0</button>
        </div>
      </div>
    </div>
  );
}
