from django.contrib import admin
from .models import Anime, ArticleDetail, Article, Genre, Music



class ArticleAdmin(admin.ModelAdmin):
    list_display = [
        'title',
        'category', 
    ]


admin.site.register(Article, ArticleAdmin)
admin.site.register(Anime)
admin.site.register(ArticleDetail)
admin.site.register(Genre)
admin.site.register(Music)

