import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { FaRegBookmark } from "react-icons/fa";
import { useState } from "react";
import { Artikel } from "@/types/artikel.type";

interface TypeProps {
  artikel: Artikel;
  variant: string;
  onSave: (artikel: Artikel) => void;
}

const Cardnews = ({ artikel, variant, onSave }: TypeProps) => {
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = () => {
    const savedNews: Artikel[] = JSON.parse(
      localStorage.getItem("savedNews") || "[]"
    );

    const isAlreadySaved = savedNews.some(
      (savedArticle) => savedArticle.url === artikel.url
    );

    if (isAlreadySaved) {
      setNotification(
        "Berita sudah Anda simpan. Anda tidak bisa menyimpannya lagi!"
      );
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } else {
      onSave(artikel);
      setNotification("Berita berhasil disimpan.");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <>
      {notification && (
        <div
          className={`fixed top-0 left-0 ms-10 px-2 py-1 rounded ${
            notification.includes("disimpan")
              ? "bg-green-500 text-white"
              : "bg-yellow-500 text-black"
          }`}
        >
          {notification}
        </div>
      )}

      <div className={`relative ${variant}`}>
        <Image
          className="w-full h-full rounded-md object-cover"
          src={artikel.urlToImage ? artikel.urlToImage : "/default.jpg"}
          alt={artikel.title}
          width={500}
          height={300}
          unoptimized
        />
        <div className="absolute p-2 top-0 flex justify-between w-full opacity-100 group-hover:opacity-0 transition duration-500">
          <div className="">
            <span className="bg-black/70 text-white text-[10px] font-medium ms-2 px-2.5 py-0.5 rounded-full">
              {artikel.source.name.length > 5
                ? artikel.source.name.slice(0, 5) + "..."
                : artikel.source.name || "Unknown"}
            </span>
            <span className="bg-black/70 text-white text-[10px] font-medium ms-2 px-2.5 py-0.5 rounded-full">
              {artikel?.author?.length
                ? artikel?.author.slice(0, 5) + "..."
                : artikel.author || "Unknown"}
            </span>
          </div>
          <div className="flex items-center">
            <span className="bg-black/70 text-white text-[10px] font-medium me-2 px-2.5 py-0.5 rounded-full">
              {format(new Date(artikel.publishedAt), "EEE, dd MMM' 'HH.mm")}
            </span>
            <button onClick={handleSave}>
              <span className="inline-flex bg-black/70 text-white text-[10px] font-medium me-2 px-2.5 py-1 rounded-full">
                <FaRegBookmark />
              </span>
            </button>
          </div>
        </div>
        <Link href={artikel.url} target="_blank">
          <div className="group absolute w-full p-2 bottom-0 text-center bg-black bg-opacity-70 text-white backdrop-blur-sm h-16 rounded-b-md hover:rounded-t-md  hover:h-full transition-height duration-500 overflow-hidden">
            <h1 className="text-lg font-medium font-serif">
              {artikel.title.length > 70
                ? artikel.title.slice(0, 70) + "..."
                : artikel.title || "Unknown"}
            </h1>
            <p className="mt-5 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition duration-500">
              {artikel?.description?.length
                ? artikel.description.slice(0, 195) + "..."
                : artikel?.description || "Unknown"}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Cardnews;
