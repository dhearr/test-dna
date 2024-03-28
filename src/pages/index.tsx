import Newslist from "@/components/Newslist";
import { fetchNews } from "@/utils/api";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [artikels, setArtikels] = useState([]);
  // console.log(artikel);

  useEffect(() => {
    const fetchData = async () => {
      const news = await fetchNews();
      setArtikels(news);
    };

    fetchData();
  }, []);

  return (
    <>
      <main
        className={`flex min-h-screen w-full flex-col items-center p-10 ${inter.className}`}
      >
        <Newslist artikels={artikels} />
      </main>
    </>
  );
}
