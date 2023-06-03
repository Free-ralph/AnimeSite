from django.urls import path
from .views import (
    getAnimeByFilter, getAnimeList, getAnimeSearch, 
    getArticleDetial, getArticleList, getGenreList, 
    getAnimeByRank, getMusic
    )

urlpatterns = [
    path('genre-list', getGenreList ),
    path('anime-list', getAnimeList ),
    path('anime/filter', getAnimeByFilter ),
    path('anime/search/<str:query>', getAnimeSearch ),
    path('anime/rank/<int:size>', getAnimeByRank ),
    path('article-list', getArticleList ),
    path('article-detail/<int:id>', getArticleDetial ),
    path('genreList', getGenreList ), 
    path('music', getMusic )
]