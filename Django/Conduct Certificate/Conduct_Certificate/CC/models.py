from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('principal', 'Principal'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.role}"


class ConductCertificate(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    TEMPLATE_CHOICES = [
        ('template1', 'Template 1'),
        ('template2', 'Template 2'),
        ('template3', 'Template 3'),
        ('template4', 'Template 4'),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    academic_year_from = models.IntegerField()
    academic_year_to = models.IntegerField()
    degree = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)
    signature = models.ImageField(upload_to='signatures/')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    principal_signature = models.ImageField(upload_to='principal_signatures/', blank=True, null=True)
    template_choice = models.CharField(max_length=20, choices=TEMPLATE_CHOICES, default='template1')  # 🔥 Added

    def __str__(self):
        return f"{self.name} - {self.status}"
    


class ConductRequest(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    reason = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Approved", "Approved"),
        ("Rejected", "Rejected"),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Pending")
