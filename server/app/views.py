# app/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics, viewsets
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CV, Education, Experience, Skill
from .serializers import (
    RegisterSerializer,
    CVSerializer,
    EducationSerializer,
    ExperienceSerializer,
    SkillSerializer,
)


# ======================================================
# CV VIEW (User-Isolated)
# ======================================================

class CVView(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def _empty_cv_defaults():
        return {
            "full_name": "",
            "email": "",
            "phone": "",
            "location": "",
            "summary": "",
        }

    def get(self, request):
        cv, _ = CV.objects.get_or_create(
            user=request.user,
            defaults=self._empty_cv_defaults(),
        )
        return Response({
            "personal": CVSerializer(cv).data,
            "education": EducationSerializer(cv.education.all(), many=True).data,
            "experience": ExperienceSerializer(cv.experience.all(), many=True).data,
            "skills": SkillSerializer(cv.skills.all(), many=True).data,
        })

    def put(self, request):
        cv, _ = CV.objects.get_or_create(
            user=request.user,
            defaults=self._empty_cv_defaults(),
        )
        serializer = CVSerializer(cv, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


# ======================================================
# PROTECTED TEST ROUTE
# ======================================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({
        "message": "You are authenticated",
        "user": request.user.username
    })


# ======================================================
# REGISTER
# ======================================================

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Automatically create an empty CV for user
        CV.objects.get_or_create(user=user, defaults=CVView._empty_cv_defaults())

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "User created",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })


# ======================================================
# LOGOUT (Blacklist Refresh Token)
# ======================================================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {"error": "Refresh token required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response(
            {"message": "Logged out"},
            status=status.HTTP_205_RESET_CONTENT
        )

    except Exception:
        return Response(
            {"error": "Invalid token"},
            status=status.HTTP_400_BAD_REQUEST
        )

# ======================================================
# EDUCATION
# ======================================================

class EducationViewSet(viewsets.ModelViewSet):
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Education.objects.filter(cv__user=self.request.user)

    def perform_create(self, serializer):
        cv, _ = CV.objects.get_or_create(
            user=self.request.user,
            defaults=CVView._empty_cv_defaults(),
        )
        serializer.save(cv=cv)


# ======================================================
# EXPERIENCE
# ======================================================

class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Experience.objects.filter(cv__user=self.request.user)

    def perform_create(self, serializer):
        cv, _ = CV.objects.get_or_create(
            user=self.request.user,
            defaults=CVView._empty_cv_defaults(),
        )
        serializer.save(cv=cv)


# ======================================================
# SKILLS
# ======================================================

class SkillViewSet(viewsets.ModelViewSet):
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Skill.objects.filter(cv__user=self.request.user)

    def perform_create(self, serializer):
        cv, _ = CV.objects.get_or_create(
            user=self.request.user,
            defaults=CVView._empty_cv_defaults(),
        )
        serializer.save(cv=cv)
