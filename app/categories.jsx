import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CategoryItem = ({ category, onPress }) => (
  <TouchableOpacity 
    style={styles.categoryItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View>
      <Text style={styles.categoryTitle}>{category.name}</Text>
      <Text style={styles.categoryCount}>
        {category.count} {category.count === 1 ? 'task' : 'tasks'}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function CategoriesScreen() {
  const router = useRouter();
  const [categories] = useState([
    { id: 1, name: 'Personal', count: 8 },
    { id: 2, name: 'School', count: 2 },
    { id: 3, name: 'Work', count: 4 },
    { id: 4, name: 'House hold', count: 1 },
  ]);

  const handleCategoryPress = (category) => {
    console.log('Selected category:', category);
    // Navigate to category tasks or perform action
  };

  const handleAddCategory = () => {
    console.log('Add new category');
    // Navigate to add category screen or show modal
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddCategory}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            category={category}
            onPress={() => handleCategoryPress(category)}
          />
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home-outline" size={18} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="grid" size={18} color="#fff" />
          <Text style={styles.navLabel}>Category</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-outline" size={18} color="#fff" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  categoryItem: {
    backgroundColor: '#555',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 16,
    color: '#ccc',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#444',
    paddingVertical: 15,
    paddingBottom: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
});

