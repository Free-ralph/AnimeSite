import { AnimeItemType, ArticleType } from "../types/api";
import LinkIcon from "@mui/icons-material/Link";

type ItemCardProps = {
  animeItem: AnimeItemType;
};
type ItemCard3props = {
  article: ArticleType;
};

export function ItemCard({ animeItem }: ItemCardProps) {
  return (
    <div
      className={`h-[30rem] md:h-[20rem] w-[15rem] md:w-[42rem] flex flex-col md:flex-row justify-between md:mr-12 whitespace-normal overflow-hidden border-2 border-primary md:border-0 rounded-md`}
    >
      <div className="relative w-full md:w-[50%] h-[60%] md:h-full">
        <div className="overflow-hidden h-full w-full md:rounded-se-[3rem] md:rounded-es-[3rem] border-b-2 md:border-l-2 border-gray-500">
          <img
            className="w-full object-cover object-center"
            src={animeItem.thumb}
            alt={`${animeItem.title}-thumbnail`}
          />
        </div>
      </div>
      <div className="w-full md:w-[48%] h-full flex flex-col justify-between">
        <div className="h-[30%] flex items-end p-2">
          <div className="font-bold  text-center flex items-center">
            <span className="text-3xl md:text-7xl">{animeItem.rank}-</span>
            <span className="text-lg md:text-2xl text-start leading-6">
              {animeItem.title}
            </span>
          </div>
        </div>

        <div className="w-full h-full md:h-[65%]  text-secondary md:rounded-se-[3rem] bg-primary md:border-2 border-gray-600  relative">
          <p className=" w-full p-3 overflow-hidden h-[80%] rounded-se-[5rem] pr-5 hidden md:block">
            {animeItem.synopsis.slice(0, 160)}{" "}
            {animeItem.synopsis.length >= 160 && "..."}
          </p>
          <p className=" w-full p-3 overflow-hidden h-[80%] rounded-se-[5rem] pr-5 block md:hidden">
            {animeItem.synopsis.slice(0, 100)}{" "}
            {animeItem.synopsis.length >= 100 && "..."}
          </p>
          <a
            href={animeItem.link}
            target="_blank"
            className="border border-b-0 border-r-0 md:border-r-1 md:border-l-0 absolute bottom-0 right-0 md:right-[unset]  md:left-0 border-secondary rounded-ss-[1rem] md:rounded-ss-[0]  md:rounded-se-[1rem] text-secondary px-2 py-1 hover:border-white hover:text-white transition-all"
          >
            visit <LinkIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

export function ItemCard2({ animeItem }: ItemCardProps) {
  return (
    <div
      className={`h-[30rem] md:h-[13rem] w-full flex flex-col md:flex-row justify-between mr-12 whitespace-normal overflow-hidden border-2 border-primary md:border-0 rounded-md`}
    >
      <div className="relative w-full md:w-[30%] h-[60%] md:h-full">
        <div className="overflow-hidden h-full w-full border-b-1 md:border-1 border-gray-500 md:rounded-md">
          <img
            className="w-full object-cover object-center"
            src={animeItem.thumb}
            alt={`${animeItem.title}-thumbnail`}
          />
        </div>
      </div>
      <div className="w-full md:w-[68%] h-full flex flex-col justify-between">
        <div className="h-[30%] flex items-end p-2 md:p-0">
          <div className="font-bold  text-center flex items-center">
            <span className="text-3xl md:text-7xl">{animeItem.rank}-</span>
            <span className="text-lg md:text-2xl text-start leading-6">
              {animeItem.title}
            </span>
          </div>
        </div>

        <div className="w-full h-full md:h-[65%]  text-secondary  bg-primary  md:border-[3px] border-gray-600 relative md:rounded-md">
          <p className=" w-full p-3 overflow-hidden h-[80%] rounded-se-[5rem] pr-5 hidden md:block">
            {animeItem.synopsis.slice(0, 160)}{" "}
            {animeItem.synopsis.length >= 160 && "..."}
          </p>
          <p className=" w-full p-3 overflow-hidden h-[80%] rounded-se-[5rem] pr-5 block md:hidden">
            {animeItem.synopsis.slice(0, 100)}{" "}
            {animeItem.synopsis.length >= 100 && "..."}
          </p>
          <a
            href={animeItem.link}
            target="_blank"
            className="border border-b-0 border-r-0 md:border-r-1 md:border-l-0 absolute bottom-0 right-0 md:right-[unset]  md:left-0 border-secondary rounded-ss-[1rem] md:rounded-ss-[0]  md:rounded-se-[1rem] text-secondary px-2 py-1 hover:border-white hover:text-white transition-all"
          >
            visit <LinkIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

export function ItemCard3({ article }: ItemCard3props) {
  return (
    <div
      className={`max-h-[30rem] md:h-[13rem] w-full flex flex-col md:flex-row justify-between mr-12 whitespace-normal overflow-hidden border-2 border-primary md:border-0 rounded-md`}
    >
      <div className="relative w-full md:w-[30%] max-h-[17rem] md:h-full md:rounded-md bg-primary overflow-hidden border-b-1 md:border-1 border-primary">
        <div className="h-full w-full overflow-hidden ">
          <img
            className="w-full object-cover object-center"
            src={article.thumb}
            alt={`${article.title}-thumbnail`}
          />
        </div>
      </div>
      <div className="w-full md:w-[68%] h-full md:h-full flex flex-col justify-between">
        <div className="h-[30%] flex items-end p-2">
          <div className="font-bold  text-center flex items-center">
            <span className="text-lg md:text-2xl text-start leading-6">
              {article.title}
            </span>
          </div>
        </div>

        <div className="w-full md:h-[65%]  text-secondary  bg-primary md:rounded-md md:border-[3px] border-gray-600 relative">
          <p className=" w-full p-3 overflow-hidden h-[70%] rounded-se-[5rem] pr-5 md:block">
            {article.summary}
          </p>
          <div className="w-full relative border-red-500 h-[2rem]">
            <a
              href={article.url}
              target="_blank"
              className="border border-b-0 border-r-0 md:border-r-1 md:border-l-0 absolute right-0 md:right-[unset]  md:left-0 border-secondary rounded-ss-md md:rounded-ss-[0]  md:rounded-se-md text-secondary px-2 py-1 hover:border-white hover:text-white transition-all"
            >
              visit <LinkIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
