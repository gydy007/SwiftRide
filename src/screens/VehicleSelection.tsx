import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { theme } from '../theme/theme';
import { MOCK_SERVICES } from '../data/mockData';

const { width, height } = Dimensions.get('window');

// Mock static coordinates for pickup and dropoff
const PICKUP_COORD = { latitude: 37.7749, longitude: -122.4194 };
const DROPOFF_COORD = { latitude: 37.7858, longitude: -122.4064 };

export const VehicleSelection: React.FC = () => {
  const navigation = useNavigation();
  const [selectedService, setSelectedService] = useState(MOCK_SERVICES[0].id);

  const handleRequestRide = () => {
    // navigation.navigate('TripTracking');
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (PICKUP_COORD.latitude + DROPOFF_COORD.latitude) / 2,
          longitude: (PICKUP_COORD.longitude + DROPOFF_COORD.longitude) / 2,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={PICKUP_COORD} title="Pickup">
          <View style={styles.pickupMarker}>
            <View style={styles.pickupDot} />
          </View>
        </Marker>
        <Marker coordinate={DROPOFF_COORD} title="Dropoff">
          <View style={styles.dropoffMarker}>
            <FontAwesome5 name="map-marker-alt" size={24} color={theme.colors.primary} />
          </View>
        </Marker>
        <Polyline
          coordinates={[PICKUP_COORD, DROPOFF_COORD]}
          strokeColor={theme.colors.primary}
          strokeWidth={3}
          lineDashPattern={[1]}
        />
      </MapView>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name="arrow-left" size={20} color={theme.colors.text} />
      </TouchableOpacity>

      {/* Bottom Sheet for Vehicle Selection */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Choose a ride</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.servicesList}>
          {MOCK_SERVICES.map((service, index) => {
            const isSelected = selectedService === service.id;
            const price = (12.5 + index * 5.25).toFixed(2);
            const eta = 3 + index * 2;

            return (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceRow,
                  isSelected && styles.serviceRowSelected,
                ]}
                onPress={() => setSelectedService(service.id)}
                activeOpacity={0.7}
              >
                <View style={styles.serviceIconContainer}>
                  <FontAwesome5 name={service.icon as any} size={24} color={theme.colors.text} />
                </View>
                <View style={styles.serviceInfo}>
                  <View style={styles.serviceTitleRow}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <FontAwesome5 name="user" size={10} color={theme.colors.textSecondary} style={{ marginLeft: 6, marginRight: 2 }} />
                    <Text style={styles.capacityText}>{4}</Text>
                  </View>
                  <Text style={styles.etaText}>{eta} min dropoff</Text>
                </View>
                <Text style={styles.priceText}>${price}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.paymentRow}>
            <FontAwesome5 name="cc-visa" size={20} color={theme.colors.primary} />
            <Text style={styles.paymentText}>•••• 4242</Text>
            <FontAwesome5 name="chevron-right" size={12} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.requestButton} onPress={handleRequestRide}>
            <Text style={styles.requestButtonText}>Request Ride</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  map: {
    width,
    height: height * 0.5,
  },
  pickupMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(75, 44, 224, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  dropoffMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: theme.spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.card,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    marginTop: -24, // overlap map
    ...theme.shadows.card,
    elevation: 10, // higher shadow for Android
  },
  sheetHeader: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  sheetTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  servicesList: {
    flex: 1,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  serviceRowSelected: {
    backgroundColor: 'rgba(75, 44, 224, 0.05)',
    borderColor: theme.colors.primary,
    borderWidth: 1, // subtle selection border
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  capacityText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  etaText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  priceText: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  footer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface,
    backgroundColor: theme.colors.background,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  paymentText: {
    flex: 1,
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  requestButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  requestButtonText: {
    ...theme.typography.h3,
    color: theme.colors.background,
  },
});
