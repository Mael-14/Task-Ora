import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentUser } from '../utils/auth';
import { getTasksByUserId, toggleTaskCompleted } from '../utils/database';

const TaskItem = ({ task, completed, onToggle, onPress }) => (
  <TouchableOpacity 
    style={styles.taskItem}
    onPress={onPress}
  >
    <TouchableOpacity 
      style={styles.checkboxContainer}
      onPress={onToggle}
    >
      <View style={[styles.checkbox, completed && styles.checkboxCompleted]}>
        {completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
    <View style={styles.taskContent}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.taskMeta}>
        {task.due_date ? new Date(task.due_date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }) : 'No due date'} - {task.category}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState(null);

  const loadTasks = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/');
        return;
      }

      setUserId(user.id);
      const allTasks = await getTasksByUserId(user.id);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayTasksList = [];
      const upcomingTasksList = [];

      allTasks.forEach(task => {
        if (task.due_date) {
          const dueDate = new Date(task.due_date);
          dueDate.setHours(0, 0, 0, 0);
          
          if (dueDate.getTime() === today.getTime()) {
            todayTasksList.push(task);
          } else if (dueDate.getTime() > today.getTime()) {
            upcomingTasksList.push(task);
          }
        } else {
          // Tasks without due date go to upcoming
          upcomingTasksList.push(task);
        }
      });

      setTodayTasks(todayTasksList);
      setUpcomingTasks(upcomingTasksList);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadTasks();
  };

  const handleToggleTask = async (taskId, completed) => {
    try {
      await toggleTaskCompleted(taskId, !completed);
      await loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/new-task')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e8d7c8" />
        </View>
      ) : (
        <ScrollView 
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.sectionTitle}>Today</Text>
          {todayTasks.length === 0 ? (
            <Text style={styles.emptyText}>No tasks for today</Text>
          ) : (
            todayTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                completed={task.completed}
                onToggle={() => handleToggleTask(task.id, task.completed)}
                onPress={() => router.push({
                  pathname: '/task-details',
                  params: { taskId: task.id.toString() }
                })}
              />
            ))
          )}

          <Text style={styles.sectionTitle}>Upcoming</Text>
          {upcomingTasks.length === 0 ? (
            <Text style={styles.emptyText}>No upcoming tasks</Text>
          ) : (
            upcomingTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                completed={task.completed}
                onToggle={() => handleToggleTask(task.id, task.completed)}
                onPress={() => router.push({
                  pathname: '/task-details',
                  params: { taskId: task.id.toString() }
                })}
              />
            ))
          )}
        </ScrollView>
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home" size={18} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}
        onPress={() => router.push('/categories')}
        >
          <Ionicons name="grid-outline" size={18} color="#fff" />
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
    padding: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 15,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginLeft: 5,
    backgroundColor: '#e8d7c8',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingBottom: 20,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});

