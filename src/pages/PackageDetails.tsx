import React from 'react';
import { useParams } from 'react-router-dom';

const PackageDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Package Details</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Package details will be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;