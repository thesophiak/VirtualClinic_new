import { useEffect } from "react";
import OpenAI from "openai";
import Header from "../../components/Header/Header";
import "./MainPage.scss"


const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true
  });

  const chatCompletion = async (prompt) => {
    try {
    const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "user", 
      content: "list 3 colours that have nice names"}
    ]
    });
    console.log("the response",response);
    console.log("the response 2",response.choices[0].message);
  }catch (error) {
    console.error("Error fetching answers:", error);
  }
  }
  chatCompletion()



function MainPage() {
   


  return (
    <>
      <Header />
      <main className="main-section">
        <section className="section-left">
          <form className="form">
            <label className="title__question">What is your question?</label>
            <div><textarea
              className="questions"
              placeholder="Enter your question here"
            ></textarea></div>
            <div><button className="button__go" type="submit">Go</button></div>
          </form>
          <div className="title__answer">Advice from your virtual doctor</div>
          <div className="answer"></div>
          <div><button className="button__another">I have another question</button></div>
        </section>
        <section className="section-right">
          <div className="title__history">Question history</div>
          <div className="history"></div>
          <button className="button__clear">Clear history</button>
        </section>
      </main>
    </>
  );
}

export default MainPage;
