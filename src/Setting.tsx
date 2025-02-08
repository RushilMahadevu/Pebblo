import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ChevronRight, User, Bell, Shield, HelpCircle, LogOut, ArrowLeft } from 'lucide-react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SettingItemProps = {
  icon: any;
  title: string;
  onPress: () => void;
};

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const SettingItem: React.FC<SettingItemProps> = ({ icon: Icon, title, onPress }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingItemLeft}>
      <Icon size={22} color="#333" />
      <Text style={styles.settingItemText}>{title}</Text>
    </View>
    <ChevronRight size={20} color="#999" />
  </TouchableOpacity>
);

const Setting: React.FC<SettingsScreenProps> = ({ navigation }) => {
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
            onPress={() => {}} 
          />
          <SettingItem 
            icon={Bell} 
            title="Notifications" 
            onPress={() => {}} 
          />
          <SettingItem 
            icon={Shield} 
            title="Privacy" 
            onPress={() => {}} 
          />
          <SettingItem 
            icon={HelpCircle} 
            title="Help & Support" 
            onPress={() => {}} 
          />
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => {}}
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default Setting;
