import { Artikel } from "@/types/artikel.type";

const BASE_URL = "https://newsapi.org/v2/";

export const fetchNews = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = await response.json();
    // console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error Fetching News", error);
    return [];
  }
};

export const searchNews = async (query: string): Promise<Artikel[]> => {
  // console.log(query);
  try {
    const response = await fetch(
      `${BASE_URL}everything?q=${query}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
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
