import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, SafeAreaView } from "react-native";
import { Telescope, Earth, UsersRound, CheckCircle, Home, TrendingUp, Settings } from "lucide-react-native";
import type { LucideIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
}

interface FooterItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
}

const Dashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderActionCard = ({ icon: Icon, title }: ActionCardProps) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => {
        if (title === 'Explore Challenges') {
          navigation.navigate('Explore');
        }
      }}
    >
      <View style={styles.iconContainer}>
        <Icon color="#3E3E3E" size={28} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );

  const renderFooterItem = ({ icon: Icon, label, isActive }: FooterItemProps) => (
    <TouchableOpacity 
      style={[styles.footerItem, isActive && styles.footerItemActive]}
      onPress={() => {
        if (label === 'Settings') {
          navigation.navigate('Setting');
        } else if (label === 'Progress') {
          navigation.navigate('Progress');
        }
      }}
    >
      <Icon color={isActive ? "#007AFF" : "#999999"} size={24} />
      <Text style={[styles.footerText, isActive && styles.footerTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome Back 👋</Text>
          <Text style={styles.headerSubtitle}>Small steps, big impact.</Text>
        </View>
        
        <View style={styles.categories}>
          {renderActionCard({ icon: Telescope, title: "Explore Challenges" })}
          {renderActionCard({ icon: Earth, title: "Impact Overview" })}
          {renderActionCard({ icon: UsersRound, title: "Community" })}
        </View>
        
        <Animated.View style={[styles.challengeCard, { opacity: fadeAnim }]}>  
          <Text style={styles.challengeTitle}>Today's Challenge</Text>
          <Text style={styles.challengeDescription}>Take a 15-minute walk to reflect on nature</Text>
          <View style={styles.challengeMetaContainer}>
            <Text style={styles.challengeMeta}>🕒 15 min</Text>
            <Text style={styles.challengeMeta}>🌟 10 points</Text>
          </View>
          <TouchableOpacity style={styles.completeButton}>
            <Text style={styles.completeButtonText}>Complete Challenge</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      
      <View style={styles.footer}>
        {renderFooterItem({ icon: Home, label: "Home", isActive: true })}
        {renderFooterItem({ icon: TrendingUp, label: "Progress" })}
        {renderFooterItem({ icon: Settings, label: "Settings" })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },
  categories: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  challengeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 16,
    color: "#4A4A4A",
    marginBottom: 16,
  },
  challengeMetaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  challengeMeta: {
    fontSize: 14,
    color: "#666",
  },
  completeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  completeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 15,
  },
  footerItem: {
    alignItems: "center",
  },
  footerItemActive: {
    opacity: 1,
  },
  footerText: {
    fontSize: 14,
    color: "#999999",
  },
  footerTextActive: { 
    color: "#007AFF",
    fontWeight: "500",
  },
});


export default Dashboard;
