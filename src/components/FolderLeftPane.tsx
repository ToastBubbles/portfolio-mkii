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
        <img src={`src/assets/${iconName}`}></img>
        <p className="left-pane-title">{title}</p>
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
          <div></div>
        ) : (
          <div>Select an item to view its description.</div>
        )}
      </div>
    </nav>
  );
}
