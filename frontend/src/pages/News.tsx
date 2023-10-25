import { motion } from "framer-motion";
import { ItemCard3 } from "../components/ItemCard";
import { getArticleList } from "../services/api";
import { useQuery } from "react-query";
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContextProvider";
import Paginator from "../components/Paginator";
import { useContainerRef } from "./Layout";

export default function AnimeNews() {
  const { Toast } = useStateContext();
  const containerDIVRef = useContainerRef();
  const [curPage, setCurPage] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pagesBefore, setPagesBefore] = useState<number[]>();
  const [pagesAfter, setPagesAfter] = useState<number[]>();
  const numberOfPagesDisplayed = 2;

  const {
    data: articleList,
    isLoading,
    isFetching,
    refetch: refetchArticle,
  } = useQuery("articles", () => getArticleList(curPage), {
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
  });

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
    refetchArticle();
  }, [curPage]);

  if (isLoading || isFetching) {
    return (
      <div className="h-full w-full md:w-[70%] flex items-center justify-center">
        <HashLoader color="#117f95" />
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
            Browse All the latest News
          </p>
          <div className="w-full mt-3 gap-4 flex flex-col">
            {articleList?.results.map((article, i) => (
              // biuld another card
              <ItemCard3 key={i} article={article} />
            ))}
          </div>
          <Paginator
            isPrevDisabled={isPrevDisabled}
            handleNextPage={handleNextPage}
            handlePageSkip={handlePageSkip}
            handlePrevPage={handlePrevPage}
            pagesAfter={pagesAfter}
            pagesBefore={pagesBefore}
            isNextDisabled={isNextDisabled}
            curPage={curPage}
          />
        </article>
      </section>
    </motion.div>
  );
}
