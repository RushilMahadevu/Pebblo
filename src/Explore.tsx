import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Smile, Trees, Heart, Globe, LucideIcon, ArrowLeft } from "lucide-react-native";

type CategoryType = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

interface ExploreProps {
  navigation: NavigationProp<ParamListBase>;
}

const CHALLENGE_CATEGORIES: CategoryType[] = [
  {
    id: 'personal-growth',
    title: "Personal Growth",
    Icon: Smile,
    description: "Build habits and grow every day"
  },
  {
    id: 'environmental',
    title: "Environmental Action",
    Icon: Trees,
    description: "Make a positive impact on nature"
  },
  {
    id: 'kindness',
    title: "Kindness & Relationships",
    Icon: Heart,
    description: "Strengthen bonds and spread love"
  },
  {
    id: 'global',
    title: "Global Impact",
    Icon: Globe,
    description: "Contribute to worldwide causes"
  },
];

const NavigationHeader: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <View style={styles.navigationHeader}>
    <View style={styles.navigationLeft}>
      <TouchableOpacity 
        onPress={onBack}
        style={styles.backButton}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
      >
        <ArrowLeft color="#333333" size={24} />
      </TouchableOpacity>
      <Text style={styles.navigationTitle}>Explore</Text>
    </View>
  </View>
);

const CategoryCard: React.FC<{
  category: CategoryType;
  onPress: () => void;
}> = ({ category, onPress }) => {
  const { Icon, title, description } = category;
  
  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Icon color="#333333" size={24} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ExploreChallenges: React.FC<ExploreProps> = ({ navigation }) => {
  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('CategoryDetails', { categoryId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>
            Find a challenge that inspires you today
          </Text>
        </View>

        {/* Categories List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        >
          {CHALLENGE_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={() => handleCategoryPress(category.id)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  navigationHeader: {
    paddingHorizontal: 8,
    height: 56,
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
  },
  navigationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },
  categoriesList: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
});

export default ExploreChallenges;