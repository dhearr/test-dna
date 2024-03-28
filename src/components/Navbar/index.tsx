import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

const Navbar = ({ children }: any) => {
  const searchRef: any = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSeacrh = (event: any) => {
    event.preventDefault();
    const keyword = searchRef.current.value;
    router.push(`/search/${keyword}`);
    searchRef.current.value = "";
  };

  return (
    <>
      <nav className="bg-gray-800 py-4 px-10 flex justify-between items-center">
        <div className="text-white font-bold">Logo</div>
        <div className="flex items-center">
          <Link href="/" className="mr-4 text-white">
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
            className="px-4 py-2 mr-2 rounded-l-md focus:outline-none"
            ref={searchRef}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
            onClick={handleSeacrh}
          >
            Search
          </button>
        </div>
      </nav>
      {children}
    </>
  );
};

export default Navbar;
