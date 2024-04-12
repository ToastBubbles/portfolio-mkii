import { useState } from "react";
import { useNavigate } from "react-router";

interface iProps {
  iconName: string;
  name: string;
  link?: string;
  externalLink?: string;
  hideStartMenu: () => void;
  overrideFn?: () => void;
}
export default function StartMenuIcon({
  iconName,
  name,
  externalLink,
  hideStartMenu,
  link,
  overrideFn,
}: iProps) {
  const [onHover, setOnHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`start-menu-icon w-100 clickable ${
        onHover ? "start-menu-icon-hover" : ""
      }`}
      onMouseOver={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      onClick={() => {
        if (overrideFn) {
          overrideFn();
          hideStartMenu();
        } else {
          if (link) navigate(link);
          else if (externalLink) window.open(externalLink, "_blank");
          hideStartMenu();
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
      <div
        className="icon-name"
        style={!onHover ? { color: "#000" } : { color: "#FFF" }}
      >
        {name}
      </div>
    </div>
  );
}
