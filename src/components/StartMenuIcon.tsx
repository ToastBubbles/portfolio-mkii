import { useNavigate } from "react-router";

interface iProps {
  iconName: string;
  name: string;
  link?: string;
  externalLink?: string;
  blackText?: boolean;
  overrideFn?: () => void;
}
export default function StartMenuIcon({
  iconName,
  name,
  externalLink,
  link,
  blackText = false,
  overrideFn,
}: iProps) {
  const navigate = useNavigate();

  return (
    <div
      className="start-menu-icon clickable"
      onClick={() => {
        if (overrideFn) {
          overrideFn();
        } else {
          if (link) navigate(link);
          else if (externalLink) window.open(externalLink, "_blank");
        }
      }}
    >
      <div
        className="image-selected"
        style={{
          maskImage: `url(/${iconName})`,
          WebkitMaskImage: `url(/${iconName})`,
        }}
      ></div>
      <img
        className="icon-img"
        src={`/${iconName}`}
        style={{ pointerEvents: "none" }}
      ></img>
      <div className="icon-name" style={blackText ? { color: "#000" } : {}}>
        {name}
      </div>
    </div>
  );
}
