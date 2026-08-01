import { Room, ServiceItem } from '../types';

export interface AmenityItem {
  id: string;
  label: string;
  iconName: 'Wifi' | 'Utensils' | 'TreePine' | 'Coffee' | 'Bike' | 'Car';
}

export interface SiteConfig {
  // --- GENERAL HOTEL INFORMATION ---
  hotelInfo: {
    name: string;
    subTitle: string;
    location: string;
    whatsappNumber: string;
    phones: string[];
    emails: string[];
    address: string;
    googleMapsUrl?: string;
    socials: {
      facebook: string;
      instagram: string;
      twitter: string;
      youtube: string;
    };
  };

  // --- NAVBAR SECTION ---
  navbar: {
    navLinks: Array<{ name: string; href: string }>;
    bookButtonText: string;
  };

  // --- HERO SECTION & SEARCH BAR ---
  hero: {
    eyebrowText: string;
    headingAccent: string;
    description: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    bgImage: string;
    placeholderBgImage?: string;
    roomOptions: Array<{ value: string; label: string }>;
    guestLimits: {
      maxAdults: number;
      maxChildren: number;
    };
  };

  // --- ABOUT / TRUSTED SECTION ---
  aboutSection: {
    eyebrow: string;
    title: string;
    description: string;
    quote: string;
    badgeText: string;
    amenities: AmenityItem[];
    collageImages: string[];
  };

  // --- ROOMS SECTION ---
  roomsSection: {
    eyebrow: string;
    title: string;
    description: string;
    categories: Array<{ key: string; label: string; count: number | null }>;
    rooms: Room[];
  };

  // --- SERVICES SECTION ---
  servicesSection: {
    eyebrow: string;
    title: string;
    description: string;
    videoCard: {
      bgImage: string;
      badgeText: string;
      title: string;
      subtitle: string;
      youtubeEmbedUrl: string;
    };
    services: ServiceItem[];
  };

  // --- FOOTER & PRE-FOOTER BANNER ---
  footer: {
    preFooterBanner: {
      title: string;
      titleAccent: string;
      description: string;
      buttonText: string;
      bgImage: string;
    };
    brandDescription: string;
    exploreLinks: Array<{ name: string; href: string }>;
    copyrightText: string;
    legalLinks: Array<{ name: string; href: string }>;
  };
}

