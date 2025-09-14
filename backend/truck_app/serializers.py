from rest_framework import serializers
from .models import Trip, LogSheet, Entry

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = '__all__'


class LogSheetSerializer(serializers.ModelSerializer):
    entries = EntrySerializer(many=True, read_only=True)

    class Meta:
        model = LogSheet
        fields = '__all__'


class TripSerializer(serializers.ModelSerializer):
    logsheets = LogSheetSerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = '__all__'
