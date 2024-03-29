import { ReactNode, useEffect } from "react";
import FolderLeftPane from "./FolderLeftPane";
import { useNavigate } from "react-router";
import { IProjectData } from "../general/interfaces";

interface iProps {
  setProgramName: (n: string | undefined) => void;
  setMinimized: (l: string | undefined) => void;
  endpoint: string;
}

export default function FullscreenNotepad({
  setProgramName,
  setMinimized,
  endpoint,
}: iProps) {
  const navigate = useNavigate();
  useEffect(() => {
    setProgramName("About.txt - Notepad");
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
          src="/notepad-small.png"
          style={{ marginRight: "5px" }}
          className="pe-none"
        ></img>
        <div className="title-bar-text fg-1 pe-none">About.txt - Notepad</div>
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
          <div className="window-body-inner-border"></div>
        </div>
      </div>
    </div>
  );
}
