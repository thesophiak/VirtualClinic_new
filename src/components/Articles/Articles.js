import { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.scss"

function Articles({ history }) {
  const urlNyt = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  const key = process.env.REACT_APP_NYT_KEY;

  const articleTopicDashed = history.split(" ").join("-");
  console.log("dashedText", articleTopicDashed);

  console.log("article topic", history);

  const [articles, setArticles] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(
        `${urlNyt}?q=${articleTopicDashed}&api-key=${key}`
      );
      setArticles(response.data.response.docs);
    };
    fetchArticles();
  }, [articleTopicDashed]);

  console.log(" articles", articles);

  return (
    <>
      <div className="articles-section">
        <h1 className="articles-section__title">Articles Section</h1>
        <ul className="articles-section__list">
          {articles.slice(0, 6).map((article, index) => (
            <li key={index} className="article-card">
              <h2 className="article-card__title">{article.headline.main}</h2>
              <p className="article-card__abstract">{article.abstract}</p>
              <p className="article-card__date">{article.pub_date}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Articles;
