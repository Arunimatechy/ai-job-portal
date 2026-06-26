from django.urls import path
from .views import (
    MyNotificationsView,
    MarkNotificationReadView
)

urlpatterns = [
    path(
        "",
        MyNotificationsView.as_view()
    ),
    path(
        "read/<int:pk>/",
        MarkNotificationReadView.as_view()
    ),
]