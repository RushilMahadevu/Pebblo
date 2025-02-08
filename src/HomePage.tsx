import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types/navigation';

const HomePage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animatable.View 
        animation="fadeIn" 
        duration={1000} 
        style={styles.header}
      >
        <Animatable.Text 
          animation="fadeIn" 
          delay={500} 
          style={styles.welcomeText}
        >
          Welcome, 👋
        </Animatable.Text>
        <Animatable.Text 
          animation="fadeIn" 
          delay={1250} 
          style={styles.subText}
        >
          Ready to make a difference today?
        </Animatable.Text>
      </Animatable.View>
      
      {/* Button */}
      <Animatable.View 
        animation="fadeIn" 
        delay={2000}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.mainButton}>Get Started</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    fontFamily: "'Satoshi', sans-serif",
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: "'Satoshi', sans-serif",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: 'gray',
    fontFamily: "'Satoshi', sans-serif",
    marginBottom: 10,
  },
  mainButton: {
    backgroundColor: '#111111',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: "'Satoshi', sans-serif",
  },
});
export default HomePage;
