import type { Destination } from '../types';

export const recentDestinations: Destination[] = [
  {
    id: 'dest_home',
    title: 'Home',
    address: '245 Valencia St, Mission District',
    coordinate: { latitude: 37.7599, longitude: -122.421 },
  },
  {
    id: 'dest_work',
    title: 'Work',
    address: '1 Market St, Financial District',
    coordinate: { latitude: 37.7936, longitude: -122.3965 },
  },
  {
    id: 'dest_airport',
    title: 'SFO Airport',
    address: 'San Francisco International Airport',
    coordinate: { latitude: 37.6213, longitude: -122.379 },
  },
];
