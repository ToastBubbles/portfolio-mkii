import { useNavigate } from "react-router";

interface iProps {
  iconName: string;
  name: string;
  link?: string;
  externalLink?: string;
  blackText?: boolean;
}
export default function DesktopIcon({
  iconName,
  name,
  externalLink,
  link,
  blackText = false,
}: iProps) {
  const navigate = useNavigate();

  return (
    <div
      className="desktop-icon"
      onDoubleClick={() => {
        if (link) navigate(link);
        else if (externalLink) window.open(externalLink, "_blank");
      }}
    >
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
      <div className="icon-name" style={blackText ? { color: "#000" } : {}}>
        {name}
      </div>
    </div>
  );
}
