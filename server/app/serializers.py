from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CV, Education, Experience, Skill


# ======================================================
# REGISTER
# ======================================================

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


# ======================================================
# CV
# ======================================================

class CVSerializer(serializers.ModelSerializer):
    class Meta:
        model = CV
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "location",
            "summary",
        ]


# ======================================================
# EDUCATION
# ======================================================

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            "id",
            "institution",
            "degree",
            "start_year",
            "end_year",
        ]


# ======================================================
# EXPERIENCE
# ======================================================

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id",
            "title",
            "company",
            "start_year",
            "end_year",
            "description",
        ]


# ======================================================
# SKILL
# ======================================================

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = [
            "id",
            "name",
        ]
