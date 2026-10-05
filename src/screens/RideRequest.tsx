import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { MOCK_RECENT_DESTINATIONS } from '../data/mockData';
import { LocationRow } from '../components/LocationRow';

export const RideRequest: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDestinationSelect = (destination: any) => {
    // Navigate to MapView screen with selected destination
    // navigation.navigate('VehicleSelection', { destination });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header / Search Area */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <View style={styles.inputWrapper}>
              <View style={styles.dot} />
              <TextInput
                style={styles.input}
                placeholder="Current Location"
                value="123 Main St"
                editable={false}
              />
            </View>
            <View style={styles.connector} />
            <View style={styles.inputWrapper}>
              <View style={styles.square} />
              <TextInput
                style={[styles.input, styles.activeInput]}
                placeholder="Where to?"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>
          </View>
        </View>

        {/* Suggestions List */}
        <FlatList
          data={MOCK_RECENT_DESTINATIONS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <LocationRow
              title={item.title}
              address={item.address}
              icon={item.icon}
              onPress={() => handleDestinationSelect(item)}
            />
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    ...theme.shadows.card,
    zIndex: 1,
  },
  backButton: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  searchContainer: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    marginBottom: theme.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.md,
  },
  square: {
    width: 8,
    height: 8,
    backgroundColor: theme.colors.text,
    marginRight: theme.spacing.md,
  },
  connector: {
    position: 'absolute',
    left: 20,
    top: 36,
    width: 2,
    height: 24,
    backgroundColor: theme.colors.border,
    zIndex: -1,
  },
  input: {
    flex: 1,
    ...theme.typography.bodyLarge,
    color: theme.colors.textSecondary,
  },
  activeInput: {
    color: theme.colors.text,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
});
