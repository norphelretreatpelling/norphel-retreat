import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { navbar, hotelInfo } = siteConfig;

  return (
    <header className="sticky top-0 z-50 bg-[#F8F8F8]/95 backdrop-blur-md transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="flex items-center">
              <div className="font-sans text-sm sm:text-xl font-bold tracking-wider text-[#333333] leading-tight">
                <div>NORPHEL</div>
                <div className="flex items-baseline">
                  <span>RETREAT</span>
                  <span className="text-[#B8860B] font-extrabold px-0.5 sm:px-1">|</span>
                  <span>{hotelInfo.subTitle || 'PELLING'}</span>
                  <span className="h-2 w-2 rounded-full bg-[#B8860B] inline-block ml-1"></span>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex space-x-8 xl:space-x-12">
            {navbar.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#333333] hover:text-[#B8860B] font-sans font-medium text-sm xl:text-base tracking-wide transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onBookClick}
              id="desktop-book-now"
              className="px-6 py-2.5 rounded-full bg-[#B8860B] hover:bg-[#9B7008] text-white font-sans font-semibold text-sm tracking-wider transition-colors duration-300 shadow-sm"
            >
              {navbar.bookButtonText}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#333333] hover:text-[#B8860B] hover:bg-[#EDEDED]/50 focus:outline-none focus:ring-2 focus:ring-[#B8860B] transition-colors"
              aria-expanded="false"
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
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100 border-b border-[#EDEDED]' : 'max-h-0 opacity-0 overflow-hidden'
          } bg-[#F8F8F8]`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 sm:px-6">
          {navbar.navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-sans font-semibold text-[#333333] hover:text-[#B8860B] hover:bg-[#EDEDED] transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 px-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onBookClick();
              }}
              id="mobile-book-now"
              className="w-full px-6 py-3 rounded-full bg-[#B8860B] hover:bg-[#9B7008] text-white font-sans font-bold text-center tracking-wider transition-colors duration-300 shadow-md"
            >
              {navbar.bookButtonText}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
