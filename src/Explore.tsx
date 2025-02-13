import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Modal } from 'react-native';
import { Search, ArrowLeft, Leaf, Droplets, Zap, Radio, Timer, Award, SlidersHorizontal, Check } from 'lucide-react-native';
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
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState({
    duration: 'Any',
    points: 'Any',
    status: 'Any',
    difficulty: 'All',
    category: 'All'
  });

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

  const filterOptions = {
    duration: ['Any', '5 mins', '15 mins', '30 mins', '1 hour'],
    points: ['Any', '5+', '10+', '20+', '50+'],
    status: ['Any', 'Not Started', 'In Progress', 'Completed']
  };

  const renderCategory = ({ icon: Icon, label, color }: CategoryProps) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        filters.category === label && { backgroundColor: color + '20' },
      ]}
      onPress={() => setFilters({...filters, category: label})}
    >
      <Icon size={20} color={color} />
      <Text style={[styles.categoryText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderDifficultyFilter = ({ label, color }: DifficultyLevel) => (
    <TouchableOpacity 
      style={[
        styles.filterChip,
        filters.difficulty === label && { backgroundColor: color },
      ]}
      onPress={() => setFilters({...filters, difficulty: label})}
    >
      <Text style={[
        styles.filterText,
        filters.difficulty === label && styles.activeFilterText
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

  const renderFilterDropdown = () => (
    <Modal
      visible={showFilters}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowFilters(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1} 
        onPress={() => setShowFilters(false)}
      >
        <View style={styles.filterDropdown}>
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Difficulty</Text>
            <View style={styles.optionsContainer}>
              {difficulties.map((difficulty) => (
                <TouchableOpacity
                  key={difficulty.label}
                  style={[
                    styles.filterOption,
                    filters.difficulty === difficulty.label && {
                      backgroundColor: `${difficulty.color}20`
                    }
                  ]}
                  onPress={() => setFilters({...filters, difficulty: difficulty.label})}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.difficulty === difficulty.label && {
                      color: difficulty.color,
                      fontWeight: '600'
                    }
                  ]}>{difficulty.label}</Text>
                  {filters.difficulty === difficulty.label && (
                    <Check size={16} color={difficulty.color} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterDivider} />

          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Category</Text>
            <View style={styles.optionsContainer}>
              {categories.map(({label, color}) => (
                <TouchableOpacity
                  key={label}
                  style={[
                    styles.filterOption,
                    filters.category === label && {
                      backgroundColor: `${color}20`
                    }
                  ]}
                  onPress={() => setFilters({...filters, category: label})}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.category === label && {
                      color: color,
                      fontWeight: '600'
                    }
                  ]}>{label}</Text>
                  {filters.category === label && (
                    <Check size={16} color={color} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterDivider} />

          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Duration</Text>
            <View style={styles.optionsContainer}>
              {filterOptions.duration.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.filterOption,
                    filters.duration === option && styles.selectedOption
                  ]}
                  onPress={() => setFilters({...filters, duration: option})} // ... filters essentialy creates new changes
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.duration === option && styles.selectedOptionText
                  ]}>{option}</Text>
                  {filters.duration === option && (
                    <Check size={16} color="#007AFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterDivider} />

          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Points</Text>
            <View style={styles.optionsContainer}>
              {filterOptions.points.map((option) => ( // Map renders each option in the array
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.filterOption,
                    filters.points === option && styles.selectedOption
                  ]}
                  onPress={() => setFilters({...filters, points: option})}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.points === option && styles.selectedOptionText // If the filter is selected, change the text color
                  ]}>{option}</Text>
                  {filters.points === option && (
                    <Check size={16} color="#007AFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
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
        <View style={styles.searchInputWrapper}>
          <Search size={20} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search challenges..."
            placeholderTextColor="#666666"
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <SlidersHorizontal size={20} color="#666666" />
        </TouchableOpacity>
      </View>

      {renderFilterDropdown()}

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
    fontSize: 26,  // Increased from 24
    fontWeight: '700',
    marginLeft: 16,
    color: '#333333',
  },
  backButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    gap: 12,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16, // Increased from 12
    paddingHorizontal: 16,
    paddingVertical: 14, // Increased from 12
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
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
  filterButton: {
    backgroundColor: '#FFFFFF',
    padding: 14, // Increased from 12
    borderRadius: 16, // Increased from 12
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  challengesContainer: {
    padding: 20,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20, // Increased from 16
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
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
    fontSize: 20, // Increased from 18
    fontWeight: '700',
    color: '#1A1A1A', // Darker color
  },
  challengeDescription: {
    fontSize: 16, // Increased from 14
    color: '#4A4A4A', // Adjusted color
    marginBottom: 16, // Increased from 12
    lineHeight: 22,
  },
  difficultyBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10, // Increased from 8
    paddingVertical: 6, // Increased from 4
    borderRadius: 12,
    marginLeft: 10,
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
    paddingHorizontal: 10, // Increased from 8
    paddingVertical: 6, // Increased from 4
    borderRadius: 12,
    gap: 4,
  },
  pointsText: {
    color: '#FF9800',
    fontSize: 15, // Increased from 14
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
    paddingHorizontal: 14, // Increased from 12
    paddingVertical: 8, // Increased from 6
    borderRadius: 20,
    gap: 8,
  },
  metaText: {
    fontSize: 14, // Increased from 13
    color: '#666666',
    fontWeight: '500', // Added font weight
  },
  categoryBadge: {
    paddingHorizontal: 14, // Increased from 12
    paddingVertical: 8, // Increased from 6
    borderRadius: 20,
  },
  categoryBadgeText: {
    color: '#1976D2',
    fontSize: 14, // Increased from 13
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  filterDropdown: {
    backgroundColor: '#FFFFFF',
    marginTop: 80, // Adjusted to appear closer to search bar
    marginHorizontal: 20,
    borderRadius: 20, // Increased from 16
    padding: 20, // Increased from 16
    maxHeight: '80%', // Added to make scrollable if needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 18, // Increased from 16
    fontWeight: '700', // Increased from 600
    color: '#333333',
    marginBottom: 14,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 14, // Increased from 12
    paddingVertical: 10, // Increased from 8
    borderRadius: 20,
    gap: 8,
  },
  selectedOption: {
    backgroundColor: '#E3F2FD',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  filterDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 16,
  },
  // Category button styles
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },

  // Difficulty filter styles
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F5F5F5',
  },
  filterText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});

export default Explore;
