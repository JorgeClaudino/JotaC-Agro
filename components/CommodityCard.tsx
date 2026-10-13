
import React from 'react';
import { Commodity } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { ArrowDownIcon } from './icons/ArrowDownIcon';

interface CommodityCardProps {
  commodity: Commodity;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
        <p className="text-sm font-bold">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const CommodityCard: React.FC<CommodityCardProps> = ({ commodity }) => {
  const isPositive = commodity.change >= 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{commodity.name}</h3>
          <p className="text-2xl font-bold text-gray-900">${commodity.price.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{commodity.unit}</p>
        </div>
        <div className={`flex items-center px-2 py-1 rounded-md text-sm font-semibold ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isPositive ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
          {commodity.change.toFixed(2)}
        </div>
      </div>
      <div className="h-24 mt-4 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={commodity.history} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#9ca3af" axisLine={false} tickLine={false} />
            <YAxis hide={true} domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke={isPositive ? '#16a34a' : '#dc2626'} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CommodityCard;
