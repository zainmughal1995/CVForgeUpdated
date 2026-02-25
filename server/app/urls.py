from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    protected_view,
    CVView,
    RegisterView,
    logout_view,
    EducationViewSet,
    ExperienceViewSet,
    SkillViewSet,
)

router = DefaultRouter()
router.register(r'education', EducationViewSet, basename='education')
router.register(r'experience', ExperienceViewSet, basename='experience')
router.register(r'skills', SkillViewSet, basename='skills')

urlpatterns = [
    path("protected/", protected_view),
    path("cv/", CVView.as_view()),
    path("cv/personal/", CVView.as_view()),
    path("register/", RegisterView.as_view()),
    path("logout/", logout_view),
    path("", include(router.urls)),
]
