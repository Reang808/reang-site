"""
Django context processors for adding global template variables
"""
import time
from django.conf import settings


def css_cache_buster(request):
    """
    開発時にCSSファイルのキャッシュバスティングのためのタイムスタンプを提供
    """
    return {
        'css_timestamp': int(time.time()) if settings.DEBUG else '',
        'debug': settings.DEBUG,
    }