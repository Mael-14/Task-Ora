import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function TaskDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // In real app, get task data from params
  const task = params?.task ? JSON.parse(params.task) : {
    title: 'Finish UI/UX design lectures',
    dueDate: 'October 16, 2025',
    category: 'Work',
    description: 'Completing all the remaining learning materials, lessons, or modules in a course about User Interface (UI) and User Experience (UX) design.',
  };

  const handleEdit = () => {
    router.push({
      pathname: '/edit-task',
      params: { task: JSON.stringify(task) }
    });
  };

  const handleDelete = () => {
    console.log('Delete task');
    // Add delete confirmation and logic
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.taskTitle}>{task.title}</Text>

        <Text style={styles.description}>{task.description ?? 'No description available'}</Text>

        <View style={styles.detailSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar-outline" size={18} color="#000" />
          </View>
          <View>
            <Text style={styles.detailLabel}>Due date</Text>
            <Text style={styles.detailValue}>{task.dueDate ?? 'No due date available'}</Text>
          </View>
        </View>

        <View style={styles.detailSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="folder-outline" size={18} color="#000" />
          </View>
          <View>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{task.category ?? 'No category available'}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEdit}
        >
          <Ionicons name="pencil-outline" size={20} color="#000" />
          <Text style={[styles.editButtonText, { marginLeft: 8 }]}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.deleteButton, { marginLeft: 15 }]}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={[styles.deleteButtonText, { marginLeft: 8 }]}>Delete</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home-outline" size={18} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/categories')}
        >
          <Ionicons name="grid-outline" size={18} color="#fff" />
          <Text style={styles.navLabel}>Category</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
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
    paddingHorizontal: 10,
    paddingTop: 60,
    marginBottom: 10,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  taskTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    lineHeight: 40,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    lineHeight: 24,
  },
  detailSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#e8d7c8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  detailLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e8d7c8',
    borderRadius: 25,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#dc3545',
    borderRadius: 25,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

