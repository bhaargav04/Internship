
from django.contrib import admin
from django.urls import path
from. import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
     path('admin/', admin.site.urls),
    path('HRA', views.calculate_hra_exemption),
    path('ALLOWANCE', views.allowance),
    path('', views.home, name='home'),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('employee_dashboard/', views.employee_dashboard, name='employee_dashboard'),
    path('hr_dashboard/', views.hr_dashboard, name='hr_dashboard'), 
    path('manager_dashboard/', views.manager_dashboard, name='manager_dashboard'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
