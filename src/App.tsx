import { Route, Routes } from "react-router";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <Footer />
    </>
  );
}

export default App;
