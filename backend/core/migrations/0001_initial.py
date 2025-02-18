# Generated by Django 5.1.6 on 2025-02-13 19:00

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Wedding',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bride_name', models.CharField(max_length=255)),
                ('groom_name', models.CharField(max_length=255)),
                ('wedding_date', models.DateField()),
                ('wedding_time', models.TimeField()),
                ('venue', models.CharField(max_length=500)),
                ('unique_number', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
            ],
        ),
    ]
