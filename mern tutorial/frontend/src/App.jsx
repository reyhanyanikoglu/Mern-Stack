import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// pages and components
import Home from "./pages/Home"; 
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home/>}
            /> 
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
