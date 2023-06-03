from backend.models import Anime, ArticleDetail, Article, Genre
from decouple import config
import requests


def fetchArticles():
        url = "https://anime-news-net.p.rapidapi.com/api/news"

        headers = {
            "X-RapidAPI-Key": config("RAPID_API_KEY"),
            "X-RapidAPI-Host": "anime-news-net.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            try:
                for c, item in enumerate(response.json()):
                    article = item['article']
                    newArticle = Article.objects.create(
                        title = article['title'].replace("\n", "").strip(), 
                        category = article['category'], 
                        summary = article['summary'],
                        thumb = article['thumbnail'],
                        url = article['url']
                    )
                    fetchArticleDetail(article['api_url'], newArticle)
                    if c == 40:
                        break
                return True
            except Exception as e:
                print(e)
                raise Exception(e)
        else:
            raise Exception("couldn't fetch news list") 

def fetchArticleDetail(url_api, newArticle):
    url = "https://anime-news-net.p.rapidapi.com" + str(url_api)

    headers = {
        "X-RapidAPI-Key": config("RAPID_API_KEY"),
        "X-RapidAPI-Host": "anime-news-net.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)
    news = response.json()[0]
    if response.status_code == 200:
        try:
            ArticleDetail.objects.create(
                title = news["title"].replace("\n", "").strip(),
                subtitle = news["subtitle"].replace("\n", "").strip(),
                intro = news["intro"],
                img = news["img"],
                body = news["body"].replace("\n", "").strip(), 
                article = newArticle

            )
        except Exception as e:
            print(e)
            raise Exception("somethin went wrong while saving [" + str(e) + "]") 
            
    else:
        raise Exception("failed to fetch news detail")


def fetchAnime(pageNo):
    url = "https://anime-db.p.rapidapi.com/anime"
    

    querystring = {"page":str(pageNo),"size":"500","sortBy":"ranking","sortOrder":"asc"}
    headers = {
        "X-RapidAPI-Key": config("RAPID_API_KEY"),
        "X-RapidAPI-Host": "anime-db.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    
    animeList = response.json()['data']
    if response.status_code == 200:
        try:
            for anime in animeList:
                newAnime = Anime.objects.create(
                    refID = anime["_id"],
                    title = anime["title"],                  
                    rank = anime["ranking"],                    
                    thumb = anime["image"],
                    synopsis = anime["synopsis"],
                    link = anime["link"],
                    status = anime["status"],
                    episodes = anime["episodes"],
                    type = anime["type"]
                )
                
                for g in anime['genres']:
                    genre, created = Genre.objects.get_or_create(name = g.lower())
                    newAnime.genre.add(genre)
                
                    newAnime.save()
        except Exception as e:
            print(e)
            raise Exception("somethin went wrong while saving [" + str(e) + "]") 
        
    else:
        raise Exception("couldn't fetch")
