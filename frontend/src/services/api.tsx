import axios from "axios";
import { AnimeItemType, AnimeReleasesType, ArticleType, MusicType} from "../types/api";

const axiosCustom = axios.create({
  baseURL: "/api",
});

async function getAnimeGenreList() {
  const response = await axiosCustom.get<{name : string}[]>("/genre-list");
  return response.data;
}

async function getArticleList(page = 1) {
  const response = await axiosCustom.get<{results : ArticleType[], count : number}>(`/article-list?page=${page}`);
  return response.data;
}

async function getAnimeListByFilter(genre = "", query = "", page = 1) {
  const optionalParams = {
    genre: genre,
    query: query,
    page: page
  };
  
  
  const response = await axiosCustom.get<{results : AnimeItemType[], count : number}>(
    `anime/filter`, {params : optionalParams}
  );  
  return response.data;
}

async function getAnimeListBySearch(query: string | undefined, page = 1) {
  const response = await axiosCustom.get<{ data: AnimeItemType[] }>(
    `anime/search/${query}?page=${page}`
  );
  return response.data;
}

async function getBestRankingAnime(size : number) {
  const response = await axiosCustom.get<AnimeItemType[]>(
    `anime/rank/${size}`
  );
  return response.data;
}

async function getNewAnimeReleases() {
  const options = {
    method: 'GET',
    url: 'https://myanimelist.p.rapidapi.com/anime/top/upcoming',
    headers: {
      'X-RapidAPI-Key': '1813829145msh833c644a187b3adp1038b5jsn079b91f9ceed',
      'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
    }
  };
  const response = await axios.request<AnimeReleasesType[]>(options);
  return response.data;
}

async function getMusicFiles() {
  const response = await axiosCustom.get<MusicType[]>('/music');
  return response.data;
}


export {
  getArticleList,
  getAnimeListByFilter,
  getAnimeGenreList,
  getAnimeListBySearch,
  getNewAnimeReleases, 
  getBestRankingAnime, 
  getMusicFiles
};
