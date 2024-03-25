import { Route, Routes } from "react-router";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Taskbar from "./components/Taskbar";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <div id="root-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Taskbar />
    </>
  );
}

export default App;
