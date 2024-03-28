import { Artikel } from "@/types/artikel.type";
import Cardnews from "./Cardnews";

interface TypeProps {
  artikels: Artikel[];
}

const Newslist = ({ artikels }: TypeProps) => {
  // console.log(artikels);
  const handleSaveNews = (artikel: Artikel) => {
    // console.log(artikel);
    const savedNews: Artikel[] = JSON.parse(
      localStorage.getItem("savedNews") || "[]"
    );
    savedNews.push({
      ...artikel,
    });
    localStorage.setItem("savedNews", JSON.stringify(savedNews));
  };

  const artikelGroups: Artikel[][] = [];
  for (let i = 0; i < artikels.length; i += 5) {
    artikelGroups.push(artikels.slice(i, i + 5));
  }

  return (
    <>
      {artikels.length > 0 ? (
        <>
          {artikelGroups.map((group: Artikel[], groupIndex: number) => {
            const isCrossedRow = groupIndex % 2 !== 0;
            return (
              <div
                key={groupIndex}
                className={`flex gap-4 mb-4 ${
                  isCrossedRow ? "flex-row-reverse" : ""
                }`}
              >
                <div className="grid grid-cols-1 gap-4 h-auto">
                  {group[0] && (
                    <Cardnews
                      variant="max-w-xl h-auto"
                      artikel={group[0]}
                      onSave={handleSaveNews}
                    />
                  )}
                </div>
                <div className={`grid grid-cols-2 gap-4 h-full`}>
                  {group
                    .slice(1)
                    .map((artikel: Artikel, artikelIndex: number) => (
                      <Cardnews
                        key={groupIndex * 5 + artikelIndex + 1}
                        variant="max-w-sm h-52"
                        artikel={artikel}
                        onSave={handleSaveNews}
                      />
                    ))}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className="h-full w-full animate-pulse">
            <div className="grid grid-cols-6 grid-rows-6 gap-4">
              <div className="col-span-2 row-span-6 bg-gray-400 h-[486px] rounded-md" />
              <div className="col-span-2 row-span-3 col-start-3 bg-gray-400 rounded-md" />
              <div className="col-span-2 row-span-3 col-start-5 bg-gray-400 rounded-md" />
              <div className="col-span-2 row-span-3 col-start-3 row-start-4 bg-gray-400 rounded-md" />
              <div className="col-span-2 row-span-3 col-start-5 row-start-4 bg-gray-400 rounded-md" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Newslist;
