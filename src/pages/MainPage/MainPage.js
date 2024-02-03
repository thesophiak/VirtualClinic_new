import { useState, useEffect } from "react";
import OpenAI from "openai";
import Header from "../../components/Header/Header";
import Articles from "../../components/Articles/Articles";
import Advice from "../../components/Advice/Advice";
import Map from "../../components/Map/Map";
import "./MainPage.scss";
import axios from "axios";

function MainPage() {
  return (
    <>
    <div className="page-main">
      <Header />
      <Advice />
      </div>
    </>
  );
}

export default MainPage;
