import React from 'react';
import SearchBar from '../components/SearchBar';
import DestinationCard from '../components/DestinationCard';

const Destinations: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Explore Destinations</h1>
      
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Destination cards will be dynamically rendered here */}
      </div>
    </div>
  );
};

export default Destinations;