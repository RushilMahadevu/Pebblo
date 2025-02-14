import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Animated, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Mail, Chrome } from 'lucide-react-native';

const AuthScreen = () => {
  const navigation = useNavigation();

  const renderAuthButton = (icon: React.ReactNode, text: string, isPrimary: boolean, onPress?: () => void) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.authButton,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        pressed && styles.buttonPressed
      ]}
    >
      {icon}
      <Text style={[
        styles.buttonText,
        isPrimary ? styles.primaryButtonText : styles.secondaryButtonText
      ]}>
        {text}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Brand Section */}
        <View style={styles.brandSection}>
          <Image 
            source={require('../assets/splash-icon.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={styles.brandText}>Pebblo</Text>
            <Text style={styles.subtitle}>Micro challenges to help the world</Text>
        </View>

        {/* Auth Buttons Section */}
        <View style={styles.authSection}>
          {renderAuthButton(
            <Mail size={20} color="#E5E5E5" style={styles.buttonIcon} />,
            "Continue with Email",
            true,
            () => navigation.navigate('EmailLogin' as never)
          )}
          {renderAuthButton(
            <Chrome size={20} color="#E5E5E5" style={styles.buttonIcon} />,
            "Continue with Google",
            false
          )}
        </View>

        {/* Terms and Privacy Section */}
        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  brandSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  brandText: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 32,
  },
  authSection: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  authButton: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#1E1E1E',
    borderWidth: 0,
  },
  secondaryButton: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#E5E5E5',
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
  termsSection: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  termsText: {
    textAlign: 'center',
    color: '#999999',
    fontSize: 13,
  },
  linkText: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;
