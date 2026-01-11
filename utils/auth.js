import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByUsername, createUser, getUserByEmail } from './database';

const CURRENT_USER_KEY = '@current_user';

// Simple password validation (in production, use proper hashing)
export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' };
  }
  return { valid: true };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  return { valid: true };
};

export const validateUsername = (username) => {
  if (!username || username.length < 3) {
    return { valid: false, error: 'Username must be at least 3 characters' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, error: 'Username can only contain letters, numbers, and underscores' };
  }
  return { valid: true };
};

export const loginUser = async (username, password) => {
  try {
    if (!username || !password) {
      return { success: false, error: 'Please fill in all fields' };
    }

    const user = await getUserByUsername(username);
    
    if (!user) {
      return { success: false, error: 'Invalid username or password' };
    }

    // Simple password check (in production, use proper password hashing)
    if (user.password !== password) {
      return { success: false, error: 'Invalid username or password' };
    }

    // Store current user
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
      id: user.id,
      username: user.username,
      email: user.email,
    }));

    return { success: true, user: { id: user.id, username: user.username, email: user.email } };
  } catch (error) {
    return { success: false, error: 'An error occurred. Please try again.' };
  }
};

export const signupUser = async (username, email, password) => {
  try {
    // Validate inputs
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.valid) {
      return { success: false, error: usernameValidation.error };
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return { success: false, error: emailValidation.error };
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.error };
    }

    // Check if username already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return { success: false, error: 'Username already exists' };
    }

    // Check if email already exists
    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      return { success: false, error: 'Email already exists' };
    }

    // Create user
    const userId = await createUser(username, email, password);

    // Store current user
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
      id: userId,
      username,
      email,
    }));

    return { success: true, user: { id: userId, username, email } };
  } catch (error) {
    return { success: false, error: 'An error occurred. Please try again.' };
  }
};

export const getCurrentUser = async () => {
  try {
    const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

