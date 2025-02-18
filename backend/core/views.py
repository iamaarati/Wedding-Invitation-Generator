from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Wedding
from .serializers import WeddingSerializer
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
import uuid


# Create your views here.
class WeddingCreateView(generics.CreateAPIView):
    queryset = Wedding.objects.all()
    serializer_class = WeddingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WeddingDetailView(APIView):
    def post(self, request, *args, **kwargs):
        wedding_id = request.data.get('unique_number')
        if not wedding_id:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            wedding_id = wedding_id.strip('"').strip()
            wedding_id = uuid.UUID(wedding_id)
        except ValueError:
            return Response({"error": "Invalid ID format. ID should be a valid UUID."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            wedding = Wedding.objects.get(unique_number=wedding_id)
        except Wedding.DoesNotExist:
            return Response({"error": "Wedding with this ID does not exist."}, status=status.HTTP_404_NOT_FOUND)
        serializer = WeddingSerializer(wedding)
        return Response(serializer.data, status=status.HTTP_200_OK)

