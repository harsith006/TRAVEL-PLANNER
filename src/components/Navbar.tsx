import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="relative group">
              <button 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-100 hover:text-primary-600 flex items-center"
                onClick={toggleDropdown}
              >
                Explore Destinations
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fade-in">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link 
                      to="/destinations?region=asia" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={closeDropdown}
                    >
                      Asia
                    </Link>
                    <Link 
                      to="/destinations?region=europe" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={closeDropdown}
                    >
                      Europe
                    </Link>
                    <Link 
                      to="/destinations?region=america" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={closeDropdown}
                    >
                      Americas
                    </Link>
                    <Link 
                      to="/destinations?region=australia" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={closeDropdown}
                    >
                      Australia & Oceania
                    </Link>
                    <Link 
                      to="/destinations?region=africa" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={closeDropdown}
                    >
                      Africa
                    </Link>
                    <Link 
                      to="/destinations" 
                      className="block px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50"
                      onClick={closeDropdown}
                    >
                      View All Destinations
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/packages" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-100 hover:text-primary-600">
              Holiday Tour Packages
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none"
                  onClick={() => navigate('/dashboard')}
                >
                  <User className="h-4 w-4 mr-1" />
                  {user?.name}
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      Dashboard
                    </Link>
                    {user?.isAdmin && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-1" />
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-primary-50 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="block">
              <Link 
                to="/destinations" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                onClick={toggleMenu}
              >
                Explore Destinations
              </Link>
              <div className="pl-4 space-y-1">
                <Link 
                  to="/destinations?region=asia" 
                  className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                  onClick={toggleMenu}
                >
                  Asia
                </Link>
                <Link 
                  to="/destinations?region=europe" 
                  className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                  onClick={toggleMenu}
                >
                  Europe
                </Link>
                <Link 
                  to="/destinations?region=america" 
                  className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                  onClick={toggleMenu}
                >
                  Americas
                </Link>
                <Link 
                  to="/destinations?region=australia" 
                  className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                  onClick={toggleMenu}
                >
                  Australia & Oceania
                </Link>
                <Link 
                  to="/destinations?region=africa" 
                  className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                  onClick={toggleMenu}
                >
                  Africa
                </Link>
              </div>
            </div>
            <Link 
              to="/packages" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
              onClick={toggleMenu}
            >
              Holiday Tour Packages
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-1">
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                {user?.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    onClick={toggleMenu}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </div>
                </button>
              </div>
            ) : (
              <div className="px-4">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <div className="mt-2">
                  <Link
                    to="/register"
                    className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;