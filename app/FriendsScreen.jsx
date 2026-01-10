import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RoomFriendsScreen({ navigation }) {
  const [roomName, setRoomName] = useState('');
  const [playersNum, setPlayersNum] = useState('');
  const [activeTab, setActiveTab] = useState('friends'); // 'games' or 'friends'
  const [selectedFriends, setSelectedFriends] = useState([1, 2, 3]); // Selected friend IDs

  const friends = [
    { id: 1, name: 'Emilie', avatar: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Emilie', avatar: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Emilie', avatar: 'https://via.placeholder.com/50' },
    { id: 4, name: 'Emilie', avatar: 'https://via.placeholder.com/50' },
    { id: 5, name: 'Emilie', avatar: 'https://via.placeholder.com/50' },
  ];

  const toggleFriend = (friendId) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter(id => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  const handleCreateSession = () => {
    console.log('Create session:', { roomName, playersNum, selectedFriends });
    // Add create session logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerLeft}>Room</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>Code</Text>
            <Text style={styles.codeValue}>: LDE22QA</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'games' && styles.activeTab]}
            onPress={() => setActiveTab('games')}
          >
            <Text style={styles.tabText}>Games</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
            onPress={() => setActiveTab('friends')}
          >
            <Text style={styles.tabText}>Friends</Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Room name :</Text>
          <TextInput
            style={styles.input}
            value={roomName}
            onChangeText={setRoomName}
            placeholder=""
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Players num :</Text>
          <TextInput
            style={styles.input}
            value={playersNum}
            onChangeText={setPlayersNum}
            placeholder=""
            keyboardType="numeric"
          />
        </View>

        {/* Friends List */}
        <Text style={styles.sectionTitle}>Select Friends</Text>

        {friends.map((friend) => (
          <TouchableOpacity
            key={friend.id}
            style={styles.friendItem}
            onPress={() => toggleFriend(friend.id)}
          >
            <View style={styles.friendInfo}>
              <Image 
                source={{ uri: friend.avatar }}
                style={styles.avatar}
              />
              <Text style={styles.friendName}>{friend.name}</Text>
            </View>
            {selectedFriends.includes(friend.id) && (
              <Ionicons name="checkmark" size={24} color="#000" />
            )}
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Create Session Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateSession}
        >
          <Text style={styles.createButtonText}>Create session</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5d7a8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerLeft: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeLabel: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  codeValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginLeft: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 15,
  },
  tab: {
    flex: 1,
    backgroundColor: '#f0c989',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeTab: {
    backgroundColor: '#f0c989',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  inputSection: {
    marginTop: 25,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#e8e8e8',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30,
    marginBottom: 20,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  friendName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  createButton: {
    backgroundColor: '#f0c989',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  createButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});