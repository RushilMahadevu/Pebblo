import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HomePage = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, 👋</Text>
        <Text style={styles.subText}>Ready to make a difference today?</Text>
      </View>
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
  },
  subText: {
    fontSize: 16,
    color: 'gray',
    fontFamily: "'Satoshi', sans-serif",
  },
});
export default HomePage;
