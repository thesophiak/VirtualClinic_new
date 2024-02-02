import { useState, useEffect } from "react";
import axios from "axios";

function Articles({ articleTopic }) {
  const urlNyt = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  const key = process.env.REACT_APP_NYT_KEY;

  const articleTopicDashed = articleTopic.split(" ").join("-");
  console.log("dashedText", articleTopicDashed);

  console.log("article topic", articleTopic);

  const [articles, setArticles] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(
        `${urlNyt}?q=${articleTopic}&api-key=${key}`
      );
      console.log(" articles 2", response.data.response.docs);

      setArticles(response.data.response.docs);
    };
    fetchArticles();
  }, [articleTopicDashed]);

  console.log(" articles", articles);

  return (
    <>
      <h1> Articles section</h1>
      <div className="card">
        {articles.map((item, index) => (
          <div key={index}>

            <div className="card__name">{item.headline.main}</div>
            {/* <div className="card__author">{item.byline?.original}</div> */}
    
           
          </div>
        ))}
      </div>
    </>
  );
}

export default Articles;
