from rest_framework.response import Response
from rest_framework.decorators import api_view
from backend.models import Genre, Article, ArticleDetail, Anime, Music
from .serializer import AnimeSerializer, ArticleSerializer, GenreSerializer, ArticleDetailSerializer, MusicSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination

@api_view(['GET'])
def getGenreList(request):
    genres = Genre.objects.all()
    serializer = GenreSerializer(genres, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getAnimeList(request):
    page = request.GET.get("page")
    paginator = PageNumberPagination()
    paginator.page_size = 10
    animeList = Anime.objects.all().order_by('rank')
    paginated_queryset = paginator.paginate_queryset(animeList, request)
    serializer = AnimeSerializer(paginated_queryset, many = True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def getAnimeByFilter(request):
    genre = request.GET.get("genre")
    query = request.GET.get("query")
    if genre.lower() == "all":
        animeList = Anime.objects.filter(title__icontains = query).order_by('title').distinct()
    else:
        lookup = (
            Q(genre__name__iexact = genre) &
            Q(title__icontains = query)
        )
        animeList = Anime.objects.filter(lookup).order_by('title').distinct()
        
    paginator = PageNumberPagination()
    paginator.page_size = 10
    paginated_queryset = paginator.paginate_queryset(animeList, request)
    serializer = AnimeSerializer(paginated_queryset, many = True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def getAnimeSearch(request, query):
    animeList = Anime.objects.filter(title__icontains = query)
    serializer = AnimeSerializer(animeList, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getArticleList(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    articleList = Article.objects.all()
    paginated_queryset = paginator.paginate_queryset(articleList, request)
    serializer = ArticleSerializer(paginated_queryset, many = True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def getArticleDetial(request, id):
    try:
        article = ArticleDetail.objects.get(id = id)
        serializer = ArticleDetailSerializer(article)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response({"message" : "article does not exist"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
def getAnimeByRank(request, size):
    animeList = Anime.objects.all().order_by("rank")[:size]
    seriailizer = AnimeSerializer(animeList, many = True)
    return Response(seriailizer.data)

@api_view(['GET'])
def getMusic(request):
    musics = Music.objects.all()
    serializer = MusicSerializer(musics, many = True)

    return Response(serializer.data)
