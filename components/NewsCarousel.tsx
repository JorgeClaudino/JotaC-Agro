import React, { useState, useEffect, useCallback } from 'react';
import { NewsArticle } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface NewsCarouselProps {
  news: NewsArticle[];
}

const NewsCarousel: React.FC<NewsCarouselProps> = ({ news }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? news.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, news.length]);

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === news.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, news.length]);
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (news.length > 0) {
      const slideInterval = setInterval(nextSlide, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [nextSlide, news.length]);

  if (!news || news.length === 0) {
    return null;
  }

  const currentSlide = news[currentIndex];

  return (
    <div className="h-64 md:h-80 lg:h-96 w-full m-auto relative group rounded-lg shadow-lg overflow-hidden">
       <a 
        href={currentSlide.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full block"
      >
        <div
          style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
          className="w-full h-full bg-center bg-cover duration-500"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
            <span className="text-xs font-semibold text-white bg-brand-green-700/80 px-3 py-1 rounded-full self-start">
              {currentSlide.category}
            </span>
            <h2 className="text-xl md:text-3xl font-bold mt-2">{currentSlide.title}</h2>
            <p className="text-sm text-gray-300 mt-1">{currentSlide.source}</p>
        </div>
      </a>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40">
        <ChevronLeftIcon onClick={prevSlide} className="w-6 h-6" />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40">
        <ChevronRightIcon onClick={nextSlide} className="w-6 h-6" />
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {news.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer h-2 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NewsCarousel;