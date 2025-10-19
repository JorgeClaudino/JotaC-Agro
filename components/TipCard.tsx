
import React from 'react';
import { AgroTip } from '../types';
import { LightBulbIcon } from './icons/LightBulbIcon';

interface TipCardProps {
  tip: AgroTip;
}

const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl flex items-start space-x-4">
      <div className="flex-shrink-0">
        <LightBulbIcon className="w-8 h-8 text-yellow-400" />
      </div>
      <div>
        <h4 className="font-bold text-md text-gray-800">{tip.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{tip.content}</p>
      </div>
    </div>
  );
};

export default TipCard;
