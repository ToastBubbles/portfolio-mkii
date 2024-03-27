import { ReactNode } from "react";
import FolderLeftPane from "./FolderLeftPane";

interface iProps {
  title: string;
  content: ReactNode;
}

export default function FullscreenWindow({ title, content }: iProps) {
  return (
    <div className="window fullscreen">
      <div className="title-bar" style={{ cursor: "default" }}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" onClick={() => {}} />
        </div>
      </div>
      <div className="window-body" style={{ height: "100%" }}>
        <div className="window-body-container">
          <FolderLeftPane
            title="Projects"
            iconName="internet_folder.png"
            project={undefined}
          />
          {content}
        </div>
      </div>
    </div>
  );
}
