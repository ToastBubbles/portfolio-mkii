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
  let lastTouchTime = 0;

  const handleTouchEnd = () => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTouchTime;
    if (tapLength < 750) {
      // If it's a double tap
      if (link) navigate(link);
      else if (externalLink) window.open(externalLink, "_blank");
    } else {
      // If it's a single tap
      lastTouchTime = currentTime;
    }
  };
  return (
    <div
      className="desktop-icon"
      onTouchEnd={handleTouchEnd}
      // onTouchEnd={() => {
      //   if (link) navigate(link);
      //   else if (externalLink) window.open(externalLink, "_blank");
      // }}
      onDoubleClick={() => {
        if (link) navigate(link);
        else if (externalLink) window.open(externalLink, "_blank");
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
