import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Users, Home, Star, ArrowUpRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { BookingDetails } from '../types';
import { siteConfig } from '../config/siteConfig';
import DatePicker from './DatePicker';

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
  // Date helpers
  const toDateString = (d: Date) => d.toISOString().split('T')[0];
  const addDays = (dateStr: string, days: number) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return toDateString(d);
  };

  const today = toDateString(new Date());

  // Booking bar state
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDays(today, 1));
  const [rooms, setRooms] = useState('1');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);
  const [roomPickerOpen, setRoomPickerOpen] = useState(false);
  const guestPickerRef = useRef<HTMLDivElement>(null);
  const roomPickerRef = useRef<HTMLDivElement>(null);

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (guestPickerRef.current && !guestPickerRef.current.contains(e.target as Node)) {
        setGuestPickerOpen(false);
      }
      if (roomPickerRef.current && !roomPickerRef.current.contains(e.target as Node)) {
        setRoomPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When check-in changes, auto-advance check-out to the next day if needed
  const handleCheckInChange = (newCheckIn: string) => {
    setCheckIn(newCheckIn);
    const nextDay = addDays(newCheckIn, 1);
    if (checkOut <= newCheckIn) {
      setCheckOut(nextDay);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookSubmit({ checkIn, checkOut, rooms, adults: String(adults), children: String(children) });
  };

  const { hero } = siteConfig;

  return (
    <section id="home" className="relative pb-16 lg:pb-20 pt-6 bg-[#F8F8F8]">
      {/* Grand Hotel Dusk Background Frame with highly rounded luxury frame */}
      <div className="relative mx-4 sm:mx-6 lg:mx-8 xl:mx-12 rounded-[40px] sm:rounded-[48px] overflow-hidden min-h-[480px] sm:min-h-[440px] lg:min-h-[520px] xl:min-h-[560px] bg-slate-950 shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={hero.bgImage}
            alt={`${hero.headingAccent} lobby interior`}
            loading="eager"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-90 scale-100 transition-transform duration-[10s]"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/10 to-black/35" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-16 xl:py-20 flex flex-col justify-between h-full min-h-[440px] sm:min-h-[400px] lg:min-h-[480px] xl:min-h-[520px]">

          {/* Main Hero Elements Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full my-auto">

            {/* Left Glass Overlay Content */}
            <div className="lg:col-span-8 xl:col-span-7 text-white flex flex-col space-y-6 max-w-2xl p-2 sm:p-4">

              {/* Main Heading */}
              <h1 className="font-sans text-lg sm:text-lg md:text-2xl font-semibold tracking-[0.2em] text-gray-300 uppercase">
                {hero.eyebrowText}
                <span className="relative inline-block mt-4 w-full">
                  <motion.span
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    className="text-[#B8860B] font-playwrite block text-[25px] xs:text-[28px] sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl tracking-wide normal-case font-bold leading-relaxed select-none py-2 whitespace-nowrap overflow-visible"
                  >
                    {hero.headingAccent.split("").map((char, index) => (
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
                        d="M10,12 C120,4 280,18 390,8"
                        stroke="#B8860B"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        variants={underlineVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.5 }}
                      />
                    </svg>
                  </div>
                </span>
              </h1>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-gray-200/90 leading-relaxed font-normal max-w-md">
                {hero.description}
              </p>

              {/* Core Hero Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={onBookClick}
                  className="px-7 py-3.5 rounded-full bg-[#B8860B] hover:bg-[#9B7008] text-white font-sans font-semibold tracking-wider text-xs transition-all duration-300 shadow-md text-center cursor-pointer hover:scale-[1.02]"
                >
                  {hero.primaryCtaText}
                </button>

                <a
                  href="#rooms"
                  className="px-6 py-3.5 rounded-full border border-white/60 hover:border-white hover:bg-white/10 text-white font-sans font-semibold tracking-wider text-xs flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02]"
                >
                  {hero.secondaryCtaText}
                  <span className="h-6 w-6 rounded-full bg-white text-[#2C3E50] flex items-center justify-center font-bold">
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#2C3E50]" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Booking Search Bar Over bottom edge */}
      <div className="relative -mt-10 sm:-mt-12 lg:-mt-10 max-w-2xl lg:max-w-4xl mx-auto px-0 z-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[32px] p-4 sm:p-6 shadow-2xl border border-gray-100/90 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center"
        >
          {/* Check In */}
          <DatePicker
            label="Check In"
            value={checkIn}
            minDate={today}
            onChange={handleCheckInChange}
          />

          {/* Check Out */}
          <DatePicker
            label="Check Out"
            value={checkOut}
            minDate={addDays(checkIn, 1)}
            onChange={setCheckOut}
          />

          {/* Rooms Capsule Field with Popover */}
          <div className="relative" ref={roomPickerRef}>
            <div
              onClick={() => setRoomPickerOpen(!roomPickerOpen)}
              className="bg-[#F8F8F8] hover:bg-gray-100/95 rounded-full px-5 py-4 flex items-center justify-between transition-all duration-200 group border border-transparent hover:border-gray-200/50 cursor-pointer"
            >
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400">Rooms</span>
                <span className="text-xs font-sans font-bold text-gray-800">
                  {hero.roomOptions.find((opt) => opt.value === rooms)?.label || `${rooms} Rooms`}
                </span>
              </div>
              <Home className="h-4 w-4 text-gray-500 group-hover:text-amber-600 transition-colors" />
            </div>

            {/* Room Picker Popover */}
            {roomPickerOpen && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-30 min-w-[200px]">
                {hero.roomOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setRooms(option.value);
                      setRoomPickerOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${rooms === option.value
                      ? 'bg-[#B8860B]/10 text-[#B8860B]'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Guests Capsule Field with Popover */}
          <div className="relative" ref={guestPickerRef}>
            <div
              onClick={() => setGuestPickerOpen(!guestPickerOpen)}
              className="bg-[#F8F8F8] hover:bg-gray-100/95 rounded-full px-5 py-4 flex items-center justify-between transition-all duration-200 group border border-transparent hover:border-gray-200/50 cursor-pointer"
            >
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400">Guests</span>
                <span className="text-xs font-sans font-bold text-gray-800">
                  {adults} {adults === 1 ? 'Adult' : 'Adults'}{children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : ''}
                </span>
              </div>
              <Users className="h-4 w-4 text-gray-500 group-hover:text-amber-600 transition-colors" />
            </div>

            {/* Guest Picker Popover */}
            {guestPickerOpen && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-30 min-w-[200px]">
                {/* Adults Row */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm font-bold text-gray-800">Adults</span>
                    <span className="block text-[10px] text-gray-400">Age 13+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:border-[#B8860B] hover:text-[#B8860B] flex items-center justify-center text-lg leading-none font-bold transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={adults <= 1}
                    >
                      −
                    </button>
                    <span className="text-sm font-bold text-gray-800 w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(Math.min(hero.guestLimits.maxAdults, adults + 1))}
                      className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:border-[#B8860B] hover:text-[#B8860B] flex items-center justify-center text-lg leading-none font-bold transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={adults >= hero.guestLimits.maxAdults}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-100 my-1" />

                {/* Children Row */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm font-bold text-gray-800">Children</span>
                    <span className="block text-[10px] text-gray-400">Age 0–12</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:border-[#B8860B] hover:text-[#B8860B] flex items-center justify-center text-lg leading-none font-bold transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={children <= 0}
                    >
                      −
                    </button>
                    <span className="text-sm font-bold text-gray-800 w-4 text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(Math.min(hero.guestLimits.maxChildren, children + 1))}
                      className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:border-[#B8860B] hover:text-[#B8860B] flex items-center justify-center text-lg leading-none font-bold transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={children >= hero.guestLimits.maxChildren}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Done Button */}
                <button
                  type="button"
                  onClick={() => setGuestPickerOpen(false)}
                  className="w-full mt-3 py-2 rounded-full bg-[#B8860B] hover:bg-[#9B7008] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
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

