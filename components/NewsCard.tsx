import React from 'react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <a 
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 h-full flex flex-col hover:shadow-xl"
    >
      <img className="w-full h-32 object-cover" src={article.imageUrl} alt={article.title} />
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-brand-green-700 bg-brand-green-100 px-2 py-1 rounded-full self-start">
          {article.category}
        </span>
        <h3 className="text-md font-bold my-2 text-gray-800">{article.title}</h3>
        <p className="text-sm text-gray-600 flex-grow">{article.summary}</p>
        <p className="text-xs text-gray-400 mt-3">{article.source}</p>
      </div>
    </a>
  );
};

export default NewsCard;