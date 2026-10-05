import { create } from 'zustand';

import type { Destination, ServiceCategoryId } from '../types';

interface RideState {
  selectedService: ServiceCategoryId;
  pickupLabel: string;
  destination: Destination | null;
  setSelectedService: (selectedService: ServiceCategoryId) => void;
  setDestination: (destination: Destination | null) => void;
}

export const useRideStore = create<RideState>((set) => ({
  selectedService: 'ride',
  pickupLabel: 'Current location · SoMa, SF',
  destination: null,
  setSelectedService: (selectedService) => set({ selectedService }),
  setDestination: (destination) => set({ destination }),
}));
