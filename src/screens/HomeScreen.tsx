import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GreetingHeader } from '../components/GreetingHeader';
import { LocationRow } from '../components/LocationRow';
import { PromoBanner } from '../components/PromoBanner';
import { SearchPill } from '../components/SearchPill';
import { ServiceCategoryRow } from '../components/ServiceCategoryRow';
import { recentDestinations } from '../data/destinations';
import { serviceCategories } from '../data/services';
import { mockPromo } from '../data/user';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { useRideStore } from '../store/rideStore';
import { useUserStore } from '../store/userStore';
import { colors, fonts, spacing } from '../theme';
import type { Destination } from '../types';

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const user = useUserStore((state) => state.user);
  const selectedService = useRideStore((state) => state.selectedService);
  const pickupLabel = useRideStore((state) => state.pickupLabel);
  const setSelectedService = useRideStore((state) => state.setSelectedService);
  const setDestination = useRideStore((state) => state.setDestination);

  const openRideRequest = (destination?: Destination) => {
    if (destination) {
      setDestination(destination);
    }
    navigation.navigate('RideRequest');
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.lg, paddingBottom: spacing.xxxl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <GreetingHeader
          onAvatarPress={() => navigation.navigate('Profile')}
          pickupLabel={pickupLabel}
          user={user}
        />

        <View style={styles.section}>
          <SearchPill onPress={() => openRideRequest()} />
        </View>

        <ServiceCategoryRow
          categories={serviceCategories}
          onSelect={setSelectedService}
          selectedId={selectedService}
        />

        <View style={styles.recentHeader}>
          <Text style={styles.sectionLabel}>RECENT DESTINATIONS</Text>
        </View>
        {recentDestinations.map((destination, index) => (
          <LocationRow
            destination={destination}
            key={destination.id}
            onPress={openRideRequest}
            showDivider={index < recentDestinations.length - 1}
          />
        ))}

        <View style={styles.banner}>
          <PromoBanner
            offer={mockPromo}
            onPress={() =>
              Alert.alert('Offer saved', `${mockPromo.ctaLabel} applied to your next rides.`)
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
  },
  section: {
    marginBottom: spacing.xxl,
    marginTop: spacing.xxl,
  },
  recentHeader: {
    marginBottom: spacing.sm,
    marginTop: spacing.xxl,
  },
  sectionLabel: {
    color: colors.textMuted,
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 0.8,
  },
  banner: {
    marginTop: spacing.xxl,
  },
});
