import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-hidden">
        {/* 背景レイヤー */}
        <div
          className="
            fixed inset-0
            bg-[url('/images/yes-man-bg.png')]
            bg-center bg-no-repeat bg-cover
            opacity-20
            pointer-events-none
          "
        />

        {/* コンテンツレイヤー */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
