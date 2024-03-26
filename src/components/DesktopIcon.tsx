interface iProps {
  iconName: string;
  name: string;
  clickFn: () => void;
}
export default function DesktopIcon({ iconName, name, clickFn }: iProps) {
  return (
    <div className="desktop-icon" onDoubleClick={() => clickFn()}>
      <div
        className="image-selected"
        style={{
          maskImage: `url(src/assets/${iconName})`,
          WebkitMaskImage: `url(src/assets/${iconName})`,
          
        }}
      ></div>
      <img
        className="icon-img"
        src={`src/assets/${iconName}`}
        style={{ pointerEvents: "none" }}
      ></img>
      <div className="icon-name">{name}</div>
    </div>
  );
}
