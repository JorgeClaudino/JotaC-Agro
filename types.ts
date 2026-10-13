export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  source: string;
  category: string;
  imageUrl: string;
  url: string;
}

export interface Commodity {
  id: string;
  name: string;
  price: number;
  change: number;
  unit: string;
  history: { name: string; value: number }[];
}

export interface WeatherData {
  id: string;
  region: string;
  temperature: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy';
  humidity: number;
  windSpeed: number;
  forecast: {
    day: string;
    temp: number;
    condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy';
  }[];
}

export interface AgroTip {
  id: number;
  title: string;
  content: string;
  crop: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}