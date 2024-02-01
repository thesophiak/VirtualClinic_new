import { useState, useEffect } from "react";
import OpenAI from "openai";
import Header from "../../components/Header/Header";
import Articles from "../../components/Articles/Articles";
import "./MainPage.scss";

function MainPage() {
  let newQuestion = "";

  const [answer, setAnswer] = useState("");
  console.log("answer", answer);

  const[question, setQuestion] = useState("")

  const [history, setHistory] = useState([])
  console.log("history: ", history)

  const handleSubmit = (event) => {
    event.preventDefault();
    let person = "cat";

    newQuestion = event.target.question.value;
    console.log(newQuestion);
    getAnswer(newQuestion, person);
    getHistory(newQuestion)
  };

  const handleReset = (event) =>{
    event.preventDefault();
    setQuestion("")
    setAnswer("");
  }

  const handleClearHistory = (event) =>{
    event.preventDefault();
    setHistory([])
  }

  // const handleHistoryClick = (index) => {
  //   const selectedHistory = history[index];
  //   setQuestion(selectedHistory.question);
  //   setAnswer(selectedHistory.answer);
  // }

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPEN_AI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const getAnswer = async (prompt, person) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are doctor and you are talking from the perspective of a ${person}. The answer should be 2 sentences`,
          },

          { role: "user", content: prompt },
        ],
      });
      setAnswer(response.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  const getHistory = async (prompt) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Summarize the prompt in 3 words or less. Make it sentence case. Do not include period at the end of the phrase. ",
          },

          { role: "user", content: prompt },
        ],
      });

      const historyItem = {
        question: prompt,
        answer: response.choices[0].message.content,
      };

      setHistory((prevHistory)=>[...prevHistory, response.choices[0].message.content]);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="main-section">
        <section className="section-left">
          <form className="form" onSubmit={handleSubmit}>
            {/* QUESTION */}
            <label className="title__question">What is your question?</label>
            <div>
              <textarea
                className="questions"
                placeholder="Enter your question here"
                name="question"
                value={question}      
                onChange={(event)=> setQuestion(event.target.value)}
              ></textarea>
            </div>
            <div>
              <button className="button__go" type="submit">
                Go
              </button>
            </div>
          </form>

          {/* ANSWER */}
          <div className="title__answer">Advice from your virtual doctor</div>
          <div className="answer">{answer}</div>
          <div>
            <button className="button__another"
            onClick={handleReset}
            >I have another question</button>
          </div>
        </section>

        {/* HISTORY */}
        <section className="section-right">
          <div className="title__history">Question history</div>
          <div className="history">
            <ul>
              {history.map((item, index)=> (
                <li key={index}
                // onClick={()=>handleHistoryClick(index)}
                className="history-item"
                >{item}</li>
              ))}
            </ul>
          </div>
          <button className="button__clear"
          onClick={handleClearHistory}
          >Clear history</button>
        </section>
      </main>
      <Articles />
    </>
  );
}

export default MainPage;
