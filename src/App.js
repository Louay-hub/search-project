import React, { useState } from "react";
import "./App.css";
import articles from "./Articles";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Type a keyword..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />
      <p>
        {filteredArticles.length} post
        {filteredArticles.length !== 1 && "s"} found.
      </p>
      {filteredArticles.map((article, index) => (
        <div key={index} className="article">
          <h2>{highlightText(article.title, searchTerm)}</h2>
          <p>{highlightText(article.date, searchTerm)}</p>
          <p>{highlightText(article.content, searchTerm)}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
