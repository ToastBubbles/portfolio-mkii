import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./views/Home";
import NotFound from "./views/NotFound";

function App() {
  return (
    <div id="root-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
