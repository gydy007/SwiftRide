export type ServiceCategoryId = 'ride' | 'comfort' | 'xl' | 'moto' | 'delivery';

export type IconFamily = 'ion' | 'materialCommunity';

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
  icon: string;
  iconFamily: IconFamily;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface Destination {
  id: string;
  title: string;
  address: string;
  coordinate: GeoPoint;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rating: number;
  city: string;
  avatarInitials: string;
}

export interface PromoOffer {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
}
