from django.db import models

# Create your models here.

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name

class Anime(models.Model):
    refID = models.CharField(max_length=100, blank=True, null=True)
    title = models.CharField(max_length=200)
    rank = models.IntegerField()
    thumb = models.CharField(max_length=500)
    synopsis = models.TextField(null = True, blank= True)
    link = models.CharField(max_length=500, null = True, blank = True)
    status = models.CharField(max_length=200, null = True, blank= True)
    genre = models.ManyToManyField(Genre, related_name="animes")
    episodes = models.IntegerField(null=True, blank=True)
    type = models.CharField(max_length=200, null=True, blank=True)


    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Animes"
    

class Article(models.Model):
    title = models.CharField(max_length=200)
    summary = models.CharField(max_length=300)
    category = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now=True)
    thumb = models.CharField(max_length=500)
    url = models.CharField(max_length=500)
    topic = models.CharField(max_length=100)

    def __str__(self):
        return self.title

    
class ArticleDetail(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=100)
    intro = models.CharField(max_length=200)
    img = models.CharField(max_length=500)
    body = models.TextField()
    date = models.DateTimeField(auto_now=True)
    article  = models.OneToOneField("Article", related_name="article",  on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Music(models.Model):
    title = models.CharField(max_length=100)
    audio = models.FileField(upload_to="audio/")

    def __str__(self):
        return self.title
