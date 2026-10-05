import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../theme/theme';
import { ServiceCategoryCard } from '../components/ServiceCategoryCard';
import { LocationRow } from '../components/LocationRow';
import { PromoBanner } from '../components/PromoBanner';
import { MOCK_USER, MOCK_SERVICES, MOCK_RECENT_DESTINATIONS } from '../data/mockData';

export const Home: React.FC = () => {
  const navigation = useNavigation();
  const [selectedService, setSelectedService] = useState<string>(MOCK_SERVICES[0].id);

  const handleSearchPress = () => {
    // navigation.navigate('RideRequest');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, {MOCK_USER.name}</Text>
            <Text style={styles.subGreeting}>Where are you going today?</Text>
          </View>
          <Image source={{ uri: MOCK_USER.profileImage }} style={styles.profileImage} />
        </View>

        {/* Search Pill */}
        <TouchableOpacity style={styles.searchPill} onPress={handleSearchPress} activeOpacity={0.8}>
          <FontAwesome5 name="search" size={20} color={theme.colors.primary} />
          <Text style={styles.searchText}>Where to?</Text>
          <View style={styles.timeTag}>
            <FontAwesome5 name="clock" size={12} color={theme.colors.text} style={{ marginRight: 4 }} />
            <Text style={styles.timeText}>Now</Text>
            <FontAwesome5 name="chevron-down" size={10} color={theme.colors.text} style={{ marginLeft: 4 }} />
          </View>
        </TouchableOpacity>

        {/* Services Row */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MOCK_SERVICES.map((service) => (
              <ServiceCategoryCard
                key={service.id}
                title={service.title}
                icon={service.icon}
                type={service.type}
                isSelected={selectedService === service.id}
                onPress={() => setSelectedService(service.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Promo Banner */}
        <PromoBanner />

        {/* Recent Destinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent</Text>
          {MOCK_RECENT_DESTINATIONS.map((dest) => (
            <LocationRow
              key={dest.id}
              title={dest.title}
              address={dest.address}
              icon={dest.icon}
              onPress={handleSearchPress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  subGreeting: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surface,
  },
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.pill,
    marginBottom: theme.spacing.lg,
  },
  searchText: {
    ...theme.typography.h3,
    color: theme.colors.textSecondary,
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.pill,
    ...theme.shadows.card,
  },
  timeText: {
    ...theme.typography.label,
    color: theme.colors.text,
    textTransform: 'none',
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
});
