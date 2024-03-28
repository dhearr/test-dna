import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Search = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchNews = async (query: any) => {
    // console.log(query);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=2c07e842d81e440c9d7ad797ecaaeb58`
      );
      // console.log(response);
      const data = await response.json();
      // console.log(data);
      return data.articles;
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  };

  useEffect(() => {
    if (typeof slug === "string" && slug.trim() !== "") {
      setSearchTerm(slug.trim());
    }
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm !== "") {
        const results = await searchNews(searchTerm);
        setSearchResults(results);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div>
      <h1>Pencarian untuk {searchTerm}</h1>
      <div>
        {searchResults.map((article: any) => (
          <div key={article.title}>
            <img src={article.urlToImage} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
