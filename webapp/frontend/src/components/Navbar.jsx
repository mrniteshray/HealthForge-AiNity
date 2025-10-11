'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-3 z-50 rounded-full mx-4 mt-3 border border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Logo with Circular Design */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center group"
            >
              <div>
                <Image src={"/images/logo.svg"} alt="Logo" width={150} height={60} className="" />
              </div>
            </Link>
          </div>

          {/* Center - Menu Items with Active Underline */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-1 bg-gray-100/80 rounded-full p-1 backdrop-blur-sm">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'text-white shadow-lg'
                      : 'text-gray-700 hover:text-primary hover:bg-white/60'
                  }`}
                >
                  {pathname === item.href && (
                    <div className="absolute inset-0 bg-primary rounded-full transform scale-105 transition-all duration-300" />
                  )}
                  <span className="relative z-10">
                    {item.name}
                  </span>
                  
                  {/* Active Underline Animation */}
                  {pathname === item.href && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-sm" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right - Login Button with Circular Design */}
          <div className="hidden md:flex items-center">
            <Link
              href="/login"
              className="relative group"
            >
              <div className="w-20 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <span className="text-white font-semibold text-sm">Login</span>
              </div>
              
              {/* Circular Pulse Effect */}
              <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 animate-ping group-hover:animate-none transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile menu button with Circular Design */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu with Circular Design */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-xl mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'text-white shadow-md'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {pathname === item.href && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl transform scale-105 transition-all duration-300" />
                  )}
                  <span className="relative z-10 flex items-center">
                    {item.name}
                    {pathname === item.href && (
                      <div className="ml-2 w-2 h-2 bg-white rounded-full" />
                    )}
                  </span>
                </Link>
              ))}
              
              {/* Mobile Login Button */}
              <div className="pt-3 border-t border-gray-200">
                <Link
                  href="/login"
                  className="block w-full text-center bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;