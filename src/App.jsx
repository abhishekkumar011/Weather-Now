import { MapPin } from "lucide-react";
import WeatherCard from "./components/WeatherCard";
import { useState } from "react";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

function App() {
  const [city, setCity] = useState("");
  const [place, setPlace] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);
    setPlace(null);

    try {
      const geoRes = await fetch(
        `${GEOCODING_URL}?name=${encodeURIComponent(
          city
        )}&count=5&language=en&format=json`
      );

      if (!geoRes.ok) {
        throw new Error("Response Failed");
      }

      const data = await geoRes.json();

      if (!data.results || data.results.length === 0) {
        setError("No Place Find...");
        setLoading(false);
        return;
      }

      const choseData = data.results[0];

      setPlace({
        name: choseData.name,
        country: choseData.country,
        latitude: choseData.latitude,
        longitude: choseData.longitude,
        timezone: choseData.timezone,
      });

      //fetch current Weather
      const lat = choseData.latitude;
      const lon = choseData.longitude;

      const weatherRes = await fetch(
        `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
      );

      if (!weatherRes.ok) {
        throw new Error("Failed to fetch Weather data");
      }

      const weatherData = await weatherRes.json();

      if (!weatherData.current_weather) {
        setError("Weather Data is not available for this reaseon.");
        setLoading(false);
        return;
      }

      setWeather(weatherData.current_weather);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch the data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-10 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Weather Now
        </h1>
        <p className="text-slate-300 text-lg">
          Quickly check current weather anywhere.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="max-w-4xl mx-auto text-white px-4 lg:px-0"
      >
        <div className="flex flex-col md:flex-row gap-5">
          <div className="bg-gradient-to-br from-white/10 to-white/5 flex flex-1 items-center gap-2 border-2 rounded-lg border-white/20 px-4 py-2">
            <MapPin size={20} className="text-white/70" />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for city"
              className="outline-0 w-full"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="text-lg font-medium rounded-lg cursor-pointer px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-center text-red-500 text-xl">{error}</p>
        )}
      </form>

      <div className="px-4">
        {place && weather ? (
          <WeatherCard
            place={{ ...place }}
            weather={weather}
            timezone={place.timezone}
            localTime={new Date().toLocaleString("en-US", {
              timeZone: place.timezone,
            })}
          />
        ) : (
          <div className="text-center text-xl mt-12 text-white/70">
            Search for a city to see current weather.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
