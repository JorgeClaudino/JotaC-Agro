import React from 'react';
import { LeafIcon } from './icons/LeafIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <LeafIcon className="h-10 w-10 text-brand-green-700" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-green-800">
              JC Agro
            </h1>
            <p className="text-sm text-gray-500 hidden sm:block">
              Seu Hub de Inteligência do Agronegócio com IA
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;