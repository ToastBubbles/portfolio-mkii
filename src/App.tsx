import { Route, Routes } from "react-router";
import NotFound from "./views/NotFound";
import Taskbar from "./components/Taskbar";
import Desktop from "./views/Desktop";
import ProjectsView from "./views/ProjectsView";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <div id="root-wrapper">
        <Routes>
          <Route path="/" element={<Desktop />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/projects" element={<ProjectsView />} />
        </Routes>
      </div>
      <Taskbar />
    </>
  );
}

export default App;
