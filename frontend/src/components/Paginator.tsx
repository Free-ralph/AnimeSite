
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";


type PaginatorProps = {
    isPrevDisabled : boolean ;
    handlePrevPage : () => void ;
    handlePageSkip : (page : number) => void ;
    pagesBefore : number[] | undefined;
    pagesAfter : number[] | undefined;
    isNextDisabled : boolean ;
    handleNextPage : () => void ;
    curPage : number
}

export default function Paginator({curPage, isPrevDisabled, handlePrevPage, pagesBefore, pagesAfter, handlePageSkip, isNextDisabled, handleNextPage} : PaginatorProps ) {
  const activeStyle =
    "cursor-pointer border border-primary p-2 md:p-3 flex items-center hover:bg-primary hover:text-secondary transition-all";
  const disabledStyle =
    "cursor-pointer border border-gray-500 text-gray-400 p-2 md:p-3 flex items-center ";

  return (
    <div className=" h-[2.5rem] mt-2 flex justify-center gap-1 md:gap:2">
      <button
        disabled={isPrevDisabled}
        className={isPrevDisabled ? disabledStyle : activeStyle}
        onClick={handlePrevPage}
      >
        <ArrowLeftIcon />
      </button>
      {pagesBefore &&
        pagesBefore.map((page, i) => (
          <div
            key={i}
            className={activeStyle}
            onClick={() => handlePageSkip(page)}
          >
            {page}
          </div>
        ))}
      <div className="border border-primary bg-primary text-secondary flex items-center text-center p-2 md:p-3">
        {curPage}
      </div>
      {pagesAfter &&
        pagesAfter.map((page, i) => (
          <div
            key={i}
            className={activeStyle}
            onClick={() => handlePageSkip(page)}
          >
            {page}
          </div>
        ))}
      <button
        disabled={isNextDisabled}
        className={isNextDisabled ? disabledStyle : activeStyle}
        onClick={handleNextPage}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}
