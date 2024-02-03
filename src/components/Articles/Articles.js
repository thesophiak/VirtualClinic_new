// import { useState, useEffect } from "react";
// import axios from "axios";

// function Articles({ history }) {
//   const urlNyt = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
//   const key = process.env.REACT_APP_NYT_KEY;

//   const articleTopicDashed = history.split(" ").join("-");
//   console.log("dashedText", articleTopicDashed);

//   console.log("article topic", history);

//   const [articles, setArticles] = useState("");

//   useEffect(() => {
//     const fetchArticles = async () => {
//       const response = await axios.get(
//         `${urlNyt}?q=${articleTopicDashed}&api-key=${key}`
//       );
//       console.log(" articles 2", response.data.response.docs);

//       setArticles(response.data.response.docs);
//     };
//     fetchArticles();
//   }, [articleTopicDashed]);

//   console.log(" articles", articles);

//   return (
//     <>
//       <h1> Articles section</h1>
    
//     </>
//   );
// }

// export default Articles;
