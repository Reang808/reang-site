from django.urls import path
from . import views


app_name = 'service'

urlpatterns = [
    path('', views.service_list_view, name='list'),
    path('<slug:slug>/', views.service_detail_view, name='detail'),
    path('service/', views.ServiceView.as_view(), name='service'),
    path('ecsite/', views.ECSiteView.as_view(), name='ecsite'),
    path('dx/', views.DXView.as_view(), name='dx'),
    path('reserve/', views.ReserveView.as_view(), name='reserve'),
    path('website/', views.WebsiteView.as_view(), name='website'),
    path('it_support/', views.ITSupportView.as_view(), name='it_support'),
]