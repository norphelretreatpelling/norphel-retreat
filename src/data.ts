import { Room, Offer, ServiceItem } from './types';

export const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Rooms', href: '#rooms' },
  { name: 'About Us', href: '#about' },
  { name: 'Contact Us', href: '#contact' }
];

export const corporateLogos = [
  { name: 'BA', label: 'BA', color: 'bg-red-800 text-white font-bold text-xs' },
  { name: 'BYC', label: 'BYC', color: 'bg-blue-800 text-white font-bold text-xs' },
  { name: 'K', label: 'K', color: 'bg-indigo-900 text-yellow-400 font-serif font-black text-sm' },
  { name: 'Delta', label: '▲', color: 'bg-[#2C3E50] text-red-500 font-sans font-bold text-xs' }
];

export const statsData = [
  { id: 'stat-1', value: '54+', label: 'Luxury Rooms', isDark: false },
  { id: 'stat-2', value: '15+', label: 'Years of Hospitality', isDark: true },
  { id: 'stat-3', value: '2+', label: 'Signature Restaurants', isDark: false },
  { id: 'stat-4', value: '98%', label: 'Guest satisfaction', isDark: false }
];

export const collageImages = [
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80', // elegant room interior
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80', // luxurious pool side
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80'  // fine dining details
];

export const roomCategories = [
  { key: 'all', label: 'All Rooms', count: null },
  { key: 'executive', label: 'Executive', count: 1 },
  { key: 'premium', label: 'Premium', count: 1 },
  { key: 'luxury', label: 'Luxury', count: 1 }
];

export const roomsData: Room[] = [
  {
    id: 'room-1',
    name: 'Mountain View',
    type: 'executive',
    location: 'Norphel Retreat',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'room-2',
    name: 'Kanchanjunga Premium',
    type: 'premium',
    location: 'Norphel Retreat',
    price: 1600,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'room-3',
    name: 'Kanchanjunga Luxury',
    type: 'luxury',
    location: 'Norphel Retreat',
    price: 2100,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'service-1',
    title: 'Luxury Accommodation',
    description: 'Elegant rooms and suites designed for restful stays.',
    iconName: 'Bed'
  },
  {
    id: 'service-2',
    title: 'Stunning Views',
    description: 'Enjoy breathtaking panoramic views of the surrounding landscape from every corner of the resort.',
    iconName: 'MountainSnow',
    isFeatured: true
  },
  {
    id: 'service-3',
    title: 'Easy Booking',
    description: 'Enjoy a seamless booking experience with our user-friendly reservation system.',
    iconName: 'Sparkles'
  },
  {
    id: 'service-4',
    title: 'Flexible Packages',
    description: 'Enjoy a range of flexible stay and event packages designed to fit every budget, occasion, and travel plan.',
    iconName: 'Users'
  }
];