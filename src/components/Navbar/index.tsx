import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent, useRef } from "react";
import { FcSearch } from "react-icons/fc";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSeacrh = (event: SyntheticEvent) => {
    event.preventDefault();
    const keyword = searchRef.current?.value || "";
    router.push(`/search/${keyword}`);
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  };

  return (
    <>
      <nav className="bg-black py-4 px-10 flex justify-between items-center">
        <div className="text-white font-bold">DNA News</div>
        <div className="flex items-center">
          <Link href="/" className="mr-5 text-white">
            Home
          </Link>
          <Link href="/news" className="text-white">
            Saved
          </Link>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 mr-2 rounded-md focus:outline-none"
            ref={searchRef}
          />
          <button
            className="bg-white text-xl py-2.5 px-4 rounded-md"
            onClick={handleSeacrh}
          >
            <FcSearch />
          </button>
        </div>
      </nav>
      {children}
    </>
  );
};

export default Navbar;
