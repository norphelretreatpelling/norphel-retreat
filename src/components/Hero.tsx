import React, { useState, useRef } from 'react';
import { Calendar, Users, Home, Star, ArrowUpRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { corporateLogos } from '../data';
import { BookingDetails } from '../types';

interface HeroProps {
  onBookClick: () => void;
  onBookSubmit: (details: BookingDetails) => void;
}

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const characterVariants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(-20% 100% -20% -20%)",
    y: 4,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    clipPath: "inset(-20% -20% -20% -20%)",
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.3, 0.64, 1],
    },
  },
};

const underlineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: 2.2,
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

export default function Hero({ onBookClick, onBookSubmit }: HeroProps) {
  // Animation play key
  const [animationKey, setAnimationKey] = useState(0);
  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1);
  };

  // Booking bar state
  const [checkIn, setCheckIn] = useState('2026-07-22');
  const [checkOut, setCheckOut] = useState('2026-07-25');
  const [rooms, setRooms] = useState('1');
  const [guests, setGuests] = useState('2');

  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookSubmit({ checkIn, checkOut, rooms, guests });
  };

  const handleContainerClick = (ref: React.RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      try {
        if (typeof ref.current.showPicker === 'function') {
          ref.current.showPicker();
        } else {
          ref.current.focus();
          ref.current.click();
        }
      } catch (err) {
        ref.current.focus();
        ref.current.click();
      }
    }
  };

  // Helper to format date cleanly like '22 Jul'
  const formatDate = (dateStr: string, fallback: string) => {
    if (!dateStr) return fallback;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  return (
    <section id="home" className="relative pb-16 lg:pb-24 pt-6 bg-[#F8F8F8]">
      {/* Grand Hotel Dusk Background Frame with highly rounded luxury frame */}
      <div className="relative mx-4 sm:mx-6 lg:mx-8 xl:mx-12 rounded-[40px] sm:rounded-[48px] overflow-hidden min-h-[680px] lg:min-h-[740px] xl:min-h-[800px] bg-slate-950 shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/cover.jpg"
            alt="Norphel Retreat lobby interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-90 scale-100 transition-transform duration-[10s]"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/10 to-black/35" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-24 xl:py-28 flex flex-col justify-between h-full min-h-[640px] lg:min-h-[720px] xl:min-h-[760px]">

          {/* Main Hero Elements Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full my-auto">

            {/* Left Glass Overlay Content */}
            <div className="lg:col-span-8 xl:col-span-7 text-white flex flex-col space-y-6 max-w-2xl p-2 sm:p-4">

              {/* Main Heading styled exactly like the high-fidelity screenshot */}
              <h1 className="font-sans text-lg sm:text-lg md:text-2xl font-semibold tracking-[0.2em] text-gray-300 uppercase">
                WELCOME TO
                <span className="relative inline-block mt-4 w-full">
                  <motion.span
                    key={animationKey}
                    onMouseEnter={replayAnimation}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[#B8860B] font-playwrite block text-[25px] xs:text-[28px] sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl tracking-wide normal-case font-normal leading-relaxed cursor-pointer select-none py-2 whitespace-nowrap overflow-visible"
                  >
                    {"Norphel Retreat".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        variants={characterVariants}
                        className="inline-block origin-bottom px-[1.5px]"
                        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>

                  {/* Underline SVG path */}
                  <div className="absolute -bottom-3 left-0 right-0 h-4 pointer-events-none overflow-visible max-w-sm sm:max-w-md lg:max-w-lg">
                    <svg
                      className="w-full h-full overflow-visible"
                      viewBox="0 0 400 20"
                      fill="none"
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <motion.path
                        key={animationKey}
                        d="M10,12 C120,4 280,18 390,8"
                        stroke="#B8860B"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        variants={underlineVariants}
                        initial="hidden"
                        animate="visible"
                      />
                    </svg>
                  </div>
                </span>
              </h1>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-gray-200/90 leading-relaxed font-normal max-w-md">
                A world where comfort, elegance, and tranquility come together to create unforgettable moments.
              </p>

              {/* Core Hero Buttons with Custom Arrow icon inside outline explore button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={onBookClick}
                  className="px-7 py-3.5 rounded-full bg-[#B8860B] hover:bg-[#9B7008] text-white font-sans font-semibold tracking-wider text-xs transition-all duration-300 shadow-md text-center cursor-pointer hover:scale-[1.02]"
                >
                  Book Your Stay
                </button>

                <a
                  href="#rooms"
                  className="px-6 py-3.5 rounded-full border border-white/60 hover:border-white hover:bg-white/10 text-white font-sans font-semibold tracking-wider text-xs flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02]"
                >
                  Explore Rooms
                  <span className="h-6 w-6 rounded-full bg-white text-[#2C3E50] flex items-center justify-center font-bold">
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#2C3E50]" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Booking Search Bar Over bottom edge - Exactly as shown in screenshot */}
      <div className="relative -mt-10 sm:-mt-12 lg:-mt-10 max-w-2xl lg:max-w-4xl mx-auto px-0 z-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[32px] p-4 sm:p-6 shadow-2xl border border-gray-100/90 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center"
        >
          {/* Check In Capsule Field */}
          <div
            onClick={() => handleContainerClick(checkInRef)}
            className="relative bg-[#F8F8F8] hover:bg-gray-100/95 rounded-full px-5 py-4 flex items-center justify-between transition-all duration-200 group border border-transparent hover:border-gray-200/50 cursor-pointer"
          >
            <div className="flex flex-col text-left pointer-events-none">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400">Check In</span>
              <span className="text-xs font-sans font-bold text-gray-800">
                {formatDate(checkIn, 'Check In')}
              </span>
            </div>
            <Calendar className="h-4 w-4 text-gray-500 group-hover:text-amber-600 transition-colors pointer-events-none" />
            <input
              ref={checkInRef}
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
            />
          </div>

          {/* Check Out Capsule Field */}
          <div
            onClick={() => handleContainerClick(checkOutRef)}
            className="relative bg-[#F8F8F8] hover:bg-gray-100/95 rounded-full px-5 py-4 flex items-center justify-between transition-all duration-200 group border border-transparent hover:border-gray-200/50 cursor-pointer"
          >
            <div className="flex flex-col text-left pointer-events-none">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400">Check Out</span>
              <span className="text-xs font-sans font-bold text-gray-800">
                {formatDate(checkOut, 'Check Out')}
              </span>
            </div>
            <Calendar className="h-4 w-4 text-gray-500 group-hover:text-amber-600 transition-colors pointer-events-none" />
            <input
              ref={checkOutRef}
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
            />
          </div>

          {/* Rooms Capsule Field */}
          <div className="relative bg-[#F8F8F8] hover:bg-gray-100/95 rounded-full px-5 py-4 flex items-center justify-between transition-all duration-200 group border border-transparent hover:border-gray-200/50">
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400">Rooms</span>
              <span className="text-xs font-sans font-bold text-gray-800">
                {rooms === '1' ? '1 Room' : `${rooms} Rooms`}
              </span>
            </div>
            <Home className="h-4 w-4 text-gray-500 group-hover:text-amber-600 transition-colors" />
            <select
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full font-bold bg-white z-10"
            >
              <option value="1">1 Room</option>
              <option value="2">2 Rooms</option>
              <option value="3">3 Rooms</option>
              <option value="4">4+ Rooms</option>
            </select>
          </div>

          {/* Guests Capsule Field */}
          <div className="relative bg-[#F8F8F8] hover:bg-gray-100/95 rounded-full px-5 py-4 flex items-center justify-between transition-all duration-200 group border border-transparent hover:border-gray-200/50">
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400">Guests</span>
              <span className="text-xs font-sans font-bold text-gray-800">
                {guests === '1' ? '1 Guest' : `${guests} Guests`}
              </span>
            </div>
            <Users className="h-4 w-4 text-gray-500 group-hover:text-amber-600 transition-colors" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full font-bold bg-white z-10"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="relative">
            <button
              type="submit"
              className="w-full py-5 rounded-full bg-[#B8860B] hover:bg-[#9B7008] text-white font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md text-center cursor-pointer hover:scale-[1.02]"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

