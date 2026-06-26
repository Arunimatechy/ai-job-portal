from django.urls import path

from .views import (
    GenerateOfferLetterView,
    OfferLetterDetailView
)

urlpatterns = [

    path(
        "generate/<int:application_id>/",
        GenerateOfferLetterView.as_view()
    ),

    path(
        "detail/<int:application_id>/",
        OfferLetterDetailView.as_view()
    ),

]