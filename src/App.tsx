import React, { useState, useEffect } from 'react';
import { Calendar, Users, X, Info, CreditCard, CheckCircle2, Ticket, Printer, Percent, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedSection from './components/TrustedSection';
import RoomsSection from './components/RoomsSection';
import ServicesSection from './components/ServicesSection';
import Footer from './components/Footer';
import { BookingDetails, Room } from './types';
import { roomsData } from './data';

export default function App() {
  // Booking modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Selected fields
  const [selectedRoomName, setSelectedRoomName] = useState<string>('CANARY ROYAL SUITE');
  const [checkIn, setCheckIn] = useState<string>('2026-07-22');
  const [checkOut, setCheckOut] = useState<string>('2026-07-25');
  const [guests, setGuests] = useState<string>('2');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // percentage
  const [promoError, setPromoError] = useState<string>('');
  const [promoSuccess, setPromoSuccess] = useState<string>('');

  // Ticket detail state for printed confirmation
  const [ticketNumber, setTicketNumber] = useState<string>('');

  // Calculate stays
  const [nights, setNights] = useState<number>(3);
  const selectedRoom = roomsData.find((r) => r.name.toLowerCase() === selectedRoomName.toLowerCase()) || roomsData[0];

  useEffect(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end > start) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    } else {
      setNights(1);
    }
  }, [checkIn, checkOut]);

  // Open booking modal
  const handleOpenBooking = (roomName?: string) => {
    if (roomName) {
      setSelectedRoomName(roomName);
    }
    setBookingSuccess(false);
    setIsModalOpen(true);
  };

  // From quick-search form on Hero
  const handleHeroBookingSubmit = (details: BookingDetails) => {
    setCheckIn(details.checkIn);
    setCheckOut(details.checkOut);
    setGuests(details.guests);
    // Find closest room or default
    handleOpenBooking();
  };

  // Apply promo code
  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'NORPHEL20' || code === 'WELCOME20') {
      setAppliedDiscount(20);
      setPromoSuccess('20% Discount applied successfully!');
    } else if (code === 'LUXURY10') {
      setAppliedDiscount(10);
      setPromoSuccess('10% Discount applied successfully!');
    } else if (code) {
      setPromoError('Invalid promo code. Try "NORPHEL20" or "LUXURY10".');
      setAppliedDiscount(0);
    }
  };

  // Submit final reservation
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert('Please fill out all contact information.');
      return;
    }

    // Generate ticket number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `NR-2026-${randomNum}`;
    setTicketNumber(code);
    setBookingSuccess(true);
  };

  // Pricing math
  const basePricePerNight = selectedRoom.price;
  const rawSubtotal = basePricePerNight * nights;
  const discountAmount = rawSubtotal * (appliedDiscount / 100);
  const subtotal = rawSubtotal - discountAmount;
  const vat = Math.round(subtotal * 0.15); // 15% VAT
  const serviceCharge = Math.round(subtotal * 0.10); // 10% Service Charge
  const grandTotal = subtotal + vat + serviceCharge;

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

        {/* 2. Rooms Grid */}
        <RoomsSection onBookClick={handleOpenBooking} />

        {/* 3. Stats Section */}
        <TrustedSection />

        {/* 4. Services Grid */}
        <ServicesSection />

      </main>

      {/* Pre-Footer Banner & Footer */}
      <Footer onBookClick={() => handleOpenBooking()} />

      {/* Highly Interactive Luxury Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative bg-white rounded-[32px] w-full max-w-4xl shadow-2xl overflow-hidden my-8 border border-gray-100 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-[#2C3E50] text-white px-8 py-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-[#B8860B]" />
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                  Norphel Retreat Reservation
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {!bookingSuccess ? (
                <form onSubmit={handleFinalSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Input Forms */}
                  <div className="lg:col-span-7 space-y-6">
                    <h4 className="font-serif text-lg font-bold text-[#333333] border-b border-gray-100 pb-2">
                      1. Reservation Details
                    </h4>

                    {/* Room Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                        Select Suite / Room
                      </label>
                      <select
                        value={selectedRoomName}
                        onChange={(e) => setSelectedRoomName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#333333] font-semibold focus:ring-2 focus:ring-[#B8860B] focus:border-[#B8860B] focus:outline-none bg-white transition-all"
                      >
                        {roomsData.map((room) => (
                          <option key={room.id} value={room.name}>
                            {room.name} — BDT {room.price.toLocaleString()} / Night
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Dates & Guests */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                          Check In
                        </label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#333333] font-semibold focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                          Check Out
                        </label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#333333] font-semibold focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                          Guests
                        </label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#333333] font-semibold focus:ring-2 focus:ring-[#B8860B] focus:outline-none bg-white"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                        </select>
                      </div>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[#333333] border-b border-gray-100 pb-2 pt-4">
                      2. Contact Information
                    </h4>

                    {/* Contact Details */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#333333] placeholder-gray-400 focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#333333] placeholder-gray-400 focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            placeholder="+880 XXXXX-XXXXXX"
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#333333] placeholder-gray-400 focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Promo Codes */}
                    <div className="pt-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="e.g. NORPHEL20"
                          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#333333] placeholder-gray-400 focus:ring-2 focus:ring-[#B8860B] focus:outline-none flex-1 uppercase"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-5 py-2.5 bg-[#2C3E50] hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-sans font-bold transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-xs text-red-600 font-semibold mt-1.5">{promoError}</p>
                      )}
                      {promoSuccess && (
                        <p className="text-xs text-green-700 font-semibold mt-1.5 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> {promoSuccess}
                        </p>
                      )}
                      <span className="text-[11px] text-gray-500 block mt-1.5">
                        💡 Hint: Use promo code <strong className="text-[#B8860B] font-bold">NORPHEL20</strong> for 20% off.
                      </span>
                    </div>

                  </div>

                  {/* Right Column: Pricing Receipt */}
                  <div className="lg:col-span-5 bg-gray-50 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between border border-gray-100">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#333333] border-b border-gray-200 pb-3 mb-4">
                        Price Breakdown
                      </h4>

                      {/* Summary row */}
                      <div className="space-y-4 text-sm font-sans font-semibold text-[#666666]">
                        <div className="flex justify-between items-center text-[#333333]">
                          <span>Suite Type:</span>
                          <span className="text-right text-xs truncate max-w-[150px]">
                            {selectedRoom.name}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Price per night:</span>
                          <span className="text-right text-[#333333]">
                            BDT {basePricePerNight.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Total stay:</span>
                          <span className="text-right text-[#333333]">
                            {nights} {nights === 1 ? 'Night' : 'Nights'}
                          </span>
                        </div>

                        <div className="border-t border-gray-200 my-2" />

                        <div className="flex justify-between text-[#333333]">
                          <span>Subtotal:</span>
                          <span className="font-bold">
                            BDT {rawSubtotal.toLocaleString()}
                          </span>
                        </div>

                        {appliedDiscount > 0 && (
                          <div className="flex justify-between text-green-700">
                            <span className="flex items-center gap-1">
                              <Percent className="h-3.5 w-3.5" /> Discount ({appliedDiscount}%):
                            </span>
                            <span className="font-bold">
                              - BDT {discountAmount.toLocaleString()}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span>VAT (15%):</span>
                          <span>BDT {vat.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between">
                          <span>Service Charge (10%):</span>
                          <span>BDT {serviceCharge.toLocaleString()}</span>
                        </div>

                        <div className="border-t border-gray-200 my-2" />

                        <div className="flex justify-between items-baseline pt-2">
                          <span className="text-base font-serif font-bold text-[#333333]">Total Price:</span>
                          <span className="text-xl sm:text-2xl font-sans font-black text-[#B8860B]">
                            BDT {grandTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Final CTA */}
                    <div className="pt-8 space-y-3">
                      <div className="flex items-start space-x-2.5 text-[11px] text-[#666666]">
                        <Info className="h-4.5 w-4.5 text-[#B8860B] flex-shrink-0" />
                        <p className="leading-relaxed">
                          Your card is not charged yet. Complete this reservation to request room availability and lock in the price.
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-full bg-[#B8860B] hover:bg-[#9B7008] text-white font-sans font-bold tracking-wider uppercase transition-colors duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
                      >
                        <CreditCard className="h-4.5 w-4.5" /> Confirm Stay Booking
                      </button>
                    </div>

                  </div>
                </form>
              ) : (
                /* Ticket success view */
                <div className="py-8 text-center max-w-lg mx-auto flex flex-col items-center">
                  <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6 border border-green-200">
                    <CheckCircle2 className="h-10 w-10 fill-green-50" />
                  </div>
                  
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#333333] mb-3">
                    Reservation Confirmed!
                  </h3>
                  
                  <p className="font-sans text-sm text-[#666666] leading-relaxed mb-8">
                    Your luxury stay reservation has been registered. We have sent a confirmation email containing full coordinates and check-in instructions to <strong className="text-[#333333]">{guestEmail}</strong>.
                  </p>

                  {/* Elegant printable Ticket card */}
                  <div className="w-full bg-[#F3ECE0] rounded-3xl border border-[#D5C6AC] shadow-md p-6 text-left relative overflow-hidden mb-8">
                    {/* Security borders decoration */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-[#B8860B]" />
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border-r border-[#D5C6AC]" />
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border-l border-[#D5C6AC]" />

                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <span className="font-serif font-extrabold text-[#333333] tracking-wider text-base">
                          NORPHEL RETREAT
                        </span>
                        <p className="text-[10px] uppercase font-sans tracking-widest text-[#B8860B] font-bold">
                          Luxury Hospitality Guest ticket
                        </p>
                      </div>
                      <Ticket className="h-7 w-7 text-[#B8860B] opacity-75" />
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs sm:text-sm font-semibold font-sans">
                      <div>
                        <span className="text-[10px] text-[#666666] block uppercase tracking-wider mb-1">
                          Reservation ID
                        </span>
                        <span className="text-[#333333] font-bold tracking-wider">{ticketNumber}</span>
                      </div>
                      
                      <div>
                        <span className="text-[10px] text-[#666666] block uppercase tracking-wider mb-1">
                          Guest Name
                        </span>
                        <span className="text-[#333333] font-bold truncate block">{guestName}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#666666] block uppercase tracking-wider mb-1">
                          Room/Suite
                        </span>
                        <span className="text-[#333333] font-bold line-clamp-1">{selectedRoom.name}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#666666] block uppercase tracking-wider mb-1">
                          Stay Stay Stay
                        </span>
                        <span className="text-[#333333] font-bold">
                          {nights} {nights === 1 ? 'Night' : 'Nights'} ({guests} {guests === '1' ? 'Guest' : 'Guests'})
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#666666] block uppercase tracking-wider mb-1">
                          Check In
                        </span>
                        <span className="text-[#333333] font-bold">{checkIn}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#666666] block uppercase tracking-wider mb-1">
                          Check Out
                        </span>
                        <span className="text-[#333333] font-bold">{checkOut}</span>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-[#D5C6AC] mt-6 pt-5 flex justify-between items-baseline">
                      <span className="text-xs font-serif font-bold text-[#333333]">Guaranteed Price:</span>
                      <span className="text-base sm:text-lg font-sans font-black text-[#B8860B]">
                        BDT {grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-3.5 rounded-full border border-gray-200 hover:bg-gray-50 font-sans font-bold text-sm text-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Printer className="h-4.5 w-4.5" /> Print Ticket
                    </button>
                    
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3.5 rounded-full bg-[#B8860B] hover:bg-[#9B7008] text-white font-sans font-bold text-sm tracking-wide transition-all uppercase shadow-md cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
