import './App.css';
import './App.css';
import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage"
import MapPage from "./pages/MapPage/MapPage"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} /> 
        <Route path="/:id" element={<MainPage/>} /> 
        <Route path="/map" element={<MapPage/>} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
