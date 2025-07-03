import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, MapPin, Award, Clock, ShieldCheck } from 'lucide-react';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  // Mock data for popular destinations
  const popularDestinations = [
    {
      id: '1',
      name: 'Bali',
      country: 'Indonesia',
      image: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg',
    },
    {
      id: '2',
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    },
    {
      id: '3',
      name: 'Swiss Alps',
      country: 'Switzerland',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    },
    {
      id: '4',
      name: 'Kyoto',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg',
    },
  ];

  // Mock data for trending packages
  const trendingPackages = [
    {
      id: '1',
      name: 'Romantic Bali Getaway',
      destination: 'Bali, Indonesia',
      price: 899,
      duration: 5,
      image: 'https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg',
    },
    {
      id: '2',
      name: 'Europe Explorer',
      destination: 'Multiple Cities, Europe',
      price: 1499,
      duration: 10,
      image: 'https://images.pexels.com/photos/2260786/pexels-photo-2260786.jpeg',
    },
    {
      id: '3',
      name: 'Tropical Thailand Adventure',
      destination: 'Bangkok & Phuket, Thailand',
      price: 799,
      duration: 7,
      image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg',
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Plan a <span className="text-primary-400">Hassle - free</span> holiday
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover and book unforgettable travel experiences with customized itineraries tailored just for you.
          </p>
          <div className="w-full max-w-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <SearchBar className="shadow-lg" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Customised Trips</h3>
              <p className="text-sm text-gray-600">Personalized itineraries designed just for you based on your preferences.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">95% Visa Success Rate</h3>
              <p className="text-sm text-gray-600">Expert guidance to ensure smooth visa approvals for your journey.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24x7 Concierge</h3>
              <p className="text-sm text-gray-600">Round-the-clock support throughout your trip for peace of mind.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">Fully encrypted booking system to keep your information safe.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Popular Destinations</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most sought-after destinations with breathtaking views and unforgettable experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <Link key={destination.id} to={`/destinations/${destination.id}`} className="group">
                <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                    <p className="text-sm text-gray-200">{destination.country}</p>
                    <span className="inline-block mt-2 text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore Now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/destinations"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </div>

      {/* Trending Packages */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Trending Packages</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular holiday packages crafted to give you the best travel experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingPackages.map((pkg) => (
              <Link key={pkg.id} to={`/packages/${pkg.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-0 right-0 m-3">
                      <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Best Seller
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{pkg.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{pkg.destination}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Clock className="h-4 w-4 mr-1 text-primary-500" />
                      <span>{pkg.duration} days</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <span className="text-xl font-bold text-primary-600">${pkg.price}</span>
                        <span className="text-xs text-gray-500 ml-1">/ person</span>
                      </div>
                      <span className="text-sm font-medium text-primary-600 group-hover:text-primary-800 transition-colors duration-300">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/packages"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
            >
              Explore All Packages
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to start your adventure?
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-primary-100">
                Sign up now and get exclusive access to special offers, personalized recommendations, and travel inspiration.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-800 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-800 focus:ring-white"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="mt-3 text-sm text-primary-200">
                We care about your data. Read our{' '}
                <a href="#" className="text-white font-medium underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Travelers Say</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from travelers who have explored the world with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-700 font-bold">JD</span>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">John Doe</h4>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "The trip to Bali was perfectly organized. Every detail was taken care of, and the personalized itinerary made our honeymoon truly special."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-700 font-bold">SM</span>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Sarah Miller</h4>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Our family trip to Europe was the best vacation we've ever had. The 24/7 support was invaluable when we needed to make last-minute changes."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-700 font-bold">RP</span>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Robert Parker</h4>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "The Thailand adventure package exceeded all expectations. The local experiences and hidden gems they included made it truly authentic."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;