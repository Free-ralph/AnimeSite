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
      className={`h-[33rem] md:h-[20rem] w-full md:w-[42rem] flex flex-col md:flex-row justify-between mr-12 whitespace-normal overflow-hidden border-2 border-primary md:border-0`}
    >
      <div className="relative w-full md:w-[50%] h-[60%] md:h-full">
        <div className="overflow-hidden h-full w-full md:rounded-se-[3rem] md:rounded-es-[3rem] border-b-2 border-l-2 border-gray-500">
          <img
            className="w-full object-cover object-center"
            src={animeItem.thumb}
            alt={`${animeItem.title}-thumbnail`}
          />
        </div>
      </div>
      <div className="w-full md:w-[48%] h-full flex flex-col justify-between mt-4 md:mt-0">
        <div className="h-[30%] flex items-end ">
          <div className="font-bold  text-center flex items-center">
            <span className="text-4xl md:text-7xl">{animeItem.rank}-</span>
            <span className="text-lg md:text-2xl text-start leading-6">
              {animeItem.title}
            </span>
          </div>
        </div>

        <div className="w-full h-full md:h-[65%]  text-secondary md:rounded-se-[3rem] bg-primary border-2 border-gray-600  relative">
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
            className="border border-r-0 md:border-r-1 md:border-l-0 absolute bottom-0 right-0 md:right-[unset]  md:left-0 border-secondary rounded-ss-[1rem] md:rounded-ss-[0]  md:rounded-se-[1rem] text-secondary px-2 py-2 hover:border-white hover:text-white transition-all"
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
      className={`h-[33rem] md:h-[13rem] w-full flex flex-col md:flex-row justify-between mr-12 whitespace-normal overflow-hidden border-2 border-primary md:border-0`}
    >
      <div className="relative w-full md:w-[30%] h-[60%] md:h-full">
        <div className="overflow-hidden h-full w-full border-b-2 border-l-2 border-gray-500">
          <img
            className="w-full object-cover object-center"
            src={animeItem.thumb}
            alt={`${animeItem.title}-thumbnail`}
          />
        </div>
      </div>
      <div className="w-full md:w-[68%] h-full flex flex-col justify-between mt-4 md:mt-0">
        <div className="h-[30%] flex items-end ">
          <div className="font-bold  text-center flex items-center">
            <span className="text-4xl md:text-7xl">{animeItem.rank}-</span>
            <span className="text-lg md:text-2xl text-start leading-6">
              {animeItem.title}
            </span>
          </div>
        </div>

        <div className="w-full h-full md:h-[65%]  text-secondary  bg-primary  border-4 border-gray-600 relative">
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
            className="border border-r-0 md:border-r-1 md:border-l-0 absolute bottom-0 right-0 md:right-[unset]  md:left-0 border-secondary rounded-ss-[1rem] md:rounded-ss-[0]  md:rounded-se-[1rem] text-secondary px-2 py-2 hover:border-white hover:text-white transition-all"
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
      className={`h-[33rem] md:h-[13rem] w-full flex flex-col md:flex-row justify-between mr-12 whitespace-normal overflow-hidden border-2 border-primary md:border-0`}
    >
      <div className="relative w-full md:w-[30%] h-[60%] md:h-full">
        <div className="overflow-hidden h-full w-full border-b-2 border-l-2 border-gray-500">
          <img
            className="w-full object-cover object-center"
            src={article.thumb}
            alt={`${article.title}-thumbnail`}
          />
        </div>
      </div>
      <div className="w-full md:w-[68%] h-full flex flex-col justify-between mt-4 md:mt-0">
        <div className="h-[30%] flex items-end ">
          <div className="font-bold  text-center flex items-center">
            <span className="text-4xl md:text-7xl">{article.topic}-</span>
            <span className="text-lg md:text-2xl text-start leading-6">
              {article.title}
            </span>
          </div>
        </div>

        <div className="w-full h-full md:h-[65%]  text-secondary  bg-primary  border-4 border-gray-600 relative">
          <p className=" w-full p-3 overflow-hidden h-[80%] rounded-se-[5rem] pr-5 md:block">
            {article.summary}
          </p>
          <a
            href={article.url}
            target="_blank"
            className="border border-r-0 md:border-r-1 md:border-l-0 absolute bottom-0 right-0 md:right-[unset]  md:left-0 border-secondary rounded-ss-[1rem] md:rounded-ss-[0]  md:rounded-se-[1rem] text-secondary px-2 py-2 hover:border-white hover:text-white transition-all"
          >
            visit <LinkIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
