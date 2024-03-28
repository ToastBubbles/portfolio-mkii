import { IProjectData } from "../general/interfaces";

interface iProps {
  title: string;
  iconName: string;
  project: IProjectData | undefined;
}

export default function FolderLeftPane({ title, iconName, project }: iProps) {
  return (
    <nav className="folder-left-pane">
      <div style={{ margin: "1.5em 1.5em 0 1.5em" }}>
        <img src={`/src/assets/${iconName}`}></img>
        <p className="left-pane-title verdana">{title}</p>
      </div>
      <div>
        <img
          src="https://98.js.org/src/WEB//wvline.gif"
          width="100%"
          height="1px"
        ></img>
      </div>
      <div className="left-pane-body">
        {project ? (
          <div className="verdana d-flex flex-col" style={{ fontSize: "10pt" }}>
            <div className="verdana" style={{ fontWeight: "600" }}>
              {project.name}
            </div>
            <div className="verdana" style={{ marginBottom: "1em" }}>
              {project.type}
            </div>
            <div className="verdana" style={{ marginBottom: "1em" }}>
              {project.description}
            </div>
            <div className="verdana">Created on:</div>
            <div className="verdana">{project.date}</div>
          </div>
        ) : (
          <div className="verdana">Select an item to view its description.</div>
        )}
      </div>
    </nav>
  );
}
