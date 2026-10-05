import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, theme } from '../theme';
import type { MainTabParamList } from '../navigation/types';

const tabs: {
  name: keyof MainTabParamList;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
}[] = [
  { name: 'Home', label: 'Home', icon: 'home-outline', iconFocused: 'home' },
  { name: 'Activity', label: 'Activity', icon: 'time-outline', iconFocused: 'time' },
  { name: 'Wallet', label: 'Wallet', icon: 'wallet-outline', iconFocused: 'wallet' },
  { name: 'Profile', label: 'Profile', icon: 'person-outline', iconFocused: 'person' },
];

export function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {tabs.map((tab, index) => {
        const focused = state.index === index;
        const color = focused ? colors.primary : colors.textMuted;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            key={tab.name}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: state.routes[index]?.key ?? tab.name,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(tab.name);
              }
            }}
            style={styles.item}
          >
            <Ionicons color={color} name={focused ? tab.iconFocused : tab.icon} size={22} />
            <Text style={[styles.label, { color }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    paddingTop: 10,
    ...theme.shadow.tab,
  },
  item: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 11,
  },
});
