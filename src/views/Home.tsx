import DesktopIcon from "../components/DesktopIcon";
import Window from "../components/Window";

export default function Home() {
  return (
    <>
      <div className="desktop">
        {/* <Window /> */}
        <DesktopIcon
          name="Recycle Bin"
          iconName="bin_empty.png"
          clickFn={binClick}
        />
        {/* <div className="bg-image"><img src="src/assets/NEAL.png"></img></div> */}
      </div>
    </>
  );

  function binClick() {
    console.log("click");
  }
}
