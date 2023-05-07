import react from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  HashRouter,
} from "react-router-dom";
import "./css/App.css";
import Header from "./components/structure/Header";
import Home from "./components/pages/Home";
import AnalyzeTool from "./components/pages/AnalyzeTool";

function App() {
  return (
    <HashRouter>
      <div
        className="App"
        style={{
          background: "#292a2d",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<AnalyzeTool />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;