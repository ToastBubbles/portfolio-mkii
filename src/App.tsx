import { Route, Routes } from "react-router";
import NotFound from "./views/NotFound";
import Taskbar from "./components/Taskbar";
import Desktop from "./views/Desktop";
import ProjectsView from "./views/ProjectsView";
import MiniProjectsView from "./views/MiniProjectsView";
import { useEffect, useState } from "react";
import AboutView from "./views/About";
import BinView from "./views/BinView";

function App() {
  const [programName, setProgramName] = useState<string | undefined>(undefined);
  const [programMinimized, setProgramMinimized] = useState<string | undefined>(
    undefined
  );

  const [shutdown, setShutdown] = useState<boolean>(false);
  const [shutdownStage, setShutdownStage] = useState<string>("");

  useEffect(() => {
    if (shutdown) {
      setShutdownStage("shutdown-1");
      playShutdownSound();
      setTimeout(() => {
        setShutdownStage("shutdown-2");
        setTimeout(() => {
          setShutdownStage("shutdown-3");
          setTimeout(() => {
            setShutdownStage("shutdown-4");
          }, 2000); // Wait for 2 seconds
        }, 4000); // Wait for 2 seconds
      }, 500); // Wait for 2 seconds
    }
  }, [shutdown]);

  const playStartupSound = () => {
    const audio = new Audio("/startup.wav");
    audio.play();
  };

  const playShutdownSound = () => {
    const audio = new Audio("/shutdown.mp3");
    audio.play();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shutdown && shutdownStage === "shutdown-4") {
        // setShutdown(false); // Reset shutdown state
        document.removeEventListener("keydown", handleKeyDown); // Remove event listener

        setShutdownStage("shutdown-5");
        setTimeout(() => {
          setShutdownStage("shutdown-6");
          setTimeout(() => {
            setShutdownStage("shutdown-7");
            playStartupSound();
            setTimeout(() => {
              setShutdown(false);
            }, 1500); // Wait for 2 seconds
          }, 4000); // Wait for 2 seconds
        }, 2000); // Wait for 2 seconds
      }
    };

    if (shutdown && shutdownStage === "shutdown-4") {
      document.addEventListener("keydown", handleKeyDown); // Add event listener for keydown
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown); // Cleanup: remove event listener when component unmounts
    };
  }, [shutdown, shutdownStage]);

  if (!shutdown)
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
        <Taskbar
          activeProgramName={programName}
          minimized={programMinimized}
          shutdown={() => setShutdown(true)}
        />
      </>
    );
  else
    return (
      <div className={`shutdown ${shutdownStage}`}>
        {shutdownStage == "shutdown-4" && (
          <div className="shutdown-txt">press any key to start</div>
        )}
      </div>
    );
}

export default App;
