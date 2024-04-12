import StartMenuDivider from "./StartMenuDivider";
import StartMenuIcon from "./StartMenuIcon";
interface iProps {
  visible: boolean;
  hideSelf: () => void;
  shutdown: () => void;
}
export default function StartMenu({ visible, hideSelf, shutdown }: iProps) {
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
            externalLink="https://www.linkedin.com/in/jeffrey-dan-neal/"
            hideStartMenu={hideSelf}
          />
          <StartMenuIcon
            name="Github"
            iconName="github.png"
            externalLink="https://github.com/ToastBubbles"
            hideStartMenu={hideSelf}
          />
          <StartMenuIcon
            name="Contact"
            iconName="msn.png"
            externalLink="mailto:jeffneal11@gmail.com"
            hideStartMenu={hideSelf}
          />
          <StartMenuDivider />
          <div>
            <StartMenuIcon
              name="About"
              iconName="about.png"
              link="/about"
              hideStartMenu={hideSelf}
            />
          </div>
          <StartMenuDivider />
          <StartMenuIcon
            name="Shutdown"
            iconName="shutdown.png"
            overrideFn={shutdown}
            hideStartMenu={hideSelf}
          />
        </div>
      </div>
    </div>
  );
}
