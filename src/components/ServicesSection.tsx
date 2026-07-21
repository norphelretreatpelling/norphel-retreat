import { useState } from 'react';
import { Bed, MountainSnow, Sparkles, Users, Play, X, Compass, ExternalLink } from 'lucide-react';
import { servicesData } from '../data';

export default function ServicesSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Helper to map icon name to Lucide Component
  const renderIcon = (iconName: string, isFeatured?: boolean) => {
    const className = `h-6 w-6 ${isFeatured ? 'text-[#B8860B]' : 'text-[#B8860B]'}`;
    switch (iconName) {
      case 'Bed':
        return <Bed className={className} />;
      case 'MountainSnow':
        return <MountainSnow className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Users':
        return <Users className={className} />;
      default:
        return <Compass className={className} />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-[#B8860B] uppercase block mb-3">
            Why Guests Choose Norphel Retreat
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333] mb-4">
            Your Holiday Partner
          </h2>
          <p className="font-sans text-[#666666] text-sm sm:text-base leading-relaxed">
            Our Value lies in delivering warm hospitality, honest service, and consistent quality, ensuring every guest feels genuinely cared for, respected, and welcomed like family throughout their stay.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Full vertical image block with video play overlay */}
          <div className="lg:col-span-4 relative rounded-[32px] overflow-hidden min-h-[380px] lg:min-h-auto shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
              alt="Lobby receptionist and guests checking in"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/25 transition-all duration-300" />
            
            {/* Play Button & Call to Action */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 z-10 text-white">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider self-start border border-white/20">
                Play Tour
              </span>
              
              {/* Play Button Icon */}
              <div className="self-center">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="h-16 w-16 rounded-full bg-white text-[#B8860B] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group cursor-pointer"
                >
                  {/* Pulsing visual wave */}
                  <span className="absolute inset-0 rounded-full bg-white/40 animate-ping -z-10" />
                  <Play className="h-6 w-6 fill-[#B8860B] ml-1" />
                </button>
              </div>

              {/* Lobby Greeting Text */}
              <div className="text-left">
                <h3 className="font-serif text-lg font-semibold tracking-wide mb-1">
                  Norphel Welcome Experience
                </h3>
                <p className="text-xs text-gray-200">
                  Step into Dhaka's finest sanctuary
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Grid of 4 Service Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.map((service) => {
              const isDark = service.isFeatured;
              return (
                <div
                  key={service.id}
                  className={`p-8 rounded-[28px] border flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#2C3E50] border-[#2C3E50] text-white'
                      : 'bg-[#F8F8F8] border-gray-100/80 text-[#333333]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Icon container */}
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                      isDark ? 'bg-white/10' : 'bg-[#B8860B]/10'
                    }`}>
                      {renderIcon(service.iconName, isDark)}
                    </div>

                    {/* Service Title */}
                    <h3 className={`font-serif text-xl font-bold tracking-wide ${
                      isDark ? 'text-white' : 'text-[#333333]'
                    }`}>
                      {service.title}
                    </h3>

                    {/* Service Description */}
                    <p className={`font-sans text-sm leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-[#666666]'
                    }`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Video Modal (Simulated / Youtube Embedding) */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative bg-black rounded-2xl w-full max-w-4xl aspect-video overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white h-10 w-10 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            {/* Embed Video */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Hospitality Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
