import { useState, useEffect } from "react";
import OpenAI from "openai";
import Header from "../../components/Header/Header";
import Articles from "../../components/Articles/Articles";
import Advice from "../../components/Advice/Advice";
import "./MainPage.scss";
import axios from "axios";

function MainPage() {
  return (
    <>
    <div className="page-container">
    <div className="page-main">
      <Header />
      <Advice />
      </div>
      </div>
    </>
  );
}

export default MainPage;
