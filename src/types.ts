export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  category: string;
  details?: string;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  title?: string;
  category: string;
}

export interface GalleryVideo {
  id: string;
  videoUrl: string;
  title?: string;
  thumbnailUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  avatarUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: any;
}

export interface SalonSettings {
  name: string;
  phone: string;
  whatsapp: string;
  address: string;
  email: string;
  description: string;
  hours: {
    [key: string]: string;
  };
}
