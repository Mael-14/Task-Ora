import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet 
} from 'react-native';

const TaskItem = ({ task, completed, onToggle }) => (
  <TouchableOpacity 
    style={styles.taskItem}
    onPress={onToggle}
  >
    <View style={[styles.checkbox, completed && styles.checkboxCompleted]}>
      {completed && <Text style={styles.checkmark}>✓</Text>}
    </View>
    <View style={styles.taskContent}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.taskMeta}>
        {task.time} - {task.category}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [todayTasks, setTodayTasks] = useState([
    { id: 1, title: 'Finish UI/UX design lectures', time: '10:30 am', category: 'Work', completed: true },
    { id: 2, title: 'Start DevOps lectures', time: '12:00 pm', category: 'Work', completed: true },
    { id: 3, title: 'Go to school for interview', time: '3:15 pm', category: 'Work', completed: false },
    { id: 4, title: 'Start my report on AI', time: '9:30 pm', category: 'Work', completed: false },
  ]);

  const [upcomingTasks] = useState([
    { id: 5, title: 'Mail my lecturer', time: 'Monday - 8:30 am', category: 'Work', completed: false },
    { id: 6, title: 'Start coursera courses', time: 'Wednesday - 4:30 pm', category: 'Work', completed: false },
  ]);

  const toggleTask = (id, isToday) => {
    if (isToday) {
      setTodayTasks(tasks =>
        tasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Today</Text>
        {todayTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            completed={task.completed}
            onToggle={() => toggleTask(task.id, true)}
          />
        ))}

        <Text style={styles.sectionTitle}>Upcoming</Text>
        {upcomingTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            completed={task.completed}
            onToggle={() => toggleTask(task.id, false)}
          />
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navLabel}>Category</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
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
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 32,
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 15,
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#555',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  checkbox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#e8d7c8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  checkboxCompleted: {
    backgroundColor: '#e8d7c8',
  },
  checkmark: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  taskMeta: {
    fontSize: 14,
    color: '#ccc',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#444',
    paddingVertical: 15,
    paddingBottom: 30,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  navLabel: {
    fontSize: 12,
    color: '#fff',
  },
});