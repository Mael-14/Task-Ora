import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function EditTaskScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // In real app, get task data from params
  const existingTask = params?.task ? JSON.parse(params.task) : {
    title: 'Finish UI/UX design lectures',
    description: 'completing all the remaining learning materials, lessons, or modules in a course about User Interface (UI) and User Experience (UX) design',
    dueDate: 'October 16, 2025',
    category: 'Work',
  };

  const [title, setTitle] = useState(existingTask.title);
  const [description, setDescription] = useState(existingTask.description);
  const [dueDate, setDueDate] = useState(existingTask.dueDate);
  const [category, setCategory] = useState(existingTask.category);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const categories = ['Personal', 'School', 'Work', 'House hold'];

  const handleSave = () => {
    console.log('Update task:', { title, description, dueDate, category });
    // Add update logic here
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const handleDateSelect = () => {
    setShowDatePicker(true);
    // In real app, show date picker modal
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setShowCategoryPicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={handleCancel}
        >
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Task</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Task title</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose a title for your task"
          placeholderTextColor="#666"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add more details about the task"
          placeholderTextColor="#666"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Due Date</Text>
            <TouchableOpacity 
              style={styles.pickerButton}
              onPress={handleDateSelect}
            >
              <Text style={[styles.pickerText, dueDate && styles.selectedText]}>
                {dueDate || 'Select a date'}
              </Text>
              <View style={styles.iconGroup}>
                <Ionicons name="calendar-outline" size={20} color="#666" />
                <Ionicons name="chevron-down" size={20} color="#666" style={{ marginLeft: 5 }} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.halfWidth, { marginLeft: 15 }]}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity 
              style={styles.pickerButton}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            >
              <Text style={[styles.pickerText, category && styles.selectedText]}>
                {category || 'Select'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
            
            {showCategoryPicker && (
              <View style={styles.categoryDropdown}>
                {categories.map((cat, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryOption,
                      index === categories.length - 1 && styles.lastOption
                    ]}
                    onPress={() => handleCategorySelect(cat)}
                  >
                    <Text style={styles.categoryOptionText}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={handleCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.saveButton, { marginLeft: 15 }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
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
  closeButton: {
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
    paddingVertical: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#555',
    borderRadius: 15,
    padding: 10,
    color: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 150,
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
  },
  pickerButton: {
    backgroundColor: '#555',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    color: '#666',
    fontSize: 16,
  },
  selectedText: {
    color: '#fff',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  categoryDropdown: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    backgroundColor: '#555',
    borderRadius: 15,
    marginTop: 5,
    zIndex: 1000,
  },
  categoryOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  categoryOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 60,
    marginBottom: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#555',
    borderRadius: 25,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#e8d7c8',
    borderRadius: 25,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000',
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

