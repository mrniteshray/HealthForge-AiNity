'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, User, Menu, X } from 'lucide-react';

const DashboardNavbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-gray-600" />
          ) : (
            <Menu className="h-5 w-5 text-gray-600" />
          )}
        </button>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:block flex-1 max-w-lg mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Search className="h-5 w-5 text-gray-600" />
        </button>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || user?.fullName || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || 'user@example.com'}
              </p>
            </div>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary flex items-center justify-center">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 p-4">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <h3 className="text-lg font-semibold">Search</h3>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 p-4">
          <div className="flex flex-col space-y-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 p-4 border-b border-gray-200">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {user?.name || user?.fullName || 'User'}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
              <Bell className="h-5 w-5 text-gray-600" />
              <span>Notifications</span>
            </button>

            <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
              <Search className="h-5 w-5 text-gray-600" />
              <span>Search</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 p-3 bg-primary text-white rounded-lg font-semibold text-center"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardNavbar;