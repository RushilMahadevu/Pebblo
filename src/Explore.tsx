import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Search, ArrowLeft, Leaf, Droplets, Zap, Radio, Timer, Award } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface CategoryProps {
  icon: any;
  label: string;
  color: string;
}

interface ChallengeCardProps {
  title: string;
  description: string;
  category: string;
  duration: string;
}

interface DifficultyLevel {
  label: string;
  color: string;
}

const Explore: React.FC = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [activeDifficulty, setActiveDifficulty] = React.useState('All');

  const difficulties: DifficultyLevel[] = [
    { label: 'All', color: '#007AFF' },
    { label: 'Easy', color: '#4CAF50' },
    { label: 'Medium', color: '#FF9800' },
    { label: 'Hard', color: '#F44336' },
  ];

  const categories: CategoryProps[] = [
    { icon: Radio, label: 'All', color: '#4A90E2' },
    { icon: Leaf, label: 'Nature', color: '#4CAF50' },
    { icon: Droplets, label: 'Water', color: '#2196F3' },
    { icon: Zap, label: 'Energy', color: '#FFC107' },
  ];

  const challenges: ChallengeCardProps[] = [
    {
      title: 'Mindful Walking',
      description: 'Take a 15-minute nature walk without any devices',
      category: 'Nature',
      duration: '15 mins',
    },
    {
      title: 'Save Water',
      description: 'Reduce shower time by 2 minutes',
      category: 'Water',
      duration: '2 mins',
    },
    {
      title: 'Energy Saver',
      description: 'Unplug unused electronics for 1 hour',
      category: 'Energy',
      duration: '1 hour',
    },
  ];

  const renderCategory = ({ icon: Icon, label, color }: CategoryProps) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        activeCategory === label && { backgroundColor: color + '20' },
      ]}
      onPress={() => setActiveCategory(label)}
    >
      <Icon size={20} color={color} />
      <Text style={[styles.categoryText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderDifficultyFilter = ({ label, color }: DifficultyLevel) => (
    <TouchableOpacity 
      style={[
        styles.filterChip,
        activeDifficulty === label && { backgroundColor: color },
      ]}
      onPress={() => setActiveDifficulty(label)}
    >
      <Text style={[
        styles.filterText,
        activeDifficulty === label && styles.activeFilterText
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderChallengeCard = ({ title, description, category, duration }: ChallengeCardProps) => (
    <TouchableOpacity style={styles.challengeCard}>
      <View style={styles.challengeHeader}>
        <View style={styles.challengeTitleSection}>
          <Text style={styles.challengeTitle}>{title}</Text>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>Easy</Text>
          </View>
        </View>
        <View style={styles.pointsBadge}>
          <Award size={16} color="#FF9800" />
          <Text style={styles.pointsText}>+10</Text>
        </View>
      </View>

      <Text style={styles.challengeDescription}>{description}</Text>
      
      <View style={styles.metaContainer}>
        <View style={styles.metaItem}>
          <Timer size={16} color="#666666" />
          <Text style={styles.metaText}>{duration}</Text>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: '#E3F2FD' }]}>
          <Text style={styles.categoryBadgeText}>{category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Explore Challenges</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search challenges..."
          placeholderTextColor="#666666"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {difficulties.map((difficulty, index) => (
          <View key={index} style={styles.filterItem}>
            {renderDifficultyFilter(difficulty)}
          </View>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            {renderCategory(category)}
          </View>
        ))}
      </ScrollView>

      <ScrollView 
        style={styles.challengesContainer}
        showsVerticalScrollIndicator={false}
      >
        {challenges.map((challenge, index) => (
          <View key={index}>
            {renderChallengeCard(challenge)}
          </View>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  backButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    marginLeft: 8,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  filterItem: {
    marginRight: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  filterText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  categoriesContainer: {
    paddingHorizontal: 12,
  },
  categoryItem: {
    marginHorizontal: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  challengesContainer: {
    padding: 20,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeTitleSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    fontFamily: 'Inter-Bold',
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
  },
  difficultyBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  difficultyText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  pointsText: {
    color: '#FF9800',
    fontSize: 14,
    fontWeight: '700',
  },
  tagContainer: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Inter-Medium',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#666666',
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryBadgeText: {
    color: '#1976D2',
    fontSize: 13,
    fontWeight: '600',
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#4A90E220',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryTagText: {
    color: '#4A90E2',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});

export default Explore;
