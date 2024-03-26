import { ReactNode, useState } from "react";
import Window from "./Window";
import { INodeWithId } from "../general/interfaces";

interface iProps {
  iconName: string;
  name: string;
  addWindow: (data: INodeWithId) => void;
  closeWindow: (id: number) => void;
  result?: ReactNode;
  windowContent?: ReactNode;
  id: number;
}
export default function DesktopIcon({
  iconName,
  name,
  addWindow,
  closeWindow,
  result,
  windowContent,
  id,
}: iProps) {
  const tryToAddWindow = () => {
    addWindow({ id, node: <Window closeWindow={tryToCloseWindow} /> });
  };

  const tryToCloseWindow = () => {
    closeWindow(id);
  };
  return (
    <div className="desktop-icon" onDoubleClick={tryToAddWindow}>
      <div
        className="image-selected"
        style={{
          maskImage: `url(src/assets/${iconName})`,
          WebkitMaskImage: `url(src/assets/${iconName})`,
        }}
      ></div>
      <img
        className="icon-img"
        src={`src/assets/${iconName}`}
        style={{ pointerEvents: "none" }}
      ></img>
      <div className="icon-name">{name}</div>
      {/* {isOpen && <Window closeWindow={closePopup} />} */}
    </div>
  );
}
