

# Create your models here.
from django.db import models

# Create your models here.
class Data(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.CharField(max_length=30)
    phone = models.CharField(max_length=15)
    emp_code = models.CharField(max_length=30)
    position = models.CharField(max_length=40)
   

    def __str__(self):
        return(f"{self.first_name} {self.last_name}")
