
import React from 'react';
import { WeatherData } from '../types';
import { SunIcon } from './icons/SunIcon';
import { CloudIcon } from './icons/CloudIcon';
import { RainIcon } from './icons/RainIcon';
import { StormIcon } from './icons/StormIcon';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherIcon: React.FC<{ condition: WeatherData['condition'], className?: string }> = ({ condition, className = "w-6 h-6" }) => {
  switch (condition) {
    case 'Sunny':
      return <SunIcon className={`${className} text-yellow-500`} />;
    case 'Cloudy':
      return <CloudIcon className={`${className} text-gray-500`} />;
    case 'Rainy':
      return <RainIcon className={`${className} text-blue-500`} />;
    case 'Stormy':
        return <StormIcon className={`${className} text-purple-600`} />;
    default:
      return null;
  }
};

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-md text-gray-800">{weather.region}</h3>
        <div className="flex items-center">
            <span className="font-bold text-xl mr-2">{weather.temperature}°C</span>
            <WeatherIcon condition={weather.condition} className="w-8 h-8"/>
        </div>
      </div>
      <div className="flex justify-between text-center mt-4 pt-4 border-t border-gray-100">
        {weather.forecast.slice(0, 5).map(day => (
            <div key={day.day} className="flex flex-col items-center text-xs text-gray-600">
                <span>{day.day}</span>
                <WeatherIcon condition={day.condition} className="w-6 h-6 my-1" />
                <span>{day.temp}°</span>
            </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
