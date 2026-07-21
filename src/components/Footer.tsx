import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onBookClick: () => void;
}

export default function Footer({ onBookClick }: FooterProps) {
  return (
    <footer className="relative bg-[#F8F8F8] pt-12">
      {/* Pre-Footer Banner Frame */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden min-h-[340px] flex items-center bg-slate-900 shadow-xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/cover.jpg"
              alt="Norphel Retreat lobby interior"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/60 to-black/20" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 w-full text-center px-6 sm:px-12 py-12 text-white">
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-4">
              Discover Tranquility With
              <span className="text-[#B8860B] font-playwrite block text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl tracking-wide mt-4 normal-case font-normal leading-relaxed">
                Norphel Retreat
              </span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-gray-200/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Your ideal destination for relaxation, rejuvenation, and memorable experiences.
            </p>
            <button
              onClick={onBookClick}
              className="px-8 py-3.5 rounded-full bg-[#B8860B] hover:bg-[#9B7008] text-white font-sans font-bold tracking-wider uppercase transition-colors duration-300 shadow-lg cursor-pointer text-sm"
            >
              Book Your Stay
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Block */}
      <div className="bg-[#F3ECE0] text-[#333333] pt-16 pb-12 rounded-t-[40px] border-t border-amber-800/10 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 pb-12">

            {/* Left Column: Brand & Newsletter */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              {/* Logo */}
              <div className="flex items-baseline space-x-1">
                <span className="font-sans text-sm sm:text-xl font-bold tracking-wider text-[#333333] leading-tight">
                  NORPHEL <br />
                  RETREAT
                  <span className="h-2 w-2 rounded-full bg-[#B8860B] inline-block ml-1 mb-0.5"></span>
                </span>
              </div>

              <p className="font-sans text-sm text-[#666666] leading-relaxed">
                A world where comfort, elegance, and tranquility come together to create unforgettable moments.
              </p>

              {/* Social Icons */}
              <div className="flex items-center space-x-3.5 pt-4">
                {[
                  { icon: Facebook, href: 'https://facebook.com' },
                  { icon: Instagram, href: 'https://instagram.com' },
                  { icon: Twitter, href: 'https://twitter.com' },
                  { icon: Youtube, href: 'https://youtube.com' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full border border-[#D5C6AC] hover:border-[#B8860B] hover:bg-[#B8860B] hover:text-white text-[#666666] flex items-center justify-center transition-all duration-300"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Three Middle Columns: Nav Lists */}

            {/* Explore List */}
            <div className="lg:col-span-3 lg:pl-12">
              <h4 className="font-serif text-lg font-bold text-[#333333] mb-5 tracking-wide">
                Explore
              </h4>
              <ul className="space-y-3.5">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'Rooms & Suites', href: '#rooms' },
                  { name: 'About', href: '#about' }
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href}
                      className="text-sm font-sans font-semibold text-[#666666] hover:text-[#B8860B] transition-colors duration-200 block"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>



            {/* Far Right Column: Contacts */}
            <div id="contact" className="lg:col-span-4 space-y-5 lg:pl-0">
              <h4 className="font-serif text-lg font-bold text-[#333333] mb-5 tracking-wide">
                Get in touch
              </h4>
              <ul className="space-y-4">
                {/* Address */}
                <li className="flex items-start space-x-3 text-sm text-[#666666]">
                  <MapPin className="h-5 w-5 text-[#B8860B] flex-shrink-0 mt-0.5" />
                  <span className="font-sans leading-relaxed">
                    Pine Crest, Pelling-Rimbi Road, near Udaan,
                    Pelling City, Pelling,
                    Sikkim 737113.
                  </span>
                </li>

                {/* Email */}
                <li className="flex items-start space-x-3 text-sm text-[#666666]">
                  <Mail className="h-5 w-5 text-[#B8860B] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col space-y-1">
                    <a
                      href="mailto:hotlenorphelpelling@gmail.com"
                      className="font-sans hover:text-[#B8860B] transition-colors whitespace-nowrap"
                    >
                      hotlenorphelpelling@gmail.com
                    </a>
                    <a
                      href="mailto:reservations.norphel@gmail.com"
                      className="font-sans hover:text-[#B8860B] transition-colors whitespace-nowrap"
                    >
                      reservations.norphel@gmail.com
                    </a>
                  </div>
                </li>

                {/* Phone */}
                <li className="flex items-start space-x-3 text-sm text-[#666666]">
                  <Phone className="h-5 w-5 text-[#B8860B] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col space-y-1">
                    <a
                      href="tel:+919127504733"
                      className="font-sans hover:text-[#B8860B] transition-colors leading-relaxed"
                    >
                      +91 91275 04733
                    </a>
                    <a
                      href="tel:+919609911471"
                      className="font-sans hover:text-[#B8860B] transition-colors leading-relaxed"
                    >
                      +91 96099 11471
                    </a>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright Divider */}
          <div className="border-t border-[#D5C6AC]/60 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#666666] font-sans font-semibold">
            <p>© 2026 Norphel Retreat. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#home" className="hover:text-[#B8860B] transition-colors">Terms of Service</a>
              <a href="#home" className="hover:text-[#B8860B] transition-colors">Privacy Policy</a>
              <a href="#home" className="hover:text-[#B8860B] transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
