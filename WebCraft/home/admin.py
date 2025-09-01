from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Favourites)
class FavouritesAdmin(admin.ModelAdmin):
    list_display = ('id', 'visitor_id', 'project')  # عرض الحقول في قائمة السجلات
    search_fields = ('visitor_id', 'project__title')  # خيار 
class PricingFeatureAdmin(admin.ModelAdmin):
    list_display = ('id', 'service', 'features')  # عرض الحقول في قائمة السجلات
    search_fields = ('id', 'service', 'features')  # خيار 
admin.site.register(Home)
admin.site.register(Service)
admin.site.register(Question)
admin.site.register(Project)
admin.site.register(Image)
admin.site.register(BackgroundImage)
admin.site.register(SavedProjects)
admin.site.register(Plan)
admin.site.register(PricingFeature, PricingFeatureAdmin)
admin.site.register(Pricing)