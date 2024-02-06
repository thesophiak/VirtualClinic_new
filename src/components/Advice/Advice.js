import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import OpenAI from "openai";
import "./Advice.scss";
import axios from "axios";
import Modal from "../Modal/Modal";
import Articles from "../Articles/Articles";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import closeIcon from "../../assets/icons/close-24px.svg";

function Advice() {
  const { id } = useParams();
  let newQuestion = "";
  const apiBE = `http://localhost:5000/question/`;

  // useSTATE
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const [articles, setArticles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // BUTTONS
  const handleSubmit = async (event) => {
    event.preventDefault();
    let person = "a caring educated professional";
    setLoading(true);
    setAnswer("");
    newQuestion = event.target.question.value;

    const newAnswer = await getAnswer(newQuestion, person);
    const newHistory = await getHistory(newQuestion);
    const newDataEntry = {
      question: newQuestion,
      history: newHistory,
      answer: newAnswer,
    };

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
    setArticles([]);
  };

  const handleClearHistory = async () => {
    try {
      await axios.delete(`${apiBE}`);
      fetchHistoryList();
      setQuestion("");
      setAnswer("");
    } catch (error) {
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
            content: `You are doctor and you are talking from the perspective of a ${person}. The answer needs to give 3 paragraphs. First paragraph explains why this is happening. The second paragraph explains how to treat it. The third paragraph explains when this is serious enough to go see a doctor. Limit each paragraph to 150 characters. Space out the response with 2 lines between each paragraph. Add a label to each paragraph.`,
          },
          { role: "user", content: prompt },
        ],
      });
      setLoading(false);
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
  useEffect(() => {
    fetchHistoryList();
  }, []);
  const fetchHistoryList = async () => {
    try {
      const response = await axios.get(`${apiBE}`);
      setHistoryList(response.data);
    } catch (error) {
      console.error("Error fetching history list:", error);
    }
  };

  // GET OLD HISTORY ITEM
  const fetchHistoryDetails = async () => {
    try {
      const response = await axios.get(`${apiBE}${id}`);
      const oneHistoryItem = response.data;
      setQuestion(oneHistoryItem.question);
      setAnswer(oneHistoryItem.answer);
      setHistory(oneHistoryItem.history);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchHistoryDetails();
    }
  }, [id]);

  // DELETE ONE HISTORY ITEM
  const handleDeleteHistoryItem = async (itemId) => {
    try {
      await axios.delete(`${apiBE}/${itemId}`);
      fetchHistoryList();
    } catch (error) {
      console.error("Error deleting history item:", error);
    }
  };

  return (
    <>
      {openModal && (
        <div className="for-map-modal active">
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            className="map-modal"
          />
          <div className="backdrop" onClick={() => setOpenModal(false)}></div>
        </div>
      )}

      <main className="advice-section">
        <section className="section-left">
          <form className="advice-section__form" onSubmit={handleSubmit}>
            {/* QUESTION */}
            <label className="title__question">What is your question?</label>
            <div className="question-input-button-container">
              <div className="question-textarea">
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
            </div>
          </form>

          {/* ANSWER */}
          <SkeletonTheme baseColor="#ffefe2" highlightColor="#FAFFFF">
            <div className="section-answer">
              <div className="title__answer">
                Advice from your virtual doctor
              </div>
              <div className="answer">
                {loading && (
                  <p>
                    <Skeleton count={3} borderRadius={10} duration={1.5} />
                  </p>
                )}
                {answer}
              </div>
              <div>
                <button className="button__new" onClick={handleReset}>
                  New Question
                </button>
              </div>
              <button
                className="button__map"
                onClick={() => setOpenModal(true)}
              >
                <div>Find a Doctor</div>
              </button>
            </div>
          </SkeletonTheme>
        </section>

        {/* HISTORY */}
        <section className="section-right advice-section__history">
          <div className="title__history">Question history</div>
          <div className="history">
            <ul className="history-list">
              {[...historyList].reverse().map((item) => (
                <li className="history-item" key={item.id}>
                  <div className="history-item-x">
                    <Link to={`/${item.id}`}>{item.history}</Link>
                    <img
                      src={closeIcon}
                      alt="Delete"
                      className="delete-icon"
                      onClick={() => handleDeleteHistoryItem(item.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button className="button__clear" onClick={handleClearHistory}>
            Clear All
          </button>
        </section>
      </main>
      <Articles
        history={history}
        articles={articles}
        setArticles={setArticles}
      />
    </>
  );
}

export default Advice;
