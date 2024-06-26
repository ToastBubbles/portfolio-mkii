import { ReactNode, useEffect } from "react";
import FolderLeftPane from "./FolderLeftPane";
import { useNavigate } from "react-router";
import { IProjectData } from "../general/interfaces";

interface iProps {
  title: string;
  content: ReactNode;
  count: number;
  iconName: string;
  selectedProject: IProjectData | undefined;
  setProgramName: (n: string | undefined) => void;
  setMinimized: (l: string | undefined) => void;
  endpoint: string;
  hideLeftPane?: boolean;
}

export default function FullscreenWindow({
  title,
  content,
  count,
  iconName,
  selectedProject,
  setProgramName,
  setMinimized,
  endpoint,
  hideLeftPane = false,
}: iProps) {
  const navigate = useNavigate();
  useEffect(() => {
    setProgramName(title);
  }, [setProgramName]);

  useEffect(() => {
    setMinimized(endpoint);
  }, [setMinimized]);
  return (
    <div className="window fullscreen">
      <div
        className="title-bar interact-none"
        style={{ cursor: "default", justifyContent: "start" }}
      >
        <img
          src="/folder-open-small.png"
          style={{ marginRight: "5px" }}
          className="pe-none"
        ></img>
        <div className="title-bar-text fg-1 pe-none">{title}</div>
        <div className="title-bar-controls">
          <button
            aria-label="Minimize"
            onClick={() => {
              navigate("/");
            }}
          />
          <button aria-label="Maximize" />
          <button
            aria-label="Close"
            onClick={() => {
              setProgramName(undefined);
              navigate("/");
            }}
          />
        </div>
      </div>
      <div className="window-body fg-1">
        <div className="window-body-container">
          <div className="window-body-inner-border">
            {!hideLeftPane && (
              <FolderLeftPane
                title={title}
                iconName={iconName}
                project={selectedProject}
              />
            )}
            {content}
          </div>
        </div>
      </div>
      <div className="window-footer">
        <div style={{ width: "30%", marginRight: "2px" }} className="verdana">
          {count} object(s)
        </div>
        <div className="fg-1"></div>
        <div className="my-pc-win-footer verdana">
          <img style={{ marginRight: "5px" }} src="/computer1.png"></img>
          My Computer
        </div>
      </div>
    </div>
  );
}
