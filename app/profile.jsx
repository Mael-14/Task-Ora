import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  const handleLanguage = () => {
    console.log('Open language selector');
    // Navigate to language selection screen
  };

  const handleAboutApp = () => {
    console.log('Open About App');
    // Navigate to about app screen
  };

  const handlePrivacyPolicy = () => {
    console.log('Open Privacy Policy');
    // Navigate to privacy policy screen
  };

  const handleTermsOfService = () => {
    console.log('Open Terms of Service');
    // Navigate to terms screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture and Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.profileImage}
            />
            <View style={styles.fingerprintOverlay}>
              <Ionicons name="finger-print" size={60} color="#00d4ff" />
            </View>
          </View>
          <Text style={styles.profileName}>Robert Mael</Text>
          <Text style={styles.profileEmail}>robertmael143@gmail.com</Text>
        </View>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>Settings</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#555', true: '#00d4ff' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Dark mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: '#555', true: '#00d4ff' }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleLanguage}
        >
          <Text style={styles.settingText}>Language</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* About us Section */}
        <Text style={styles.sectionTitle}>About us</Text>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleAboutApp}
        >
          <Text style={styles.settingText}>About App</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handlePrivacyPolicy}
        >
          <Text style={styles.settingText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleTermsOfService}
        >
          <Text style={styles.settingText}>Terms of service</Text>
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Version</Text>
          <Text style={styles.versionText}>1.0</Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home-outline" size={18} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/categories')}
        >
          <Ionicons name="grid-outline" size={18} color="#fff" />
          <Text style={styles.navLabel}>Category</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={18} color="#fff" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333',
  },
  fingerprintOverlay: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#999',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#555',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  versionText: {
    fontSize: 16,
    color: '#999',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#444',
    paddingVertical: 15,
    paddingBottom: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
});

