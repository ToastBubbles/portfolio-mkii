import { Route, Routes } from "react-router";
import NotFound from "./views/NotFound";
import Taskbar from "./components/Taskbar";
import Desktop from "./views/Desktop";
import ProjectsView from "./views/ProjectsView";
import MiniProjectsView from "./views/MiniProjectsView";
import { useState } from "react";
import AboutView from "./views/About";
import BinView from "./views/BinView";

function App() {
  const [programName, setProgramName] = useState<string | undefined>(undefined);
  const [programMinimized, setProgramMinimized] = useState<string | undefined>(
    undefined
  );
  return (
    <>
      <div id="root-wrapper">
        <Routes>
          <Route path="/" element={<Desktop />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/projects"
            element={
              <ProjectsView
                setActiveProgramName={setProgramName}
                setMinimized={setProgramMinimized}
              />
            }
          />
          <Route
            path="/projects/mini"
            element={
              <MiniProjectsView
                setActiveProgramName={setProgramName}
                setMinimized={setProgramMinimized}
              />
            }
          />
          <Route
            path="/bin"
            element={
              <BinView
                setActiveProgramName={setProgramName}
                setMinimized={setProgramMinimized}
              />
            }
          />

          <Route
            path="/about"
            element={
              <AboutView
                setActiveProgramName={setProgramName}
                setMinimized={setProgramMinimized}
              />
            }
          />
        </Routes>
      </div>
      <Taskbar activeProgramName={programName} minimized={programMinimized} />
    </>
  );
}

export default App;
