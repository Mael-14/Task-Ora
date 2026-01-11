import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    console.log('Sign up:', { username, email, password });
    // Add your signup logic here
    router.replace('/home');
  };

  const handleSocialSignUp = (platform) => {
    console.log(`Sign up with ${platform}`);
    // Add social signup logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create an account</Text>
        
        <Text style={styles.subtitle}>
          let's get you started.
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ paddingLeft: 10 }}
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#000000ff"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>SingUp</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already having an account ? </Text>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity 
            style={[styles.socialButton, styles.googleButton]}
            onPress={() => handleSocialSignUp('Google')}
          >
            <Ionicons name="logo-google" size={24} color="#EA4335" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.socialButton, styles.githubButton, { marginLeft: 30 }]}
            onPress={() => handleSocialSignUp('GitHub')}
          >
            <Ionicons name="logo-github" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.socialButton, styles.instagramButton, { marginLeft: 30 }]}
            onPress={() => handleSocialSignUp('Instagram')}
          >
            <Ionicons name="logo-instagram" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#555',
    borderRadius: 25,
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#e8d7c8',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
  },
  loginLink: {
    color: '#4169E1',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: '#fff',
  },
  githubButton: {
    backgroundColor: '#fff',
  },
  instagramButton: {
    backgroundColor: '#E1306C',
  },
});

