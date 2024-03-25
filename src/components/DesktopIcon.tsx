interface iProps {
  iconName: string;
  name: string;
  clickFn: () => void;
}
export default function DesktopIcon({ iconName, name, clickFn }: iProps) {
  return (
    <div className="desktop-icon clickable" onDoubleClick={() => clickFn()}>
      <img  src={`src/assets/${iconName}`}></img>
      <div>{name}</div>
    </div>
  );
}
