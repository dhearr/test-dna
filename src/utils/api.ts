const API_KEY = "2c07e842d81e440c9d7ad797ecaaeb58";
const BASE_URL = "https://newsapi.org/v2/";

export const fetchNews = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}top-headlines?country=us&apiKey=${API_KEY}`
    );
    const data = await response.json();
    // console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error Fetching News", error);
    return [];
  }
};
