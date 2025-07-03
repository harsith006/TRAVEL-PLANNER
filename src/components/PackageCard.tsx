import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users } from 'lucide-react';

interface PackageCardProps {
  tourPackage: {
    _id: string;
    name: string;
    destination: {
      name: string;
      country: string;
    };
    image: string;
    duration: number;
    price: number;
    rating: number;
    inclusions: string[];
  };
}

const PackageCard: React.FC<PackageCardProps> = ({ tourPackage }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/packages/${tourPackage._id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={tourPackage.image}
            alt={tourPackage.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 m-2">
            <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded font-medium">
              Popular
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-1">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm font-medium">{tourPackage.rating.toFixed(1)}</span>
            <span className="mx-1 text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-600">
              {tourPackage.destination.name}, {tourPackage.destination.country}
            </span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">{tourPackage.name}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="flex items-center text-xs text-gray-600">
              <Calendar className="h-3 w-3 mr-1" />
              <span>All year</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Clock className="h-3 w-3 mr-1" />
              <span>{tourPackage.duration} days</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Users className="h-3 w-3 mr-1" />
              <span>2+ people</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {tourPackage.inclusions.slice(0, 3).map((inclusion, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                {inclusion}
              </span>
            ))}
            {tourPackage.inclusions.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                +{tourPackage.inclusions.length - 3} more
              </span>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-xl font-bold text-primary-600">${tourPackage.price}</span>
              <span className="text-xs text-gray-500 ml-1">/ person</span>
            </div>
            <button className="text-sm font-medium text-white bg-primary-500 px-3 py-1 rounded hover:bg-primary-600">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PackageCard;