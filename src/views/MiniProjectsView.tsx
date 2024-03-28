import { useEffect, useState } from "react";
import FullscreenWindow from "../components/FullscreenWindow";
import { miniProjects, projects } from "../general/desktopExports";
import { IProjectData } from "../general/interfaces";
import DesktopIcon from "../components/DesktopIcon";

export default function MiniProjectsView() {
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
        title="Mini Projects"
        content={
          <div className="d-flex" style={{ width: "100%", flexWrap: "wrap" }}>
            {miniProjects.map((project, index) => (
              <div
                key={index}
                className={`clickable ${
                  selectedProject == project ? "selected-icon" : ""
                }`}
                style={{ width: "80px", maxHeight: "95px" }}
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
