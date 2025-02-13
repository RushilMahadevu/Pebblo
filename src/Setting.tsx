import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ChevronRight, User, Bell, Shield, HelpCircle, LogOut, ArrowLeft } from 'lucide-react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from './lib/supabase';

type SettingItemProps = {
  icon: any;
  title: string;
  onPress: () => void;
};

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const SettingItem: React.FC<SettingItemProps> = ({ icon: Icon, title, onPress }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.settingItemLeft}>
      <View style={styles.iconContainer}>
        <Icon size={24} color="#3E3E3E" />
      </View>
      <Text style={styles.settingItemText}>{title}</Text>
    </View>
    <ChevronRight size={20} color="#999" />
  </TouchableOpacity>
);

const Setting: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      // The session change will automatically trigger navigation via App.tsx
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
        
        <View style={styles.section}>
          <SettingItem 
            icon={User} 
            title="Account" 
            onPress={() => navigation.navigate('AccountSettings')} 
          />
          <SettingItem 
            icon={Bell} 
            title="Notifications" 
            onPress={() => navigation.navigate('NotificationSettings')} 
          />
          <SettingItem 
            icon={Shield} 
            title="Privacy" 
            onPress={() => navigation.navigate('PrivacySettings')} 
          />
          <SettingItem 
            icon={HelpCircle} 
            title="Help & Support" 
            onPress={() => navigation.navigate('HelpSupport')} 
          />
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333333',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: -8, // Reduce gap between header and items
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  settingItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default Setting;
