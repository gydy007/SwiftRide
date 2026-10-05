import type { ServiceCategory } from '../types';

export const serviceCategories: ServiceCategory[] = [
  { id: 'ride', label: 'Ride', icon: 'car-sport', iconFamily: 'ion' },
  { id: 'comfort', label: 'Comfort', icon: 'car-outline', iconFamily: 'ion' },
  { id: 'xl', label: 'XL', icon: 'car-estate', iconFamily: 'materialCommunity' },
  { id: 'moto', label: 'Moto', icon: 'motorbike', iconFamily: 'materialCommunity' },
  { id: 'delivery', label: 'Delivery', icon: 'cube-outline', iconFamily: 'ion' },
];
