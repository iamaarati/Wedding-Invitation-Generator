from django.urls import path
from . import views

urlpatterns = [
    path('wedding_create/', views.WeddingCreateView.as_view(), name='wedding_create'),
    path('wedding_detail/', views.WeddingDetailView.as_view(), name='wedding_detail'),
]