export const siteConfig: SiteConfig = {
  // ==========================================
  // GENERAL HOTEL CONTACT & BRAND INFORMATION
  // ==========================================
  hotelInfo: {
    name: "NORPHEL RETREAT",
    subTitle: "PELLING",
    location: "Pelling, Sikkim",
    whatsappNumber: "919127504733",
    phones: ["+91 91275 04733", "+91 96099 11471"],
    emails: ["hotlenorphelpelling@gmail.com", "reservations.norphel@gmail.com"],
    address: "Pelling-Rimbi Road, near Udaan, Pelling City, Sikkim 737113.",
    googleMapsUrl: "https://maps.google.com/?q=NORPHEL%20RETREAT%20PELLING,%20PINE%20CREST,%20near%20UDAAN,%20LOWER,%20Pelling,%20Sikkim%20737113&ftid=0x39e6872a517cbfaf:0xe189ad5e34d355ee&entry=gps&shh=CAE&lucs=,94297699,94231188,94280568,47071704,94218641,100808654,94282134,100813469,94286869,100820247,100813009,100804975&g_st=iwb",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      youtube: "https://youtube.com",
    },
  },

  // ==========================================
  // NAVIGATION BAR
  // ==========================================
  navbar: {
    navLinks: [
      { name: "Home", href: "#home" },
      { name: "Rooms", href: "#rooms" },
      { name: "About Us", href: "#about" },
      { name: "Contact Us", href: "#contact" }
    ],
    bookButtonText: "Book Your Stay",
  },

  // ==========================================
  // HERO SECTION & BOOKING SEARCH BAR
  // ==========================================
  hero: {
    eyebrowText: "WELCOME TO",
    headingAccent: "Norphel Retreat",
    description:
      "A world where comfort, elegance, and tranquility come together to create unforgettable moments.",
    primaryCtaText: "Book Your Stay",
    secondaryCtaText: "Explore Rooms",
    bgImage: "/entrance.jpg",
    placeholderBgImage: "/entrance-placeholder.jpg",
    roomOptions: [
      { value: "1", label: "1 Room" },
      { value: "2", label: "2 Rooms" },
      { value: "3", label: "3 Rooms" },
      { value: "4", label: "4+ Rooms" },
    ],
    guestLimits: {
      maxAdults: 10,
      maxChildren: 6,
    },
  },

  // ==========================================
  // ABOUT US SECTION
  // ==========================================
  aboutSection: {
    eyebrow: "A Perfect Getaway",
    title: "Your Ideal Hotel Destination",
    description:
      "At Norphel Retreat, we believe every guest deserves an extraordinary experience.",
    quote:
      "Norphel Retreat is your ideal destination for relaxation, rejuvenation, and memorable experiences.",
    badgeText: "HORIZON PARK VALLEY • HORIZON PARK VALLEY •",
    amenities: [
      { id: "amenity-wifi", label: "High-Speed Wi-Fi", iconName: "Wifi" },
      { id: "amenity-restaurant", label: "Gourmet Restaurant", iconName: "Utensils" },
      { id: "amenity-rooms", label: "All View Rooms", iconName: "TreePine" },
      { id: "amenity-tea-coffee", label: "In-House Tea & Coffee", iconName: "Coffee" },
      { id: "amenity-kids", label: "Kids Play Area", iconName: "Bike" },
      { id: "amenity-parking", label: "Parking Area", iconName: "Car" },
    ],
    collageImages: [
      "/passage.jpg",
      "/stairway.jpg",
      "/curtain.jpg",
    ],
  },

  // ==========================================
  // ROOMS & SUITES SECTION
  // ==========================================
  roomsSection: {
    eyebrow: "Unrivaled Accommodations",
    title: "Elegant Rooms and Suites You'll Love",
    description:
      "Each room at Norphel Retreat is thoughtfully designed with contemporary aesthetics and comfort in mind, featuring plush bedding, premium toiletries, and modern entertainment systems.",
    categories: [
      { key: "all", label: "All Rooms", count: null },
      { key: "executive", label: "Executive", count: 1 },
      { key: "premium", label: "Premium", count: 1 },
      { key: "luxury", label: "Luxury", count: 1 },
    ],
    rooms: [
      {
        id: "room-1",
        name: "Mountain View",
        type: "executive",
        location: "Norphel Retreat",
        price: 1200,
        image: "/room1.jpg",
      },
      {
        id: "room-2",
        name: "Kanchanjunga Premium",
        type: "premium",
        location: "Norphel Retreat",
        price: 1600,
        image: "/room2.jpg",
      },
      {
        id: "room-3",
        name: "Kanchanjunga Luxury",
        type: "luxury",
        location: "Norphel Retreat",
        price: 2100,
        image: "/window.jpg",
      },
    ],
  },

  // ==========================================
  // SERVICES SECTION
  // ==========================================
  servicesSection: {
    eyebrow: "Why Guests Choose Norphel Retreat",
    title: "Your Holiday Partner",
    description:
      "Our Value lies in delivering warm hospitality, honest service, and consistent quality, ensuring every guest feels genuinely cared for, respected, and welcomed like family throughout their stay.",
    videoCard: {
      bgImage: "/stairway.jpg",
      badgeText: "Play Tour",
      title: "Norphel Welcome Experience",
      subtitle: "Step into Pelling's finest sanctuary",
      youtubeEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    },
    services: [
      {
        id: "service-1",
        title: "Luxury Accommodation",
        description: "Elegant rooms and suites designed for restful stays.",
        iconName: "Bed",
      },
      {
        id: "service-2",
        title: "Stunning Views",
        description:
          "Enjoy breathtaking panoramic views of the surrounding landscape from every corner of the resort.",
        iconName: "MountainSnow",
        isFeatured: true,
      },
      {
        id: "service-3",
        title: "Easy Booking",
        description:
          "Enjoy a seamless booking experience with our user-friendly reservation system.",
        iconName: "Sparkles",
      },
      {
        id: "service-4",
        title: "Flexible Packages",
        description:
          "Enjoy a range of flexible stay and event packages designed to fit every budget, occasion, and travel plan.",
        iconName: "Users",
      },
    ],
  },

  // ==========================================
  // FOOTER & PRE-FOOTER BANNER
  // ==========================================
  footer: {
    preFooterBanner: {
      title: "Discover Tranquility With",
      titleAccent: "Norphel Retreat",
      description:
        "Your ideal destination for relaxation, rejuvenation, and memorable experiences.",
      buttonText: "Book Your Stay",
      bgImage: "/front.jpg",
    },
    brandDescription:
      "A world where comfort, elegance, and tranquility come together to create unforgettable moments.",
    exploreLinks: [
      { name: "Home", href: "#home" },
      { name: "Rooms & Suites", href: "#rooms" },
      { name: "About", href: "#about" },
    ],
    copyrightText: "© 2026 Norphel Retreat. All rights reserved.",
    legalLinks: [
      { name: "Terms of Service", href: "#home" },
      { name: "Privacy Policy", href: "#home" },
    ],
  },
};
