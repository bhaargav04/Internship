from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.data_list, name='data_list'),
    # path('create/', views.data_create, name='data_create'),
    # path('update/<int:pk>/', views.data_update, name='data_update'),
    # path('delete/<int:pk>/', views.data_delete, name='data_delete'),
]