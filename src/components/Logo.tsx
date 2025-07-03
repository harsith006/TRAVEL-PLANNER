import React from 'react';
import { Map } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-8 w-auto' }) => {
  return (
    <div className="flex items-center">
      <Map className={`text-primary-500 ${className}`} />
      <span className="ml-2 text-lg font-bold text-gray-800">
        pick<span className="text-primary-500">your</span>trail
      </span>
    </div>
  );
};

export default Logo;