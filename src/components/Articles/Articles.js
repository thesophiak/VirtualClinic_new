import { useState, useEffect } from "react";
import axios from 'axios'


function Articles (){
  const urlNyt = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
  const key= process.env.REACT_APP_NYT_KEY

  const [articles, setArticles]=useState("");
    
  useEffect(()=>{
      const fetchArticles = async ()=>{
          const response = await axios.get(`${urlNyt}?q=back-pain&api-key=${key}`)
          console.log(response.data.response.docs)
          console.log(response.data.response.docs[3])
          console.log(response.data.response.docs[4])
          console.log(response.data.response.docs[5])
          
          setArticles(response.data.response.docs[2])
      }
      fetchArticles()
  }, []  )

  return(
    <>
    <h1> Articles section</h1>
    <div className="card__name"></div>
    </>
  )
}

export default Articles;