import { useEffect, useState } from "react";
import DesktopIcon from "../components/DesktopIcon";
import FullscreenWindow from "../components/FullscreenWindow";
import { projects } from "../general/desktopExports";
import { IProjectData } from "../general/interfaces";
interface iProps {
  setMinimized: (l: string | undefined) => void;
  setActiveProgramName: (n: string | undefined) => void;
}

export default function ProjectsView({
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
    <div className="projects-view">
      <FullscreenWindow
        title="Projects"
        setProgramName={setActiveProgramName}
        setMinimized={setMinimized}
        endpoint="/projects"
        iconName="internet_folder.png"
        content={
          <div
            className="d-flex ai-start"
            style={{ width: "100%", flexWrap: "wrap", height: "120px" }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className={`clickable ${
                  selectedProject == project ? "selected-icon" : ""
                }`}
                style={{ width: "80px", height: "105px" }}
                draggable={true}
                onClick={() => {
                  setSelectedProject(project);
                }}
                onTouchStart={() => {
                  setSelectedProject(project);
                }}
              >
                <DesktopIcon
                  iconName={project.iconName}
                  name={project.name}
                  externalLink={project.externalLink}
                  link={project.link}
                  blackText={selectedProject == project ? false : true}
                />
              </div>
            ))}
          </div>
        }
        selectedProject={selectedProject}
        count={projects.length}
      />
    </div>
  );
}
