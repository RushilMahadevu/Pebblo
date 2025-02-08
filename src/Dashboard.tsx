import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from './lib/supabase';
import { clearCredentials } from './utils/storage';

const Dashboard = () => {
  const handleSignOut = async () => {
    try {
      await clearCredentials(); // Clear saved credentials
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const categories = [
    { emoji: "🌱", title: "Personal Growth", description: "Small steps for self-improvement" },
    { emoji: "🌍", title: "Environmental Action", description: "Make a difference for the planet" },
    { emoji: "🤝", title: "Kindness Acts", description: "Spread positivity and kindness" },
    { emoji: "🏋️", title: "Health & Fitness", description: "Focus on your well-being" },
    { emoji: "🎨", title: "Creative Pursuits", description: "Explore your artistic side" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Explore challenges by category</Text>
        </View>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Categories List */}
      <ScrollView>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Text style={styles.cardEmoji}>{category.emoji}</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{category.title}</Text>
              <Text style={styles.cardDescription}>{category.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background
    padding: 20,
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333333", // Dark gray
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666666", // Lighter gray
    marginTop: 5,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F3F4F6", // Light gray for cards
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardEmoji: {
    fontSize: 32,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666666",
    marginTop: 5,
  },
  signOutButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  signOutText: {
    color: '#ff3b30',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Dashboard;
