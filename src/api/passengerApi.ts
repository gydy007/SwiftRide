import type { Destination, PromoOffer, ServiceCategory, UserProfile } from '../types';

export interface PassengerApi {
  getCurrentUser(): Promise<UserProfile>;
  getServiceCategories(): Promise<ServiceCategory[]>;
  getRecentDestinations(): Promise<Destination[]>;
  getActivePromo(): Promise<PromoOffer>;
}
