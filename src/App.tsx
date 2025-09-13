import React, { useState } from 'react';
import { Cloud, Home, Thermometer, Droplets, Wind, CloudRain, MapPin, Search } from 'lucide-react';

interface WeatherData {
  temperature: string;
  humidity: string;
  windSpeed: string;
  rainfall: string;
  location: string;
}

function App() {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData] = useState<WeatherData>({
    temperature: "-- °C",
    humidity: "-- %",
    windSpeed: "-- km/h",
    rainfall: "-- mm",
    location: "Enter your location"
  });

  const handleGetWeatherData = async () => {
  if (!location.trim()) {
    alert('Please enter a location');
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch('http://127.0.0.1:5000/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city: location }),
    });

    const data = await response.json();

    if (response.ok) {
      setWeatherData({
        temperature: data.temperature + " °C",
        humidity: "-- %",     // Modify if OpenWeather API gives humidity
        windSpeed: "-- km/h", // Same here
        rainfall: "-- mm",    // And here
        location: data.city,
      });
    } else {
      alert(data.error || 'Failed to get weather data');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Failed to fetch weather data');
  } finally {
    setIsLoading(false);
  }
};

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGetWeatherData();
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background Dots */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-emerald-400 rounded-full opacity-80 animate-ping"></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-emerald-400 rounded-full opacity-70 animate-ping"></div>
        <div className="absolute bottom-60 left-1/4 w-1 h-1 bg-emerald-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-50 animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-emerald-500 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-1/2 left-10 w-1 h-1 bg-emerald-400 rounded-full opacity-80 animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/2 w-2 h-2 bg-emerald-400 rounded-full opacity-50 animate-ping"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex justify-between items-center p-6 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <Cloud className="w-8 h-8 text-emerald-500 drop-shadow-lg" />
          <h1 className="text-2xl font-bold text-white">Weather Station</h1>
        </div>
        <a 
          href="https://agri-ai-4farmer.vercel.app/" 
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Home</span>
        </a>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 text-center py-16 px-6">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Cloud className="w-24 h-24 text-emerald-500 drop-shadow-2xl animate-pulse" />
            <div className="absolute inset-0 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-emerald-400 mb-4 drop-shadow-lg">
          Real-Time Weather Station
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Monitor live weather conditions with precision and real-time data updates
        </p>
        
        {/* Location Display */}
        <div className="flex items-center justify-center mt-8 mb-6">
          <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span className="text-gray-300 font-medium">{weatherData.location}</span>
          </div>
        </div>
      </div>

      {/* Location Input Section */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 mb-12">
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50">
          <h3 className="text-emerald-400 font-semibold text-xl mb-4 text-center">Enter Your Location</h3>
          <form onSubmit={handleLocationSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city name (e.g., New York, London, Tokyo)"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                disabled={isLoading}
              />
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Getting Weather Data...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Get Weather Data</span>
                </>
              )}
            </button>
          </form>
          <p className="text-gray-400 text-sm text-center mt-3">
            Enter any city name to get real-time weather information
          </p>
        </div>
      </div>

      {/* Weather Data Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Temperature Card */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Thermometer className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{weatherData.temperature}</p>
              </div>
            </div>
            <h3 className="text-emerald-400 font-semibold text-lg mb-2">Temperature</h3>
            <p className="text-gray-400 text-sm">Current ambient temperature</p>
          </div>

          {/* Humidity Card */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Droplets className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{weatherData.humidity}</p>
              </div>
            </div>
            <h3 className="text-emerald-400 font-semibold text-lg mb-2">Humidity</h3>
            <p className="text-gray-400 text-sm">Relative humidity level</p>
          </div>

          {/* Wind Speed Card */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Wind className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{weatherData.windSpeed}</p>
              </div>
            </div>
            <h3 className="text-emerald-400 font-semibold text-lg mb-2">Wind Speed</h3>
            <p className="text-gray-400 text-sm">Current wind velocity</p>
          </div>

          {/* Rainfall Card */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <CloudRain className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{weatherData.rainfall}</p>
              </div>
            </div>
            <h3 className="text-emerald-400 font-semibold text-lg mb-2">Rainfall</h3>
            <p className="text-gray-400 text-sm">Precipitation amount</p>
          </div>
        </div>

        {/* API Integration Info */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/30">
            <Cloud className="w-5 h-5 text-emerald-400" />
            <span className="text-gray-300 text-sm">Ready for OpenWeatherMap API integration</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-8 border-t border-gray-700/50">
        <p className="text-gray-500">
          Professional Weather Monitoring Dashboard
        </p>
      </div>
    </div>
  );
}

export default App;

