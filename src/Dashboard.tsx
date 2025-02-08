import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, SafeAreaView } from "react-native";
import { Target, Activity, Users, CheckCircle, Home, TrendingUp, Settings } from "lucide-react-native";
import type { LucideIcon } from 'lucide-react-native';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
}

interface FooterItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
}

const Dashboard: React.FC = () => {
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
    >
      <View style={styles.iconContainer}>
        <Icon color="#333333" size={24} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );

  const renderFooterItem = ({ icon: Icon, label, isActive }: FooterItemProps) => (
    <TouchableOpacity style={styles.footerItem}>
      <Icon color={isActive ? "#333333" : "#999999"} size={24} />
      <Text style={[styles.footerText, isActive && styles.footerTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome Back 👋</Text>
          <Text style={styles.headerSubtitle}>
            Your daily impact journey awaits
          </Text>
        </View>

        {/* Action Cards */}
        <View style={styles.categories}>
          {renderActionCard({ 
            icon: Target, 
            title: "Explore Challenges"
          })}
          {renderActionCard({ 
            icon: Activity, 
            title: "Impact Overview"
          })}
          {renderActionCard({ 
            icon: Users, 
            title: "Community"
          })}
        </View>

        {/* Today's Challenge */}
        <Animated.View style={[styles.challengeCard, { opacity: fadeAnim }]}>
          <View style={styles.challengeHeader}>
            <CheckCircle color="#333333" size={24} />
            <Text style={styles.challengeTitle}>Today's Challenge</Text>
          </View>
          <Text style={styles.challengeDescription}>
            Take a 15-minute walk to reflect on nature 🌳
          </Text>
          <TouchableOpacity style={styles.completeButton}>
            <Text style={styles.completeButtonText}>Complete Challenge</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Bottom Tab Navigation */}
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
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },
  categories: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row" as const,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    padding: 12,
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
    margin: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  challengeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginLeft: 12,
  },
  challengeDescription: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
    marginBottom: 20,
  },
  completeButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    borderRadius: 12,
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
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
  },
  footerTextActive: { 
    color: "#4A90E2",
    fontWeight: "500",
  },
});

export default Dashboard;