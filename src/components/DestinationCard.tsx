import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';

interface DestinationCardProps {
  destination: {
    _id: string;
    name: string;
    country: string;
    image: string;
    rating: number;
    priceRange: string;
    description: string;
  };
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/destinations/${destination._id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-lg font-semibold text-white">{destination.name}</h3>
            <div className="flex items-center mt-1">
              <MapPin className="h-4 w-4 text-primary-400" />
              <span className="ml-1 text-sm text-white">{destination.country}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
                {destination.priceRange}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-sm font-medium">{destination.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{destination.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Best time to visit: Apr-Oct</span>
            </div>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-800">
              Explore
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DestinationCard;