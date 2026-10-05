import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabBar } from '../components/BottomTabBar';
import { ActivityScreen } from '../screens/ActivityScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { WalletScreen } from '../screens/WalletScreen';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen component={HomeScreen} name="Home" />
      <Tab.Screen component={ActivityScreen} name="Activity" />
      <Tab.Screen component={WalletScreen} name="Wallet" />
      <Tab.Screen component={ProfileScreen} name="Profile" />
    </Tab.Navigator>
  );
}
