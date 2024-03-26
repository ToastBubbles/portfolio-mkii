interface iProps {
  iconName: string;
  name: string;
  clickFn: () => void;
}
export default function DesktopIcon({ iconName, name, clickFn }: iProps) {
  return (
    <div className="desktop-icon" onDoubleClick={() => clickFn()}>
      <img
        src={`src/assets/${iconName}`}
        style={{ pointerEvents: "none" }}
      ></img>
      <div>{name}</div>
    </div>
  );
}
