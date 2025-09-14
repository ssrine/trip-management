import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Manager / Viewer Pages
import Dashboard from "./pages/Dashboard";
import TripList from "./pages/TripList";
import TripDetails from "./pages/TripDetails";
import LogsheetDetails from "./pages/LogsheetDetails";
import NotFound from "./pages/NotFound";

// Driver Pages (POST forms)
import CreateTrip from "./pages/CreateTrip/CreateTrip"; // Updated import path
import CreateLogsheet from "./pages/CreateLogsheet";
import CreateEntry from "./pages/CreateEntry";

// Home Page
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home / Welcome page */}
        <Route path="/" element={<Home />} />

        {/* Manager pages */}
        <Route
          path="/manager/*"
          element={
            <Layout role="manager">
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="trips" element={<TripList />} />
                <Route path="trips/:id" element={<TripDetails />} />
                <Route path="logsheets/:id" element={<LogsheetDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          }
        />

        {/* Driver pages */}
        <Route
          path="/driver/*"
          element={
            <Layout role="driver">
              <Routes>
                <Route path="trips/create" element={<CreateTrip />} />
                <Route path="logsheets/create" element={<CreateLogsheet />} />
                <Route path="entries/create" element={<CreateEntry />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;