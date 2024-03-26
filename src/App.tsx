import { Route, Routes } from "react-router";
import NotFound from "./views/NotFound";
import Taskbar from "./components/Taskbar";
import Desktop from "./views/Desktop";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <div id="root-wrapper">
        <Routes>
          <Route path="/" element={<Desktop />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Taskbar />
    </>
  );
}

export default App;
