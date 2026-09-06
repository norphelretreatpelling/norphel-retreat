export interface Room {
  id: string;
  name: string;
  type: 'deluxe' | 'executive' | 'grand';
  location: string;
  price: number;
  image: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  price: number;
  validity: string;
  image: string;
  type: 'large' | 'small';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Bed' | 'Utensils' | 'Sparkles' | 'Users' | 'MountainSnow';
  isFeatured?: boolean;
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  rooms: string;
  adults: string;
  children: string;
}
