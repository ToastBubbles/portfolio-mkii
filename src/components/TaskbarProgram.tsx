
import { useLocation, useNavigate } from "react-router";

interface iProps {
  name: string;
  iconName: string;
  link: string | undefined;
}

export default function TaskbarProgram({ name, iconName, link }: iProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="tb-program clickable"
      onClick={() => {
        if (link) {


          if (link == location.pathname) {
         
            navigate("/");
          } else {
            navigate(link);
          }
        }
      }}
    >
      <div>
        <img src={`/${iconName}`}></img>
        <div>{name}</div>
      </div>
    </div>
  );
}
