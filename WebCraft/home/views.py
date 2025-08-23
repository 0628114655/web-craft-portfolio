from django.shortcuts import render
from .serializer import *
from rest_framework import generics
from rest_framework import mixins
from .models import *
from rest_framework.response import Response
from django.db.models import Count



# Create your views here.
class Home(generics.ListCreateAPIView):
    serializer_class = Home_serializer
    queryset = Home.objects.all()
    
class Service(generics.ListCreateAPIView):
    serializer_class = Service_serializer
    queryset = Service.objects.all()

class Question(generics.ListCreateAPIView):
    serializer_class = Question_serializer
    queryset = Question.objects.all()

class Projects(mixins.ListModelMixin, mixins.RetrieveModelMixin, generics.GenericAPIView):
    serializer_class = Project_serializer
    queryset = Project.objects.all()
    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        if pk != None:
            return self.retrieve(request, *args, **kwargs)
        else:
            return self.list(request, *args, **kwargs)

class Images(generics.ListCreateAPIView):
    serializer_class = Image_serializer
    queryset = Image.objects.all()
    
class FavouritesView(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView ):
    serializer_class = Favourites_serializer
    queryset = Favourites.objects.all()
    lookup_field = 'pk'

    def get(self, request,*args, **kwargs):
        favourites_dict = {}
        user = request.COOKIES.get('visitor_id')
        favourites = Favourites.objects.filter(visitor_id = user)
        projectAllLikes = {}
        projectLikes = Favourites.objects.values('project__id').annotate(likes = Count('id'))
        for d in projectLikes:
            id = d['project__id']
            likes = d['likes']
            projectAllLikes[id] = likes 
       
        fav_id = favourites.values_list('project_id' , flat=True)
        projects = Project_serializer(Project.objects.filter(id__in = fav_id), many = True).data
        serializer = Favourites_serializer(favourites, many = True)
        favourites_dict = {'favourites' : serializer.data, 'projects' : projects, 'projectAllLikes': projectAllLikes}
        return Response({'favourites_list' : favourites_dict})
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 

    def delete(self, request, *args, **kwargs):
        visitor_id = request.COOKIES.get('visitor_id')
        instance = self.get_object()
        if instance.visitor_id != visitor_id:
            return Response({'error' : 'غير مسموح بالحذف'}, status=403)
        return super().destroy(request, *args, **kwargs)
    
    def get_serializer_context(self):
            context = super().get_serializer_context()
            context.update({"request": self.request})  # تمرير request للـ serializer
            return context
    

class SavesView(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView ):
    serializer_class = Saves_serializer
    queryset = SavedProjects.objects.all()
    lookup_field = 'pk'

    def get(self, request,*args, **kwargs):
        favorites_dict = {}
        user = request.COOKIES.get('visitor_id')
        saves = SavedProjects.objects.filter(visitor_id = user)
        save_id = saves.values_list('project_id' , flat=True)
        projects = Project_serializer(Project.objects.filter(id__in = save_id), many = True).data
        serializer = Saves_serializer(saves, many = True)
        favorites_dict = {'saves' : serializer.data,  'projects' : projects }
        return Response({'saves_list' : favorites_dict})
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)  # من الميكسين

    def delete(self, request, *args, **kwargs):
        visitor_id = request.COOKIES.get('visitor_id')
        instance = self.get_object()
        if instance.visitor_id != visitor_id:
            return Response({'error' : 'غير مسموح بالحذف'}, status=403)
        return super().destroy(request, *args, **kwargs)
    
    def get_serializer_context(self):
            context = super().get_serializer_context()
            context.update({"request": self.request})  # تمرير request للـ serializer
            return context
    





    