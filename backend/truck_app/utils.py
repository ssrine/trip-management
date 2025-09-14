# truck_app/utils.py
from datetime import datetime, timedelta
from .models import LogSheet, LogEntry

def generate_logs(trip):
    # assume a fixed distance/time for now (later map API)
    total_driving_hours = 10  # example
    pickup_hours = 1
    dropoff_hours = 1
    max_driving_per_day = 11
    max_on_duty_per_day = 14

    logsheets = []
    hours_left_in_cycle = 70 - trip.current_cycle_used

    # For simplicity, create 1 day log
    date = datetime.today().date()
    logsheet = LogSheet.objects.create(
        trip=trip,
        date=date,
        driving_hours=total_driving_hours,
        on_duty_hours=pickup_hours + dropoff_hours,
        off_duty_hours=24 - (total_driving_hours + pickup_hours + dropoff_hours),
        sleeper_hours=0,
        hours_left_in_cycle=hours_left_in_cycle - total_driving_hours
    )

    # Entries
    start = datetime.strptime("00:00", "%H:%M")
    entries = [
        {"status": "Off Duty", "start_time": "00:00", "end_time": "06:00"},
        {"status": "Driving", "start_time": "06:00", "end_time": "16:00"},
        {"status": "On Duty", "start_time": "16:00", "end_time": "18:00", "note": "pickup & dropoff"},
        {"status": "Off Duty", "start_time": "18:00", "end_time": "24:00"},
    ]

    for e in entries:
        LogEntry.objects.create(
            logsheet=logsheet,
            status=e["status"],
            start_time=e["start_time"],
            end_time=e["end_time"],
            note=e.get("note", "")
        )

    return logsheet
