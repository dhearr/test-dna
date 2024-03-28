import Cardnews from "@/components/Cardnews";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const News = () => {
  const [isSavedNews, setIsSavedNews] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNews = JSON.parse(localStorage.getItem("savedNews") || "[]");
      setIsSavedNews(savedNews);
    }
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 min-h-screen p-10">
      {isSavedNews.map((article: any, index: number) => (
        <div key={index} className={`relative max-w-2xl h-96`}>
          <Image
            className="w-full h-full rounded-md object-cover"
            src={article.imageUrl ? article.imageUrl : "default.jpeg"}
            alt={article.title}
            width={500}
            height={300}
            unoptimized
          />

          <Link href={article.url} target="_blank">
            <div className="group absolute w-full p-2 bottom-0 text-center bg-black bg-opacity-70 text-white backdrop-blur-sm h-16 rounded-b-md hover:rounded-t-md  hover:h-full transition-height duration-500 overflow-hidden">
              <h1 className="text-lg font-medium font-serif">
                {article.title.length > 70
                  ? article.title.slice(0, 70) + "..."
                  : article.title || "Unknown"}
              </h1>
              <p className="mt-5 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition duration-500">
                {article?.url?.lenght > 195
                  ? article.url.slice(0, 195) + "..."
                  : article?.url || "Unknown"}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default News;
