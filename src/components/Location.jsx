import React, { useState } from "react";

function Location() {
  const [location, setLocation] = useState({});
  const [error, setError] = useState("");
  const openChangeApi = import.meta.env.VITE_CLIENT_OPENCHANGE_API_KEY

  const getLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log(latitude, longitude);

        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openChangeApi}`
          );
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const components = data.results[0].components;
            console.log(components)
            setLocation({
              country: components.country,
              state: components.state || components.region || "Unknown state",
              city:
                components.city ||
                components.town ||
                components.village ||
                "Unknown city",
            });
            setError("");
          } else {
            setError("No location data found");
          }
        } catch (err) {
          setError("Failed to fetch location details");
        }
      },
      (error) => {
        setError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  } else {
    setError("Geolocation is not supported by your browser");
  }
};


  return (
    <div className="p-4">
      <button
        onClick={getLocation}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Get My Country & State
      </button>

      {location.country && (
        <p>
          📍 Country: {location.country}, State: {location.state}, City:{" "}
          {location.city}
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Location;
