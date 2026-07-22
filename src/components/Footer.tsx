import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface FooterProps {
  onBookClick: () => void;
}

export default function Footer({ onBookClick }: FooterProps) {
  const { footer, hotelInfo } = siteConfig;
  const { preFooterBanner } = footer;

  const socialIcons = [
    { icon: Facebook, href: hotelInfo.socials.facebook },
    { icon: Instagram, href: hotelInfo.socials.instagram },
    { icon: Twitter, href: hotelInfo.socials.twitter },
    { icon: Youtube, href: hotelInfo.socials.youtube },
  ];

  return (
    <footer className="relative bg-[#F8F8F8] pt-12">
      {/* Pre-Footer Banner Frame */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden min-h-[340px] flex items-center bg-slate-900 shadow-xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={preFooterBanner.bgImage}
              alt={`${preFooterBanner.titleAccent} lobby interior`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/60 to-black/20" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 w-full text-center px-6 sm:px-12 py-12 text-white">
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-4">
              {preFooterBanner.title}
              <span className="text-[#B8860B] font-playwrite block text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl tracking-wide mt-4 normal-case font-normal leading-relaxed">
                {preFooterBanner.titleAccent}
              </span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-gray-200/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              {preFooterBanner.description}
            </p>
            <button
              onClick={onBookClick}
              className="px-8 py-3.5 rounded-full bg-[#B8860B] hover:bg-[#9B7008] text-white font-sans font-bold tracking-wider uppercase transition-colors duration-300 shadow-lg cursor-pointer text-sm"
            >
              {preFooterBanner.buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Block */}
      <div className="bg-[#F3ECE0] text-[#333333] pt-16 pb-12 rounded-t-[40px] border-t border-amber-800/10 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 pb-12">

            {/* Left Column: Brand & Socials */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              {/* Logo */}
              <div className="flex items-baseline space-x-1">
                <span className="font-sans text-sm sm:text-xl font-bold tracking-wider text-[#333333] leading-tight">
                  {hotelInfo.name.split(' ').map((word, idx) => (
                    <React.Fragment key={idx}>
                      {word}
                      {idx === 0 && <br />}
                    </React.Fragment>
                  ))}
                  <span className="h-2 w-2 rounded-full bg-[#B8860B] inline-block ml-1 mb-0.5"></span>
                </span>
              </div>

              <p className="font-sans text-sm text-[#666666] leading-relaxed">
                {footer.brandDescription}
              </p>

              {/* Social Icons */}
              <div className="flex items-center space-x-3.5 pt-4">
                {socialIcons.map((social, i) => (
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

            {/* Explore List */}
            <div className="lg:col-span-3 lg:pl-12">
              <h4 className="font-serif text-lg font-bold text-[#333333] mb-5 tracking-wide">
                Explore
              </h4>
              <ul className="space-y-3.5">
                {footer.exploreLinks.map((item, i) => (
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

            {/* Contacts */}
            <div id="contact" className="lg:col-span-4 space-y-5 lg:pl-0">
              <h4 className="font-serif text-lg font-bold text-[#333333] mb-5 tracking-wide">
                Get in touch
              </h4>
              <ul className="space-y-4">
                {/* Address */}
                <li className="text-sm text-[#666666]">
                  <a
                    href={
                      hotelInfo.googleMapsUrl ||
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${hotelInfo.name} ${hotelInfo.address}`
                      )}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start space-x-3 hover:text-[#B8860B] transition-colors cursor-pointer"
                  >
                    <MapPin className="h-5 w-5 text-[#B8860B] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="font-sans leading-relaxed underline">
                      {hotelInfo.address}
                    </span>
                  </a>
                </li>

                {/* Email */}
                <li className="flex items-start space-x-3 text-sm text-[#666666]">
                  <Mail className="h-5 w-5 text-[#B8860B] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col space-y-1">
                    {hotelInfo.emails.map((email, idx) => (
                      <a
                        key={idx}
                        href={`mailto:${email}`}
                        className="font-sans hover:text-[#B8860B] transition-colors whitespace-nowrap"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </li>

                {/* Phone */}
                <li className="flex items-start space-x-3 text-sm text-[#666666]">
                  <Phone className="h-5 w-5 text-[#B8860B] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col space-y-1">
                    {hotelInfo.phones.map((phone, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="font-sans hover:text-[#B8860B] transition-colors leading-relaxed"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright Divider */}
          <div className="border-t border-[#D5C6AC]/60 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#666666] font-sans font-semibold">
            <p>{footer.copyrightText}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {footer.legalLinks.map((link, idx) => (
                <a key={idx} href={link.href} className="hover:text-[#B8860B] transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
