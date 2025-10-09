from django.urls import path
from . import views


app_name = 'service'

urlpatterns = [
    path('', views.service_list_view, name='list'),
    path('<slug:slug>/', views.service_detail_view, name='detail'),  # 汎用パターンは最後に
]