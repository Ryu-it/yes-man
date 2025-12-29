import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
