export interface NewsItem  {
    title : string;
    image : string;
    
}

export type AnimeItemType = {
    title : string ; 
    _id : string;
    genres : string[];
    link : string;
    thumb : string;
    episodes : number;
    status : string;
    synopsis : string;
    rank : number
}

export type AnimeReleasesType = {
    title : string;
    picture_url : string;
    myanimelist_url : string ;
    rank : number;
    type : string;
}

export type ArticleType = {
    title : string;
    summary : string;
    category : string;
    date : string;
    thumb : string;
    url : string;
    topic : string
}

export type MusicType = {
    title : string;
    audio : string
}