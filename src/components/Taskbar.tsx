import StartButton from "./StartButton";
import TaskbarClock from "./TaskbarClock";
import TaskbarDivider from "./TaskbarDivider";

export default function Taskbar() {
  return (
    <footer className="taskbar">
      <StartButton />
      <TaskbarDivider />
      <div className="fg-1"></div>
      <TaskbarDivider />
      <TaskbarClock />
    </footer>
  );
}
