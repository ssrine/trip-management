from django.db import models
from datetime import datetime, timedelta

# Trip Model
class Trip(models.Model):
    current_location = models.CharField(max_length=100)
    pickup_location = models.CharField(max_length=100)
    dropoff_location = models.CharField(max_length=100)
    current_cycle_used = models.FloatField(default=0)  
    created_at = models.DateTimeField(auto_now_add=True)

    # Carrier info
    carrier_name = models.CharField(max_length=255, default="Unknown Carrier")
    main_office_address = models.CharField(max_length=200, default="")
    home_terminal_address = models.CharField(max_length=200, default="")

    # Truck info
    tractor_number = models.CharField(max_length=50, default="")
    trailer_number = models.CharField(max_length=50, default="")
    license_plate = models.CharField(max_length=50, default="")

    def __str__(self):
        return f"Trip {self.id} ({self.current_location} → {self.dropoff_location})"


class LogSheet(models.Model):
    trip = models.ForeignKey(Trip, related_name='logsheets', on_delete=models.CASCADE)
    date = models.DateField()

    driving_hours = models.FloatField(default=0)
    on_duty_hours = models.FloatField(default=0)
    off_duty_hours = models.FloatField(default=0)
    sleeper_hours = models.FloatField(default=0)
    hours_left_in_cycle = models.FloatField(default=0)

    remarks = models.TextField(blank=True, null=True)
    bol_number = models.CharField(max_length=100, blank=True, null=True)
    shipper = models.CharField(max_length=100, blank=True, null=True)
    commodity = models.CharField(max_length=100, blank=True, null=True)

    def update_hours(self):
        self.driving_hours = 0
        self.on_duty_hours = 0
        self.off_duty_hours = 0
        self.sleeper_hours = 0

        for entry in self.entries.all():
            start = entry.start_time  
            end = entry.end_time      
            duration = (end - start).total_seconds() / 3600

            if entry.status == "Driving":
                self.driving_hours += duration
            elif entry.status == "On Duty":
                self.on_duty_hours += duration
            elif entry.status == "Off Duty":
                self.off_duty_hours += duration
            elif entry.status == "Sleeper Berth":
                self.sleeper_hours += duration

        self.hours_left_in_cycle = max(0, 70 - (self.driving_hours + self.on_duty_hours))
        self.save(update_fields=[
            'driving_hours',
            'on_duty_hours',
            'off_duty_hours',
            'sleeper_hours',
            'hours_left_in_cycle'
        ])


class Entry(models.Model):
    STATUS_CHOICES = [
        ('Off Duty', 'Off Duty'),
        ('Sleeper Berth', 'Sleeper Berth'),
        ('Driving', 'Driving'),
        ('On Duty', 'On Duty'),
    ]

    logsheet = models.ForeignKey(LogSheet, related_name='entries', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    note = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, default="", blank=True)
    remarks = models.TextField(default="", blank=True)

    def __str__(self):
        return f"{self.status} {self.start_time}-{self.end_time}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.logsheet.update_hours()
