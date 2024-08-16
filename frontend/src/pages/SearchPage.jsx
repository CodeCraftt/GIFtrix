import React, { useState, useEffect } from "react";
import { searchGifs } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [tag, setTag] = useState("");
  const [gifs, setGifs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchGifs(tag, page);
      setGifs((prevGifs) => [...prevGifs, ...results]);
    } catch (error) {
      console.error("Error searching GIFs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGifClick = (gif) => {
    navigate(`/gif/${gif._id}`, { state: { gif } });
  };

  useEffect(() => {
    if (tag) {
      handleSearch();
    }
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="mx-4 md:mx-20">
      <h1 className=" font-bold text-[2.2rem] mb-5 ">Search GIFs</h1>

      <div className="flex items-center gap-2 w-full">
      <label className="w-[75%] md:w-[90%] input input-bordered flex items-center gap-2">
        <input
          className="grow"
          type="text"
          placeholder="Search by tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <button
      className="btn btn-success text-white"
        onClick={() => {
          setPage(1);
          setGifs([]);
          handleSearch();
        }}
      >
        Search
      </button>
      </div>
      


      <div id="gif-container " className="my-5 flex flex-wrap justify-start items-center gap-2 ">
        {gifs.map((gif, index) => (
          <img
            key={index}
            src={gif.url}
            alt={`GIF ${index}`}
            onClick={() => handleGifClick(gif)}
            style={{ cursor: "pointer" }}
            className="w-15 h-15 rounded-sm"
          />
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {gifs.length > 0 && !loading && (
        <button className="btn btn-neutral mt-10 block mx-auto" onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default SearchPage;
