import uuid
from django.db import models

class Wedding(models.Model):
    bride_name = models.CharField(max_length=255)
    groom_name = models.CharField(max_length=255)
    wedding_date = models.DateField()
    wedding_time = models.TimeField()
    venue = models.CharField(max_length=500)
    unique_number = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return f"{self.bride_name} & {self.groom_name} - {self.wedding_date}"
