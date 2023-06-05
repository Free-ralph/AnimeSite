import React, { ChangeEvent, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getAnimeListByFilter, getAnimeGenreList } from "../../services/api";
import { RotateLoader } from "react-spinners";
import { useStateContext } from "../../context/StateContextProvider";
import Paginator from "../Paginator";
import { ItemCard2 } from "../ItemCard";
import "./BrowseAnime.css";

export default function BrowseAnime({
  containerDIVRef,
}: {
  containerDIVRef: React.RefObject<HTMLDivElement>;
}) {
  const { Toast } = useStateContext();
  const [query, setQuery] = useState<string>("");
  const [genre, setGenre] = useState<string>("all");
  const [curPage, setCurPage] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pagesBefore, setPagesBefore] = useState<number[]>();
  const [pagesAfter, setPagesAfter] = useState<number[]>();
  const numberOfPagesDisplayed = 2;

  const {
    data: animeList,
    isLoading,
    isFetching,
    refetch: refetchAnimeList,
  } = useQuery(
    ["filteredAnime"],
    () => getAnimeListByFilter(genre, query, curPage),
    {
      onError: () => {
        Toast("something's wrong, on it", "failure");
      },
      onSuccess: (data) => {
        setIsNextDisabled(data && Math.ceil(data.count / 10) === curPage);
        setIsPrevDisabled(curPage === 1);
        setTotalPages(Math.ceil(data.count / 10));
        setPagesBefore(() => {
          const pages_before = Array.from(
            { length: Math.min(curPage, numberOfPagesDisplayed) },
            (_, index) => curPage - index - 1
          )
            .reverse()
            .filter((page) => page >= 1);
          return pages_before;
        });
        setPagesAfter(() => {
          const total_pages = Math.ceil(data.count / 10);
          const pages_after = Array.from(
            { length: Math.min(total_pages - curPage, numberOfPagesDisplayed) },
            (_, index) => curPage + index + 1
          ).filter((page) => page <= total_pages);
          return pages_after;
        });
      },
    }
  );

  const { data: availableGenres, isLoading: gettingGenres } = useQuery(
    "animeGenres",
    getAnimeGenreList,
    {
      onError: () => {
        Toast("something's wrong, on it", "failure");
      },
      onSuccess: () => {
        refetchAnimeList();
      },
    }
  );

  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const handleNextPage = () => {
    // NB i'm doing it this way cause i hardcoded the page number in the backend
    if (curPage < totalPages) {
      setCurPage(curPage + 1);
      containerDIVRef.current?.scrollTo({ top: 500, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (curPage > 0) {
      setCurPage(curPage - 1);
    }
    containerDIVRef.current?.scrollTo({ top: 500, behavior: "smooth" });
  };

  const handlePageSkip = (page: number) => {
    setCurPage(page);
    containerDIVRef.current?.scrollTo({ top: 500, behavior: "smooth" });
  };

  useEffect(() => {
    refetchAnimeList();
  }, [genre, curPage, query]);

  useEffect(() => {
    setCurPage(1);
  }, [genre, query]);

  if (isLoading || gettingGenres) {
    return (
      <div className="w-full h-full flex items-center justify-center mt-10">
        <RotateLoader color="#117f95" />
      </div>
    );
  }
  return (
    <article className="w-full ">
      <div className="flex flex-col md:flex-row w-full justify-between items-center md:items-start gap-2 my-6">
        <p className="font-bold text-3xl md:text-4xl lg:text-6xl capitalize w-full break-words md:w-[60%]">
          Top results For {query ? query : genre}
        </p>
        <div className="flex gap-2 w-full md:w-[40%]">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search anime"
            className="rounded-md w-[60%] h-[3rem] border border-primary focus:border-2 focus:outline-none bg-transparent px-2"
          />
          <select
            className="rounded-md bg-transparent border border-primary w-[40%] h-[3rem] focus:border-2 ml-2 px-2"
            onChange={handleGenreChange}
          >
            <option
              value="all"
              className="bg-primary text-secondary my-2 hover:bg-secondary hover:text-primary transition-all"
            >
              All
            </option>
            {availableGenres?.map((genreName, i) => (
              <option
                key={i}
                value={genreName.name}
                className="bg-primary text-secondary my-2 hover:bg-secondary hover:text-primary transition-all"
              >
                {genreName.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isFetching ? (
        <div className="w-full h-full flex items-center justify-center mt-10">
          <RotateLoader color="#117f95" />
        </div>
      ) : (
        <>
          <div className="w-full mt-3 gap-4 flex flex-col">
            {animeList?.results.map((anime, i) => (
              // biuld another card
              <ItemCard2 key={i} animeItem={anime} />
            ))}
          </div>
          <Paginator
            curPage={curPage}
            isPrevDisabled={isPrevDisabled}
            isNextDisabled={isNextDisabled}
            handleNextPage={handleNextPage}
            handlePageSkip={handlePageSkip}
            handlePrevPage={handlePrevPage}
            pagesAfter={pagesAfter}
            pagesBefore={pagesBefore}
          />
        </>
      )}
    </article>
  );
}
