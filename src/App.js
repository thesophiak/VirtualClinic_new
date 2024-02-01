import './App.css';
import './App.css';
import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} /> 
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
