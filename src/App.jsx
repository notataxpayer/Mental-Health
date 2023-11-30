import React from "react";
// import { Homepage } from './Component/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPagesFound from "./pages/err404";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Home" index element={<Home />} />
          <Route path="*" index element={<NoPagesFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
