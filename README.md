# 🌤️ Weather Now

A simple weather application built with **React, Vite, Tailwind CSS, and Open-Meteo API**.  
It allows users to search for any city and get the **current weather, temperature, wind details, and local time**.

#### Live Link - https://weather-now-psi-olive.vercel.app/
---

## 🚀 Features
- Search weather by city name
- Shows:
  - Current temperature (°C)
  - Weather condition (mapped from Open-Meteo `weathercode`)
  - Wind speed and direction
  - Local time of the city
- Responsive design (works on desktop and mobile)
- Error handling (shows message if city not found)

---

## 🛠️ Tech Stack
- **React** (Frontend framework)
- **Tailwind CSS** (Styling)
- **Open-Meteo API** (Weather & Geocoding data)

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/abhishekkumar011/Weather-Now.git
cd weather-now

```

Install dependencies:
```bash
npm install

```

Run the development server:
```bash
npm run dev
```

## 📖 Example API Endpoints

- Geocoding (city → lat/lon): https://geocoding-api.open-meteo.com/v1/search?name=Berlin

- Forecast (lat/lon → weather):https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true
