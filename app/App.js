import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import TaskDetailsScreen from './TaskDetailsScreen';
import EditTaskScreen from './EditTask';
import CategoriesScreen from './CategoryScreen';
import NewTaskScreen from './NewTaskScreen';
import ProfileScreen from './ProfileScreen';
import FriendsScreen from './FriendsScreen.jsx'

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
