export const getCoordinates = async (location) => {
  if (!location) return null;
  
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );
    const data = await res.json();
    if (data.length > 0) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};