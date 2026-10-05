import { recentDestinations } from '../data/destinations';
import { serviceCategories } from '../data/services';
import { mockPromo, mockUser } from '../data/user';
import type { PassengerApi } from './passengerApi';

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const mockPassengerApi: PassengerApi = {
  async getCurrentUser() {
    await delay(80);
    return mockUser;
  },
  async getServiceCategories() {
    await delay(40);
    return serviceCategories;
  },
  async getRecentDestinations() {
    await delay(40);
    return recentDestinations;
  },
  async getActivePromo() {
    await delay(40);
    return mockPromo;
  },
};
