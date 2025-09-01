from django.urls import path
from .import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('', views.Home.as_view() ,name= 'home'),
    path('services/', views.Service.as_view() ,name= 'Service'),
    path('Questions/', views.Question.as_view() ,name= 'Questions'),
    path('Projects/', views.Projects.as_view() ,name= 'Projects'),
    path('Projects/<pk>/', views.Projects.as_view() ,name= 'Projects-detail'),
    path('Images/', views.Images.as_view() ,name= 'Images'),
    path('BackgroundImages/', views.BackgroundImages.as_view() ,name= 'BackgroundImages'),
    path('Favourites/', views.FavouritesView.as_view(), name= 'Favourites'),
    path('Favourites/<pk>/', views.FavouritesView.as_view(), name= 'favourites-detail'),
    path('Saves/', views.SavesView.as_view(), name= 'Saves'),
    path('Saves/<pk>/', views.SavesView.as_view(), name= 'Saves-detail'),

]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
