import { useNavigate } from "react-router";
import StartMenuDivider from "./StartMenuDivider";
import StartMenuIcon from "./StartMenuIcon";
interface iProps {
  visible: boolean;
  setMenuVisible: (b: boolean) => void;
}
export default function StartMenu({ visible, setMenuVisible }: iProps) {
  const navigate = useNavigate();
  return (
    <div className={`start-menu ${visible ? "visible" : "hidden"}`}>
      <div>
        <div className="start-menu-left">
          <img src="/win98.png"></img>
        </div>
        <div className="start-menu-icon-container">
          <StartMenuIcon
            name="LinkedIn"
            iconName="briefcase.png"
            blackText={true}
            externalLink="https://www.linkedin.com/in/jeffrey-dan-neal/"
          />
          <StartMenuIcon
            name="Github"
            iconName="github.png"
            blackText={true}
            externalLink="https://github.com/ToastBubbles"
          />
          <StartMenuIcon
            name="Contact"
            iconName="msn.png"
            blackText={true}
            externalLink="mailto:jeffneal11@gmail.com"
          />
          <StartMenuDivider />
          <div
          // onClick={() => {
          //   setMenuVisible(false);
          //   navigate("/about");
          // }}
          >
            <StartMenuIcon
              name="About"
              iconName="about.png"
              blackText={true}
              link="/about"
            />
          </div>
          <StartMenuDivider />
          <StartMenuIcon
            name="Shutdown"
            iconName="shutdown.png"
            blackText={true}
            overrideFn={shutdown}
          />
        </div>
      </div>
    </div>
  );

  function shutdown() {
    console.log("todo");
  }
}
