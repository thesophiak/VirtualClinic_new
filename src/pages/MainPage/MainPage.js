import { useState, useEffect } from "react";
import OpenAI from "openai";
import Header from "../../components/Header/Header";
import Articles from "../../components/Articles/Articles";
import "./MainPage.scss";
import axios from "axios";

function MainPage() {
  let newQuestion = "";
  const apiBE = `http://localhost:5000/`;

  // useSTATE
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState("");
  const [historyList, setHistoryList] = useState([]);

  // BUTTONS
  const handleSubmit = async (event) => {
    event.preventDefault();
    let person = "dog";

    newQuestion = event.target.question.value;
    console.log("new Qustion:", newQuestion);

    const newAnswer = await getAnswer(newQuestion, person);
   const newHistory =  await getHistory(newQuestion);

    const newDataEntry = {
      question: newQuestion,
      history: newHistory,
      answer: newAnswer,
    };
    console.log("req bod:", newDataEntry);

    setQuestion(newQuestion);
    setAnswer(newAnswer);
    setHistory(newHistory);

    axios
      .post(`${apiBE}`, newDataEntry)
      .then((response) => {
        fetchHistoryList();
      })
      .catch((error) => {
        console.error("Error adding data to DB:", error);
      });
  };

  const handleReset = (event) => {
    event.preventDefault();
    setQuestion("");
    setAnswer("");
  };

  const handleClearHistory = async () => {
    try {
      await axios.delete(`${apiBE}`)
      fetchHistoryList();
      setQuestion("");
      setAnswer("");
      // alert("History cleared successfully");
    }catch(error){
      console.error("Error clearing history:", error);
    }
  };


  // API call to chatGTP
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
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching answers:", error);
      return "";
    }
  };

  const getHistory = async (prompt) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Summarize the prompt in 3 words or less. Make it sentence case. Do not include period at the end of the phrase. ",
          },

          { role: "user", content: prompt },
        ],
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching answers:", error);
      return "";
    }
  };

  // Get HISTORY LIST
  useEffect(()=>{
    fetchHistoryList();
  },[]);

  const fetchHistoryList = async () =>{
    try{
      const response = await axios.get(`${apiBE}`)
      setHistoryList(response.data);
    }catch(error){
      console.error("Error fetching history list:", error);
    }
  }

console.log("History list", historyList)
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
                onChange={(event) => setQuestion(event.target.value)}
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
            <button className="button__another" onClick={handleReset}>
              I have another question
            </button>
          </div>
        </section>

        {/* HISTORY */}
        <section className="section-right">
          <div className="title__history">Question history</div>
          <div className="history">
            <ul>
              {historyList.map((item)=>(
                <li key ={item.id}>{item.history}</li>
              ))}
            </ul>
          </div>
          <button className="button__clear" onClick={handleClearHistory}>
            Clear history
          </button>
        </section>
      </main>
      <Articles articleTopic={history} />
    </>
  );
}

export default MainPage;
