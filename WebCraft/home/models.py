from django.db import models

# Create your models here.

class Home(models.Model):
    content = models.TextField()
    def __str__(self):
        return self.content[0:50]
    
class Service(models.Model):
    icon = models.CharField(max_length = 100)
    color = models.CharField(max_length = 50, null = True, blank = True)
    title = models.CharField(max_length = 100)
    content = models.TextField(max_length=375)

    def __str__(self):
        return self.title
    
class Question(models.Model):
    question = models.CharField(max_length = 200)
    answer = models.TextField()

    def __str__(self):
        return self.question

class Project(models.Model):
    id = models.AutoField(primary_key=True)
    choices = [('متجر إلكتروني', 'متجر إلكتروني'), ('مدونة', 'مدونة'),('منصة تعليمية', 'منصة تعليمية'), ('خدمات', 'خدمات')]
    title = models.CharField(max_length = 100)
    type = models.CharField(max_length = 100 , default = 'خدمات', choices = choices)
    gimpse = models.CharField(max_length = 400)
    content = models.TextField()

    def __str__(self):
        return self.title
    
class Image(models.Model):
    id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, related_name = 'images', on_delete = models.CASCADE)
    image = models.ImageField()

    def __str__(self):
        return f' {self.id} |المشروع: {self.project.title}'  
    
class Favorites(models.Model):
    id = models.AutoField(primary_key=True)
    visitor_id = models.CharField(max_length = 150)
    project = models.ForeignKey(Project, on_delete = models.CASCADE)

    def __str__(self):
        return self.project.title
    class Meta:
        unique_together = ('project',  'visitor_id')

class SavedProjects(models.Model):
    id = models.AutoField(primary_key=True)
    visitor_id = models.CharField(max_length = 150)
    project = models.ForeignKey(Project, on_delete = models.CASCADE)

    def __str__(self):
        return self.project.title
    
    class Meta:
        unique_together = ('project',  'visitor_id')

