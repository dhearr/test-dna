import { Artikel } from "@/types/artikel.type";
import { searchNews } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { format } from "date-fns";

const Search = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Artikel[]>([]);

  // console.log(searchResults);

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
      <div className="grid grid-cols-4 gap-4 min-h-screen p-10">
        {searchResults.map((article: Artikel, index: number) => (
          <div key={index} className={`relative max-w-2xl h-96`}>
            <Image
              className="w-full h-full rounded-md object-cover"
              src={article.urlToImage ? article.urlToImage : "default.jpg"}
              alt={article.title}
              width={500}
              height={300}
              unoptimized
            />

            <div className="absolute p-2 top-0 flex justify-between w-full opacity-100 group-hover:opacity-0 transition duration-500">
              <div className="">
                <span className="bg-black/70 text-white text-[10px] font-medium ms-2 px-2.5 py-0.5 rounded-full">
                  {article.source.name.length > 5
                    ? article.source.name.slice(0, 5) + "..."
                    : article.source.name || "Unknown"}
                </span>
                <span className="bg-black/70 text-white text-[10px] font-medium ms-2 px-2.5 py-0.5 rounded-full">
                  {article?.author?.length
                    ? article?.author.slice(0, 5) + "..."
                    : article.author || "Unknown"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="bg-black/70 text-white text-[10px] font-medium me-2 px-2.5 py-0.5 rounded-full">
                  {format(new Date(article.publishedAt), "EEE, dd MMM' 'HH.mm")}
                </span>
                <button>
                  <span className="inline-flex bg-black/70 text-white text-[10px] font-medium me-2 px-2.5 py-1 rounded-full">
                    <FaRegBookmark />
                  </span>
                </button>
              </div>
            </div>

            <Link href={article.url} target="_blank">
              <div className="group absolute w-full p-2 bottom-0 text-center bg-black bg-opacity-70 text-white backdrop-blur-sm h-16 rounded-b-md hover:rounded-t-md  hover:h-full transition-height duration-500 overflow-hidden">
                <h1 className="text-lg font-medium font-serif">
                  {article.title.length > 70
                    ? article.title.slice(0, 70) + "..."
                    : article.title || "Unknown"}
                </h1>
                <p className="mt-5 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition duration-500">
                  {article?.description?.length
                    ? article.description.slice(0, 195) + "..."
                    : article?.description || "Unknown"}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
