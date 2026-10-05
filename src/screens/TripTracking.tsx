import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { theme } from '../theme/theme';

const { width, height } = Dimensions.get('window');

const PICKUP_COORD = { latitude: 37.7749, longitude: -122.4194 };
const DROPOFF_COORD = { latitude: 37.7858, longitude: -122.4064 };

export const TripTracking: React.FC = () => {
  const navigation = useNavigation();
  const [driverLocation, setDriverLocation] = useState({
    latitude: 37.77,
    longitude: -122.42,
  });

  // Mock driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => ({
        latitude: prev.latitude + (PICKUP_COORD.latitude - prev.latitude) * 0.1,
        longitude: prev.longitude + (PICKUP_COORD.longitude - prev.longitude) * 0.1,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCancel = () => {
    navigation.navigate('Home' as never);
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: PICKUP_COORD.latitude,
          longitude: PICKUP_COORD.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker coordinate={PICKUP_COORD} title="Pickup">
          <View style={styles.pickupMarker}>
            <View style={styles.pickupDot} />
          </View>
        </Marker>
        
        {/* Driver Marker */}
        <Marker coordinate={driverLocation} title="Driver">
          <View style={styles.driverMarker}>
            <FontAwesome5 name="car-side" size={20} color={theme.colors.primary} />
          </View>
        </Marker>
      </MapView>

      {/* ETA Banner */}
      <View style={styles.etaBanner}>
        <Text style={styles.etaText}>Arriving in 3 min</Text>
      </View>

      {/* Driver Info Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.driverInfoRow}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?u=driver123' }}
            style={styles.driverImage}
          />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>Michael</Text>
            <View style={styles.ratingRow}>
              <FontAwesome5 name="star" solid size={12} color="#FFD700" />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
          </View>
          <View style={styles.carDetails}>
            <Text style={styles.plateNumber}>ABC 123</Text>
            <Text style={styles.carModel}>Toyota Camry</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome5 name="comment" size={20} color={theme.colors.primary} />
            <Text style={styles.iconButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome5 name="phone" size={20} color={theme.colors.primary} />
            <Text style={styles.iconButtonText}>Call</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel Ride</Text>
        </TouchableOpacity>
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
    height: height * 0.7,
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
  driverMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.card,
  },
  etaBanner: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.pill,
    ...theme.shadows.card,
  },
  etaText: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    marginTop: -24,
    padding: theme.spacing.lg,
    ...theme.shadows.card,
    elevation: 10,
  },
  driverInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.surface,
  },
  driverDetails: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  driverName: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  carDetails: {
    alignItems: 'flex-end',
  },
  plateNumber: {
    ...theme.typography.h3,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  carModel: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
    paddingBottom: theme.spacing.lg,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary,
    marginTop: 8,
  },
  cancelButton: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...theme.typography.h3,
    color: theme.colors.text, // Could be red
  },
});
