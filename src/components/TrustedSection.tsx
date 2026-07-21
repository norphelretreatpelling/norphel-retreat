import { collageImages } from '../data';
import { ArrowUpRight, Wifi, Utensils, TreePine, Coffee, Bike, Car } from 'lucide-react';

const amenities = [
  {
    id: 'amenity-wifi',
    label: 'High-Speed Wi-Fi',
    icon: Wifi,
  },
  {
    id: 'amenity-restaurant',
    label: 'Gourmet Restaurant',
    icon: Utensils,
  },
  {
    id: 'amenity-rooms',
    label: 'All View Rooms',
    icon: TreePine,
  },
  {
    id: 'amenity-tea-coffee',
    label: 'In-House Tea & Coffee',
    icon: Coffee,
  },
  {
    id: 'amenity-kids',
    label: 'Kids Play Area',
    icon: Bike,
  },
  {
    id: 'amenity-parking',
    label: 'Parking Area',
    icon: Car,
  },
];

export default function TrustedSection() {
  return (
    <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Description side-by-side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        <div className="lg:col-span-6">
          <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.2em] text-[#B8860B] uppercase block mb-3">
            A Perfect Getaway
          </span>
          <h2 className="font-roboto text-3xl sm:text-4xl md:text-5xl font-semibold text-[#333333] tracking-wide leading-tight max-w-lg">
            Your Ideal Hotel Destination
          </h2>
        </div>
        <div className="lg:col-span-6 lg:pt-6 space-y-6">
          <p className="font-sans text-[#666666] text-base sm:text-lg leading-relaxed max-w-xl">
            At Sila Hotel and Resort, we believe every guest deserves an extraordinary experience.
          </p>
          <div className="flex items-stretch gap-4">
            <div className="w-1 bg-[#B8860B] shrink-0" style={{ minHeight: '2rem' }}></div>
            <p className="font-sans text-[#666666] text-base sm:text-lg leading-relaxed max-w-xl italic">
              Sila is your ideal destination for relaxation, rejuvenation, and memorable experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Amenities Grid (6 Cards from Screenshot) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {amenities.map((amenity) => {
            const IconComponent = amenity.icon;
            return (
              <div
                key={amenity.id}
                className="flex items-center gap-5 p-5 bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100/50 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1"
              >
                {/* Icon Wrapper */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] bg-white border border-gray-100/80 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex items-center justify-center shrink-0">
                  <IconComponent className="h-6 w-6 text-[#B8860B]" />
                </div>
                {/* Amenity Label */}
                <span className="font-sans text-base sm:text-[17px] font-semibold text-[#333333] tracking-wide">
                  {amenity.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Vertical Collage with Rotating Badge */}
        <div className="lg:col-span-6 flex flex-col sm:flex-row gap-6 items-center justify-center">
          {/* Collage Column 1: A single larger room photo */}
          <div className="w-full sm:w-1/2 rounded-[24px] overflow-hidden shadow-md h-[420px]">
            <img
              src={collageImages[0]}
              alt="Luxury room view"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Collage Column 2: Stack of 2 smaller photos with floating rotating badge */}
          <div className="w-full sm:w-1/2 flex flex-col gap-6 relative">
            <div className="rounded-[24px] overflow-hidden shadow-md h-[200px]">
              <img
                src={collageImages[1]}
                alt="Retreat poolside"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="rounded-[24px] overflow-hidden shadow-md h-[194px]">
              <img
                src={collageImages[2]}
                alt="Exquisite lounge area"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Rotating Badge positioned over collage border */}
            <div className="absolute top-1/2 left-0 sm:-left-12 -translate-y-1/2 z-10 flex items-center justify-center">
              <div className="relative w-28 h-28 rounded-full bg-[#2C3E50] shadow-xl flex items-center justify-center group overflow-hidden border border-white/20">
                {/* SVG curved text */}
                <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <path
                    id="badgeCirclePath"
                    d="M 50, 50 m -34, 0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
                    fill="none"
                  />
                  <text fontFamily="Plus Jakarta Sans" fontSize="7.2" fontWeight="bold" fill="#FFFFFF" letterSpacing="1.2">
                    <textPath href="#badgeCirclePath" startOffset="0%">
                      HORIZON PARK VALLEY • HORIZON PARK VALLEY •
                    </textPath>
                  </text>
                </svg>
                {/* Center Arrow Icon */}
                <div className="relative w-12 h-12 rounded-full bg-[#B8860B] text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
