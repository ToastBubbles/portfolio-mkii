import { ReactNode } from "react";
import FolderLeftPane from "./FolderLeftPane";
import { useNavigate } from "react-router";

interface iProps {
  title: string;
  content: ReactNode;
}

export default function FullscreenWindow({ title, content }: iProps) {
  const navigate = useNavigate();
  return (
    <div className="window fullscreen">
      <div className="title-bar" style={{ cursor: "default" }}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button
            aria-label="Close"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      </div>
      <div className="window-body fg-1">
        <div className="window-body-container">
          <div className="window-body-inner-border">
            <FolderLeftPane
              title="Projects"
              iconName="internet_folder.png"
              project={undefined}
            />
            {content}
          </div>
        </div>
      </div>
      <div className="window-footer">
        <div style={{ width: "30%", marginRight: "2px" }} className="verdana">
          3 object(s)
        </div>
        <div className="fg-1"></div>
        <div className="my-pc-win-footer verdana">
          <img
            style={{ marginRight: "5px" }}
            src="src/assets/computer1.png"
          ></img>
          My Computer
        </div>
      </div>
    </div>
  );
}
