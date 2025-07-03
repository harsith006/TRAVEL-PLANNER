import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Logo className="h-8 w-auto" />
            <p className="mt-4 text-sm text-gray-300 max-w-xs">
              Your one-stop solution for customized travel packages. Create your perfect trip with our hassle-free planning tools.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/destinations" className="text-sm text-gray-300 hover:text-primary-400">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-sm text-gray-300 hover:text-primary-400">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-sm text-gray-300 hover:text-primary-400">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-300 hover:text-primary-400">
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/faq" className="text-sm text-gray-300 hover:text-primary-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-primary-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-300 hover:text-primary-400">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-300 hover:text-primary-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Contact Us
            </h3>
            <div className="mt-4 space-y-4">
              <p className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2 text-primary-500" />
                +1 (800) 123-4567
              </p>
              <p className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2 text-primary-500" />
                support@pickyourtrail.com
              </p>
              <p className="flex items-start text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-primary-500 mt-1" />
                <span>123 Travel Street, Tourism City, 12345, Country</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} PickYourTrail. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/terms" className="text-sm text-gray-400 hover:text-primary-400">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-primary-400">
              Privacy
            </Link>
            <Link to="/cookies" className="text-sm text-gray-400 hover:text-primary-400">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;