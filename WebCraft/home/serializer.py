import rest_framework
from rest_framework import serializers
from .models import *

class Home_serializer(serializers.ModelSerializer):
   class Meta:
        model = Home
        fields = '__all__'

class Service_serializer(serializers.ModelSerializer):
   class Meta:
        model = Service
        fields = '__all__'

class Question_serializer(serializers.ModelSerializer):
   class Meta:
        model = Question
        fields = '__all__'

class Image_serializer(serializers.ModelSerializer):
   class Meta:
        model = Image
        fields = '__all__'

class BackgroundImages_serializer(serializers.ModelSerializer):
   class Meta:
        model = BackgroundImage
        fields = '__all__'

class Project_serializer(serializers.ModelSerializer):
   images = Image_serializer(read_only=True, many = True)

   class Meta:
        model = Project
        fields = '__all__'

class Favourites_serializer(serializers.ModelSerializer):
   class Meta:
        model = Favourites
        fields = ['project', 'id']  # لا نطلب visitor_id من المستخدم

   def create(self, validated_data):
        visitor_id = self.context['request'].COOKIES.get('visitor_id')
        if not visitor_id:
            raise serializers.ValidationError("No visitor_id in cookies.")
        
        project = validated_data['project']
        favorite, created = Favourites.objects.get_or_create(
            visitor_id=visitor_id,
            project=project
        )
        return favorite
   
class Saves_serializer(serializers.ModelSerializer):
   class Meta:
        model = SavedProjects
        fields = ['project', 'id']  # لا نطلب visitor_id من المستخدم

   def create(self, validated_data):
        visitor_id = self.context['request'].COOKIES.get('visitor_id')
        if not visitor_id:
            raise serializers.ValidationError("No visitor_id in cookies.")
        
        project = validated_data['project']
        savedproject, created = SavedProjects.objects.get_or_create(
            visitor_id=visitor_id,
            project=project
        )
        return savedproject
   
class Plan_serializer(serializers.ModelSerializer):
   class Meta:
        model = Plan
        fields = '__all__'

class PricingFeature_serializer(serializers.ModelSerializer):
   class Meta:
        model = PricingFeature
        fields = '__all__'

class Pricing_serializer(serializers.ModelSerializer):
     description = PricingFeature_serializer(many=True)  # nested
     plan = Plan_serializer()           
     services = serializers.StringRelatedField()        

     class Meta:
        model = Pricing
        fields = '__all__'