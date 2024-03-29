
import FullscreenNotepad from "../components/FullscreenNotepad";
interface iProps {
  setMinimized: (l: string | undefined) => void;
  setActiveProgramName: (n: string | undefined) => void;
}

export default function AboutView({
  setMinimized,
  setActiveProgramName,
}: iProps) {

  return (
    <div className="about-view">
      <FullscreenNotepad
        setProgramName={setActiveProgramName}
        setMinimized={setMinimized}
        endpoint="/about"
      />
    </div>
  );
}
