# app/models.py

from django.db import models
from django.contrib.auth.models import User


class CV(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255, blank=True, default="")
    email = models.EmailField(blank=True, default="")
    phone = models.CharField(max_length=50, blank=True, default="")
    location = models.CharField(max_length=255, blank=True, default="")
    summary = models.TextField(blank=True, default="")


class Education(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name="education")
    degree = models.CharField(max_length=255, blank=True, default="")
    institution = models.CharField(max_length=255, blank=True, default="")
    start_year = models.CharField(max_length=50, blank=True, default="")
    end_year = models.CharField(max_length=50, blank=True, default="")


class Experience(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name="experience")
    title = models.CharField(max_length=255, blank=True, default="")
    company = models.CharField(max_length=255, blank=True, default="")
    start_year = models.CharField(max_length=50, blank=True, default="")
    end_year = models.CharField(max_length=50, blank=True, default="")
    description = models.TextField(blank=True, default="")


class Skill(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name="skills")
    name = models.CharField(max_length=255, blank=True, default="")
