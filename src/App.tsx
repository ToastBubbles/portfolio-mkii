import { Route, Routes } from "react-router";
import NotFound from "./views/NotFound";
import Taskbar from "./components/Taskbar";
import Desktop from "./views/Desktop";
import ProjectsView from "./views/ProjectsView";
import MiniProjectsView from "./views/MiniProjectsView";
import { useEffect, useState } from "react";
import AboutView from "./views/About";
import BinView from "./views/BinView";
import BadgeQelementView from "./views/BadgeQElement";

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
          }, 2000);
        }, 4000);
      }, 500);
    }
  }, [shutdown]);

  const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const playStartupSound = () => {
    const audio = new Audio("/startup.wav");
    audio.play();
  };

  const playShutdownSound = () => {
    const audio = new Audio("/shutdown.mp3");
    audio.play();
  };

  useEffect(() => {
    const handleKeyDown = () => {
      if (shutdown && shutdownStage === "shutdown-4") {
        document.removeEventListener("keydown", handleKeyDown); // Remove event listener
        document.removeEventListener("touchstart", handleKeyDown);

        setShutdownStage("shutdown-5");
        setTimeout(() => {
          setShutdownStage("shutdown-6");
          setTimeout(() => {
            setShutdownStage("shutdown-7");
            playStartupSound();
            setTimeout(() => {
              setShutdown(false);
            }, 1500);
          }, 4000);
        }, 2000);
      }
    };

    if (shutdown && shutdownStage === "shutdown-4") {
      document.addEventListener("keydown", handleKeyDown); // Add event listener for keydown
      document.addEventListener("touchstart", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown); // Cleanup: remove event listener when component unmounts
      document.removeEventListener("touchstart", handleKeyDown);
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

            <Route path="/BadgeQelement" element={<BadgeQelementView />} />
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
          <div className="shutdown-txt">
            {isMobile ? "touch" : "press any key"} to start
          </div>
        )}
      </div>
    );
}

export default App;
