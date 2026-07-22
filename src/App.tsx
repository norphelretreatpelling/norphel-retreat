import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUsSection from './components/AboutUsSection';
import RoomsSection from './components/RoomsSection';
import ServicesSection from './components/ServicesSection';
import Footer from './components/Footer';
import { BookingDetails } from './types';
import { siteConfig } from './config/siteConfig';

const WHATSAPP_NUMBER = siteConfig.hotelInfo.whatsappNumber;

const openWhatsApp = (message: string) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

export default function App() {

  // Format date to readable string like "22 Jul 2026"
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Open WhatsApp with optional room name context
  const handleOpenBooking = (roomName?: string) => {
    const message = roomName
      ? `Hello, I'm interested in booking the *${roomName}* at *Norphel Retreat, Pelling*. Could you please share the availability and tariff details? Thank you!`
      : `Hello, I'm interested in booking a stay at *Norphel Retreat, Pelling*. Could you please share the available rooms and tariff details? Thank you!`;
    openWhatsApp(message);
  };

  // Open WhatsApp with booking details from the Hero search bar
  const handleHeroBookingSubmit = (details: BookingDetails) => {
    const nights = (() => {
      const start = new Date(details.checkIn);
      const end = new Date(details.checkOut);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end > start) {
        return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      }
      return null;
    })();

    const nightsText = nights ? ` (${nights} ${nights === 1 ? 'night' : 'nights'})` : '';

    const childrenText = Number(details.children) > 0 ? ` | *Children:* ${details.children}` : '';

    const message = `Hello, I'd like to book a stay at *Norphel Retreat, Pelling*.\n\n`
      + `*Check-in:* ${formatDate(details.checkIn)}\n`
      + `*Check-out:* ${formatDate(details.checkOut)}${nightsText}\n`
      + `*Rooms:* ${details.rooms} | *Adults:* ${details.adults}${childrenText}\n\n`
      + `Kindly confirm availability and share the tariff. Thank you!`;
    openWhatsApp(message);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#B8860B]/20 selection:text-[#B8860B]">

      {/* Navbar Header */}
      <Navbar onBookClick={() => handleOpenBooking()} />

      {/* Main Page Sections */}
      <main className="flex-1">

        {/* 1. Hero Section */}
        <Hero
          onBookClick={() => handleOpenBooking()}
          onBookSubmit={handleHeroBookingSubmit}
        />

        {/* 2. Stats Section */}
        <AboutUsSection />

        {/* 3. Rooms Grid */}
        <RoomsSection onBookClick={handleOpenBooking} />

        {/* 4. Services Grid */}
        <ServicesSection />

      </main>

      {/* Pre-Footer Banner & Footer */}
      <Footer onBookClick={() => handleOpenBooking()} />

      {/* WhatsApp Floating Action Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I'd like to know more about Norphel Retreat, Pelling. Could you help me?")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 group-hover:opacity-50" />
        <span className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#1EBE57] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-7 w-7 fill-white">
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.96A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.35 22.606c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.66-1.216-4.752-1.97-7.81-6.79-8.044-7.104-.226-.314-1.9-2.53-1.9-4.826s1.2-3.426 1.628-3.894c.39-.426.924-.616 1.244-.616.314 0 .63.002.906.016.312.014.686.038 1.046.81.428.916 1.44 3.518 1.566 3.774.128.256.256.598.076.912-.168.322-.312.522-.568.808-.256.286-.504.508-.76.818-.232.274-.494.566-.206.994.286.426 1.276 2.104 2.74 3.408 1.882 1.678 3.466 2.198 3.956 2.44.49.242.776.204 1.062-.124.292-.33 1.254-1.462 1.588-1.964.33-.502.664-.418 1.12-.25.458.166 2.912 1.374 3.41 1.624.498.25.83.374.952.582.122.208.122 1.214-.268 2.314z"/>
          </svg>
        </span>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-xs font-semibold px-3 py-2 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat with us
        </span>
      </a>

    </div>
  );
}
