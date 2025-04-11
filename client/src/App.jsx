// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import Upload from "./components/uploadFile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Viewdata from "./components/viewdata";
import "./components/style.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/view" element={<Viewdata />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
