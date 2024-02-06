import './App.css';
import './App.css';
import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage"
import WelcomePage from './pages/WelcomePage/WelcomePage';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} /> 
        <Route path="/:id" element={<MainPage/>} /> 
        <Route path="/welcome" element={<WelcomePage/>} /> 
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
