from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from backend.utils import fetchArticles, fetchAnime

class Command(BaseCommand):
    

    def handle(self, *args, **options):
        try:
        #    fetchArticles()
            for i in range(1, 20):
                fetchAnime(i)
            self.stdout.write(self.style.SUCCESS('News populated succesfully')) 
        except Exception as e:
            raise CommandError(e)
