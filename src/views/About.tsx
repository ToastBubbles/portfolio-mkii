import { useEffect, useState } from "react";
import DesktopIcon from "../components/DesktopIcon";
import FullscreenWindow from "../components/FullscreenWindow";
import { projects } from "../general/desktopExports";
import { IProjectData } from "../general/interfaces";
interface iProps {
  setMinimized: (l: string | undefined) => void;
  setActiveProgramName: (n: string | undefined) => void;
}

export default function AboutView({
  setMinimized,
  setActiveProgramName,
}: iProps) {
  const [selectedProject, setSelectedProject] = useState<
    IProjectData | undefined
  >(undefined);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInsideProject = target.closest(".clickable");
      if (!isInsideProject) {
        setSelectedProject(undefined);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="about-view">
      <FullscreenWindow
        title="About"
        setProgramName={setActiveProgramName}
        setMinimized={setMinimized}
        endpoint="/about"
        content={<>About</>}
        selectedProject={selectedProject}
        count={projects.length}
        hideLeftPane={true}
      />
    </div>
  );
}
