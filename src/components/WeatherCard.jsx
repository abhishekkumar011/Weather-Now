import { Globe, MapPin, Navigation, Wind } from "lucide-react";

const WEATHER_CODE = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  80: "Rain showers",
  95: "Thunderstorm",
};

function WeatherCard({ place, weather, timezone, localTime }) {
  if (!weather) return null;

  const { temperature, windspeed, weathercode, winddirection } = weather;

  const codeText = WEATHER_CODE[weathercode];

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 border-2 rounded-lg border-white/20 max-w-4xl mx-auto text-white p-5">
      {/* top */}
      <div className="flex md:justify-between flex-col md:flex-row gap-10 md:gap-0">
        {/* Left  */}
        <div className="space-y-2">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold">{place.name}</h1>
            <h4 className="text-white/90 text-lg">
              {place.country} — {timezone}
            </h4>
          </div>
          <p className="text-white/70">Local time: {localTime}</p>
        </div>

        {/* Right  */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-right">
            {Math.round(temperature)}°C
          </h1>
          <div className="text-lg text-slate-300 text-right">{codeText}</div>
        </div>
      </div>

      <hr className="border-white/20 border-1 my-10" />

      {/* bottom  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <Wind className="text-cyan-400" size={24} />
            <div className="font-medium text-white">{windspeed}</div>
          </div>
          <div className="text-2xl font-bold text-white">12.5 m/s</div>
          <div className="text-sm text-slate-400 flex items-center gap-1 mt-1">
            <Navigation className="text-slate-400" size={14} />
            Direction: {Math.round(winddirection)}°
          </div>
        </div>

        <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="text-purple-400" size={24} />
            <div className="font-medium text-white">Coordinates</div>
          </div>
          <div className="text-lg font-bold text-white">
            {place.latitude.toFixed(3)}
          </div>
          <div className="text-lg font-bold text-white">
            {place.longitude.toFixed(3)}
          </div>
        </div>

        <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="text-green-400" size={24} />
            <div className="font-medium text-white">Location</div>
          </div>
          <div className="text-lg font-bold text-white">{place.name}</div>
          <div className="text-sm text-slate-400">{place.country}</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
