import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Modal } from 'react-native';
import { Search, ArrowLeft, Leaf, Droplets, Zap, Radio, Timer, Award, SlidersHorizontal, Check, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

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
  difficulty: string;
  points: number;
}

interface DifficultyLevel {
  label: string;
  color: string;
}

const initialFilters = {
  duration: 'Any',
  points: 'Any',
  status: 'Any',
  difficulty: 'All',
  category: 'All'
};

const Explore: React.FC = () => {
  const navigation = useNavigation();
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState(initialFilters);

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
      difficulty: 'Easy',
      points: 10
    },
    {
      title: 'Save Water',
      description: 'Reduce shower time by 2 minutes',
      category: 'Water',
      duration: '5 mins',
      difficulty: 'Medium',
      points: 20
    },
    {
      title: 'Energy Saver',
      description: 'Unplug unused electronics for 1 hour',
      category: 'Energy',
      duration: '1 hour',
      difficulty: 'Hard',
      points: 50
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Nature':
        return { bg: '#E8F5E9', text: '#4CAF50' };
      case 'Water':
        return { bg: '#E3F2FD', text: '#2196F3' };
      case 'Energy':
        return { bg: '#FFF8E1', text: '#FFC107' };
      default:
        return { bg: '#E3F2FD', text: '#1976D2' };
    }
  };

  const renderChallengeCard = ({ title, description, category, duration, difficulty, points }: ChallengeCardProps) => {
    const categoryColors = getCategoryColor(category);
    
    return (
      <TouchableOpacity style={styles.challengeCard}>
        <View style={styles.challengeHeader}>
          <View style={styles.challengeTitleSection}>
            <Text style={styles.challengeTitle}>{title}</Text>
            <View style={[
              styles.difficultyBadge,
              {
                backgroundColor: difficulty === 'Easy' ? '#E8F5E9' : 
                               difficulty === 'Medium' ? '#FFF3E0' : 
                               '#FFEBEE'
              }
            ]}>
              <Text style={[
                styles.difficultyText,
                {
                  color: difficulty === 'Easy' ? '#4CAF50' : 
                         difficulty === 'Medium' ? '#FF9800' : 
                         '#F44336'
                }
              ]}>{difficulty}</Text>
            </View>
          </View>
          <View style={styles.pointsBadge}>
            <Award size={16} color="#FF9800" />
            <Text style={styles.pointsText}>+{points}</Text>
          </View>
        </View>

        <Text style={styles.challengeDescription}>{description}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Timer size={16} color="#666666" />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColors.bg }]}>
            <Text style={[styles.categoryBadgeText, { color: categoryColors.text }]}>{category}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFilterDropdown = () => (
    <Modal
      visible={showFilters}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {}} // disable closing on Android back button
    >
      <View style={styles.modalOverlay}> {/* Changed TouchableOpacity to View */}
        <View style={styles.filterDropdown}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterModalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)} style={styles.closeButton}>
              <X size={24} color="#333333" />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.filterScrollView}
            contentContainerStyle={styles.filterContentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.filterDivider} />
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
          </ScrollView>
          <TouchableOpacity style={styles.resetButton} onPress={() => setFilters(initialFilters)}>
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const getFilteredChallenges = () => {
    return challenges.filter(challenge => {
      // Difficulty
      if (filters.difficulty !== 'All' && challenge.difficulty !== filters.difficulty) {
        return false;
      }
      
      // Category
      if (filters.category !== 'All' && challenge.category !== filters.category) {
        return false;
      }

      // Duration
      if (filters.duration !== 'Any') {
        // Convert filter duration to minutes
        const filterDuration = parseInt(filters.duration.split(' ')[0]);
        const filterUnit = filters.duration.split(' ')[1];
        const filterMinutes = filterUnit === 'hour' ? filterDuration * 60 : filterDuration;

        // Convert challenge duration to minutes
        const challengeDuration = parseInt(challenge.duration.split(' ')[0]);
        const challengeUnit = challenge.duration.split(' ')[1];
        const challengeMinutes = challengeUnit === 'hour' ? challengeDuration * 60 : challengeDuration;

        // Compare durations in minutes
        if (challengeMinutes > filterMinutes) {
          return false;
        }
      }

      // Points
      if (filters.points !== 'Any') {
        const points = parseInt(filters.points.split('+')[0]);
        if (challenge.points < points) {
          return false;
        }
      }

      return true;
    });
  };

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
        {getFilteredChallenges().length > 0 ? (
          getFilteredChallenges().map((challenge, index) => (
            <View key={index}>
              {renderChallengeCard(challenge)}
            </View>
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No challenges found</Text>
            <Text style={styles.noResultsSubtext}>Try adjusting your filters</Text>
          </View>
        )}
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end', // Changed to slide up from bottom
  },
  filterDropdown: {
    flex: 0.9, // adjust as needed
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  filterScrollView: {  // newly added style
    flex: 1,
  },
  filterContentContainer: {
    paddingBottom: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterModalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  selectedOption: {
    backgroundColor: '#E3F2FD',
    borderColor: '#007AFF',
  },
  filterOptionText: {
    fontSize: 15,
    color: '#4A4A4A',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  filterDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 24,
  },
  resetButton: {
    marginTop: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
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
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 16,
    color: '#666666',
  },
});

export default Explore;
