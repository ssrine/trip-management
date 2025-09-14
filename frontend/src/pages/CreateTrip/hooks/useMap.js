import { useEffect, useRef } from "react";
import L from "leaflet";
import { getCoordinates } from "../utils/geocoding";

export const useMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView([39.8283, -98.5795], 4);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
      }
    };

    initializeMap();
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const updateMap = async (formData) => {
    if (!formData.current_location && !formData.pickup_location && !formData.dropoff_location) return;

    try {
      const currentCoords = formData.current_location ? await getCoordinates(formData.current_location) : null;
      const pickupCoords = formData.pickup_location ? await getCoordinates(formData.pickup_location) : null;
      const dropoffCoords = formData.dropoff_location ? await getCoordinates(formData.dropoff_location) : null;

      if (mapRef.current) {
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            mapRef.current.removeLayer(layer);
          }
        });
      }

      const markers = [];
      const locations = [];

      if (currentCoords) {
        const marker = L.marker(currentCoords).addTo(mapRef.current).bindPopup("Current Location");
        markers.push(marker);
        locations.push(currentCoords);
      }

      if (pickupCoords) {
        const marker = L.marker(pickupCoords).addTo(mapRef.current).bindPopup("Pickup Location");
        markers.push(marker);
        locations.push(pickupCoords);
      }

      if (dropoffCoords) {
        const marker = L.marker(dropoffCoords).addTo(mapRef.current).bindPopup("Dropoff Location");
        markers.push(marker);
        locations.push(dropoffCoords);
      }

      if (locations.length > 1) {
        L.polyline(locations, { color: "blue", weight: 4, opacity: 0.7 }).addTo(mapRef.current);
      }

      if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        mapRef.current.fitBounds(group.getBounds().pad(0.5));
      }
    } catch (error) {
      console.error("Map update error:", error);
    }
  };

  return { mapRef, updateMap };
};