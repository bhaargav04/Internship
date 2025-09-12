from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('student_dashboard/', views.student_dashboard, name='student_dashboard'),
    path('principal_dashboard/', views.principal_dashboard, name='principal_dashboard'),
    path('hr_dashboard/', views.hr_dashboard, name='hr_dashboard'),
    path('landlord_dashboard/', views.landlord_dashboard, name='landlord_dashboard'),

    # Approve/Reject with certificate type
    path('approve-certificate/<int:cert_id>/<str:cert_type>/', views.approve_certificate, name='approve_certificate'),
    path('reject-certificate/<int:cert_id>/<str:cert_type>/', views.reject_certificate, name='reject_certificate'),

    path('conduct_request/', views.submit_conduct_certificate, name='conduct_request'),
    path('certificate/preview/<str:cert_type>/<int:cert_id>/', views.certificate_preview, name='certificate_preview'),
    path('certificate/edit/<str:cert_type>/<int:cert_id>/', views.certificate_edit, name='certificate_edit'),
]
