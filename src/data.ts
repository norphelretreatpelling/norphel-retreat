import { siteConfig } from './config/siteConfig';

export const navigationLinks = siteConfig.navbar.navLinks;
export const statsData = [
  { id: 'stat-1', value: '54+', label: 'Luxury Rooms', isDark: false },
  { id: 'stat-2', value: '15+', label: 'Years of Hospitality', isDark: true },
  { id: 'stat-3', value: '2+', label: 'Signature Restaurants', isDark: false },
  { id: 'stat-4', value: '98%', label: 'Guest satisfaction', isDark: false }
];

export const collageImages = siteConfig.aboutSection.collageImages;
export const roomCategories = siteConfig.roomsSection.categories;
export const roomsData = siteConfig.roomsSection.rooms;
export const servicesData = siteConfig.servicesSection.services;