import type { PromoOffer, UserProfile } from '../types';

export const mockUser: UserProfile = {
  id: 'user_1',
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@email.com',
  phone: '+1 415 555 0198',
  rating: 4.9,
  city: 'San Francisco',
  avatarInitials: 'AM',
};

export const mockPromo: PromoOffer = {
  id: 'promo_weekend',
  eyebrow: 'WEEKEND DEAL',
  title: '20% off your next 3 rides',
  subtitle: 'Use code SWIFT20 before Sunday midnight.',
  ctaLabel: 'Claim offer',
};
