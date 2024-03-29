import { useEffect, useState } from "react";
import StartButton from "./StartButton";
import StartMenu from "./StartMenu";
import TaskbarClock from "./TaskbarClock";
import TaskbarDivider from "./TaskbarDivider";
import TaskbarProgram from "./TaskbarProgram";

interface iProps {
  activeProgramName: string | undefined;
  minimized: string | undefined;
}

export default function Taskbar({ activeProgramName, minimized }: iProps) {
  const [startMenuVisible, setStartMenuVisible] = useState(false);

  const toggleStartMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop propagation of the click event
    setStartMenuVisible(!startMenuVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInsideProject = target.closest(".start-menu");

      if (isInsideProject === null && startMenuVisible) {
        console.log("closing");
        setStartMenuVisible(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [startMenuVisible]);

  return (
    <footer className="taskbar">
      <div
        className={`start-menu-container ${startMenuVisible ? "" : "hidden"}`}
      >
        <StartMenu
          visible={startMenuVisible}
         
        />
        <div className="start-menu-mask"></div>
      </div>
      <StartButton
        onClick={(e) => {
          toggleStartMenu(e);
        }}
      />
      <TaskbarDivider />
      {activeProgramName != undefined && (
        <TaskbarProgram
          name={activeProgramName}
          iconName="folder-open-small.png"
          link={minimized}
        />
      )}
      <div className="fg-1"></div>
      <TaskbarDivider />
      <TaskbarClock />
    </footer>
  );
}
