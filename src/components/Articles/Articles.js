import { useEffect } from "react";
import axios from "axios";
import "./Articles.scss";

function Articles({ history, articles, setArticles }) {
  const urlNyt = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  const key = process.env.REACT_APP_NYT_KEY;
  const articleTopicDashed = history.split(" ").join("-");

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(
        `${urlNyt}?q=${articleTopicDashed}&api-key=${key}`
      );
      setArticles(response.data.response.docs);
    };
    fetchArticles();
  }, [history, setArticles]);

  return (
    <>
      <div className="articles-section">
        <h1 className="articles-section__title">Additional resources</h1>
        <ul className="articles-section__list">
          {articles.slice(0, 6).map((article, index) => (
            <li key={index} className="article-card">
              {article.multimedia && article.multimedia[0] && (
                <img
                  className="article-card__image"
                  src={`https://static01.nyt.com/${article.multimedia[0].url}`}
                  alt={article.headline.main}
                />
              )}
              <h2 className="article-card__title">{article.headline.main}</h2>
              <p className="article-card__abstract">{article.abstract}</p>
              <div className="article-card__date">
                {article.pub_date.split("T")[0]}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Articles;
