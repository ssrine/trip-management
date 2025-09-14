# Trip Management App

This is a fullstack truck management application for managing trips, trucks, drivers, logsheets, and entries. The backend is built with **Django**, and the frontend is built with **React** using **Tailwind CSS**.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Setup & Installation](#setup--installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Database](#database)
- [API Endpoints](#api-endpoints)
- [PDF Export](#pdf-export)
- [License](#license)

---

## Project Overview

This app allows a trucking company to:

- Track trips including pickup, dropoff, and current locations
- Manage carrier and vehicle info
- Create logsheets per trip with driving, on duty, off duty, and sleeper hours
- Track entries within logsheets with status, location, and notes
- Export trip details as PDF

---

## Features

- ✅ Trips CRUD (Create, Read, Update, Delete)
- ✅ Logsheets CRUD per trip
- ✅ Entries CRUD per logsheet
- ✅ PDF export for a trip
- ✅ Responsive React frontend with tables and grids
- ✅ REST API for frontend-backend communication

---

## Technologies

- **Backend:** Django, Django REST Framework, SQLite
- **Frontend:** React, Tailwind CSS, React Icons
- **PDF:** ReportLab (for generating PDF in backend)
- **Version Control:** Git & GitHub

---

## Setup & Installation

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Mac/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser (optional for admin):
   ```bash
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```bash
   python manage.py runserver
   ```

**Backend will run at:** `http://127.0.0.1:8000/`

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

**Frontend will run at:** `http://localhost:5173/`

The frontend will automatically fetch data from the backend API.

---

## Usage

1. Open the frontend in your browser at `http://localhost:5173/`
2. Browse trips, logsheets, and entries
3. Download trip PDF using the download button
4. Add, edit, or delete logsheets and entries through the frontend forms

---

## Database

The backend database (`db.sqlite3`) contains the following models:

### Trip
- `id`: Trip ID
- `current_location`: Current trip location
- `pickup_location`: Pickup location
- `dropoff_location`: Dropoff location
- `current_cycle_used`: Cycle used in hours
- `carrier_name`: Carrier company name
- `tractor_number`: Truck tractor number
- `trailer_number`: Trailer number
- `license_plate`: Truck license plate

### LogSheet
- `id`: LogSheet ID
- `trip`: Linked Trip (Foreign Key)
- `date`: Date of the logsheet
- `driving_hours`: Hours spent driving
- `on_duty_hours`: Hours on duty
- `off_duty_hours`: Hours off duty
- `sleeper_hours`: Hours in sleeper berth
- `hours_left_in_cycle`: Remaining hours in cycle
- `remarks`: Additional remarks
- `bol_number`: Bill of Lading number
- `shipper`: Shipper information
- `commodity`: Commodity details

### Entry
- `id`: Entry ID
- `logsheet`: Linked LogSheet (Foreign Key)
- `status`: Status (Driving / On Duty / Off Duty / Sleeper Berth)
- `start_time`: Entry start time
- `end_time`: Entry end time
- `location`: Location during entry
- `note`: Additional notes

---

## API Endpoints

### Trips
- `GET /trips/` → List all trips
- `GET /trips/:id/` → Get trip details including logsheets
- `POST /trips/` → Create a new trip
- `PUT /trips/:id/` → Update a trip
- `DELETE /trips/:id/` → Delete a trip

### Logsheets
- `GET /logsheets/` → List all logsheets
- `GET /logsheets/:id/` → Get logsheet details
- `POST /logsheets/` → Create a new logsheet
- `PUT /logsheets/:id/` → Update a logsheet
- `DELETE /logsheets/:id/` → Delete a logsheet

### Entries
- `GET /entries/` → List all entries
- `GET /entries/:id/` → Get entry details
- `POST /entries/` → Create a new entry
- `PUT /entries/:id/` → Update an entry
- `DELETE /entries/:id/` → Delete an entry

---

## PDF Export

- **Endpoint:** `GET /trips/:id/pdf/`
- Generates a comprehensive PDF with all trip information and logsheets including entries
- Downloadable directly from the frontend via the "Download PDF" button
- Includes all trip details, logsheets, and associated entries

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is for personal/learning purposes. You can fork and modify it as needed.

---

## Author

**Created with ❤️ by Nisrine El Harkani**

---

## Support

If you have any questions or need help with setup, please open an issue in the GitHub repository.