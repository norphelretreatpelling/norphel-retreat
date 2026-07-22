import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface RoomsSectionProps {
  onBookClick: (roomName?: string) => void;
}

export default function RoomsSection({ onBookClick }: RoomsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const { roomsSection } = siteConfig;

  // Filter rooms based on selection
  const filteredRooms = roomsSection.rooms.filter((room) => {
    if (activeCategory === 'all') return true;
    return room.type === activeCategory;
  });

  return (
    <section id="rooms" className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-7">
            <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.2em] text-[#B8860B] uppercase block mb-3">
              {roomsSection.eyebrow}
            </span>
            <h2 className="font-roboto text-3xl sm:text-4xl md:text-5xl font-semibold text-[#333333] tracking-wide leading-tight">
              {roomsSection.title}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <p className="font-sans text-[#666666] text-sm sm:text-base leading-relaxed">
              {roomsSection.description}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-start gap-3 mb-12 overflow-x-auto pb-2 scrollbar-none">
          {roomsSection.categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-white text-[#B8860B] shadow-sm border border-gray-200/80'
                  : 'bg-[#EDEDED] hover:bg-[#E2E2E2] text-[#666666]'
              }`}
            >
              {cat.label} {cat.count !== null && `(${cat.count})`}
            </button>
          ))}
        </div>

        {/* Grid of Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => {
            return (
              <div
                key={room.id}
                className="bg-white rounded-[28px] border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col justify-between"
              >
                {/* Room Image Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-sans font-extrabold tracking-wider text-[#333333] uppercase shadow-sm">
                    {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location */}
                    <span className="text-xs font-sans font-bold text-[#666666] uppercase tracking-wider block mb-2">
                      {room.location}
                    </span>
                    
                    {/* Room Name */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#333333] tracking-wide mb-4 line-clamp-1">
                      {room.name}
                    </h3>
                  </div>

                  <hr className="border-gray-100 my-4" />

                  {/* Pricing and Action Bottom Bar */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-sans font-bold text-[#666666] uppercase tracking-wider">
                        Starting From
                      </span>
                      <div className="flex items-baseline space-x-1">
                        <span className="font-sans font-bold text-base sm:text-lg text-[#333333]">
                          INR {room.price.toLocaleString()}
                        </span>
                        <span className="text-[11px] font-sans font-medium text-[#666666]">
                          / Night
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onBookClick(room.name)}
                      className="px-5 py-2.5 rounded-full bg-[#B8860B] hover:bg-[#9B7008] text-white font-sans font-semibold text-xs tracking-wider uppercase transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                    >
                      Book now <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
