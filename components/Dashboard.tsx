import React from 'react';
import { useMockData } from '../hooks/useMockData';
import { NewsArticle, Commodity, WeatherData, AgroTip } from '../types';
import NewsCard from './NewsCard';
import CommodityCard from './CommodityCard';
import WeatherCard from './WeatherCard';
import TipCard from './TipCard';
import { LoadingSpinner } from './icons/LoadingSpinner';
import NewsCarousel from './NewsCarousel';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold text-brand-green-900 mb-4 pb-2 border-b-2 border-brand-green-200">{children}</h2>
);

const Dashboard: React.FC = () => {
  const { news, commodities, weather, tips, loading } = useMockData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner className="w-12 h-12 text-brand-green-700" />
      </div>
    );
  }
  
  const featuredNews = news.slice(0, 5);

  return (
    <div className="container mx-auto space-y-8">
      
      <section id="featured-news" className="mb-8">
        <NewsCarousel news={featuredNews} />
      </section>

      <section id="news">
        <SectionTitle>Últimas Notícias</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((article: NewsArticle) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section id="commodities" className="lg:col-span-2">
          <SectionTitle>Preços das Commodities</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {commodities.map((commodity: Commodity) => (
              <CommodityCard key={commodity.id} commodity={commodity} />
            ))}
          </div>
        </section>

        <div className="space-y-8">
          <section id="weather">
            <SectionTitle>Previsão do Tempo</SectionTitle>
            <div className="space-y-4">
              {weather.map((weatherData: WeatherData) => (
                <WeatherCard key={weatherData.id} weather={weatherData} />
              ))}
            </div>
          </section>

          <section id="tips">
            <SectionTitle>Dicas Agronômicas</SectionTitle>
             <div className="space-y-4">
              {tips.map((tip: AgroTip) => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;