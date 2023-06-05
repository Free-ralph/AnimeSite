import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getBestRankingAnime } from "../services/api";
import { useQuery } from "react-query";
import { useStateContext } from "../context/StateContextProvider";
import { ItemCard } from "./ItemCard";
import "react-horizontal-scrolling-menu/dist/styles.css";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { AnimeItemType } from "../types/api";
import { RotateLoader } from "react-spinners";
import BrowseAnime from "./BrowseAnime/BrowseAnime";
import { useContainerRef } from "../pages/Layout";
import { Link } from "react-router-dom";

function Left() {
  const { Toast } = useStateContext();
  const containerDIVRef = useContainerRef();

  const { data: animeList, isLoading } = useQuery(
    ["newAnimeReleases"],
    () => getBestRankingAnime(5),
    {
      onError: () => {
        Toast("something's wrong, on it", "failure");
      },
      onSuccess: () => {},
    }
  );

  if (isLoading) {
    return (
      <div className="h-full w-full md:w-[70%] flex items-center justify-center">
        <RotateLoader color="#117f95" />
      </div>
    );
  }
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="h-full w-full lg:w-[70%]"
    >
      <section className="p-3 pl-5 lg:pl-20 text-gray-700 w-full lg:w-[95%] mt-[1rem]">
        <article>
          <p className="font-bold text-5xl md:text-6xl capitalize">
            Ranking the Finest Anime
          </p>
          <div className="w-full relative md:mt-7">
            <HorizontalScrollBar data={animeList} />
          </div>
        </article>
        <BrowseAnime containerDIVRef={containerDIVRef} />
      </section>
    </motion.div>
  );
}

function HorizontalScrollBar({ data }: { data: AnimeItemType[] | undefined }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasChildren, setHasChildren] = useState(false);

  const handleScrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && hasChildren) {
      const scrollAmount = -(scrollContainer.firstElementChild as HTMLElement)
        .offsetWidth;
      scrollContainer.scrollBy({
        top: 0,
        left: scrollAmount - 20,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && hasChildren) {
      const scrollAmount = (scrollContainer.firstElementChild as HTMLElement)
        .offsetWidth;
      scrollContainer.scrollBy({
        top: 0,
        left: scrollAmount + 20,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      setHasChildren(scrollContainer.children.length > 0);
    }
  }, []);

  return (
    <div className="flex items-center">
      <button
        className="scroll-button left border border-primary hidden md:block"
        onClick={handleScrollLeft}
      >
        <ArrowLeftIcon />
      </button>
      <div
        className="scroll-content overflow-x-auto whitespace-nowrap mt-6 md:mt-0 "
        ref={scrollContainerRef}
      >
        {!!data ? (
          <>
            {data.map((animeItem, i) => (
              <div className="md:mr-3 inline-block pb-2 md:pb-0" key={i}>
                <ItemCard animeItem={animeItem} />
              </div>
            ))}
            <div className="inline-flex md:h-[20rem] ">
              <div className="inline relative">
                <Link
                  className="rounded-md bg-primary text-secondary py-2 px-3 hover:bg-gray-700 transition-all md:absolute top-[50%]"
                  to="/ranked-anime"
                >
                  See More
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center">
            Could'nt fetch data, must've exceeded the daily quota of the api
            service i'm using... sigh
          </div>
        )}
      </div>
      <button
        className="scroll-button right border border-primary hidden md:block"
        onClick={handleScrollRight}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}

export default Left;
