import * as SQLite from 'expo-sqlite';

let db = null;

// Initialize database
export const initDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync('taskora.db');
    
    // Users table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tasks table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        due_date TEXT,
        category TEXT DEFAULT 'Personal',
        completed INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

const getDatabase = async () => {
  if (!db) {
    await initDatabase();
  }
  return db;
};

// User operations
export const createUser = async (username, email, password) => {
  try {
    const database = await getDatabase();
    const result = await database.runAsync(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?);',
      [username, email, password]
    );
    return result.lastInsertRowId;
  } catch (error) {
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const database = await getDatabase();
    const result = await database.getFirstAsync(
      'SELECT * FROM users WHERE username = ?;',
      [username]
    );
    return result || null;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const database = await getDatabase();
    const result = await database.getFirstAsync(
      'SELECT * FROM users WHERE email = ?;',
      [email]
    );
    return result || null;
  } catch (error) {
    throw error;
  }
};

// Task operations
export const createTask = async (userId, title, description, dueDate, category) => {
  try {
    const database = await getDatabase();
    const result = await database.runAsync(
      'INSERT INTO tasks (user_id, title, description, due_date, category) VALUES (?, ?, ?, ?, ?);',
      [userId, title, description, dueDate || null, category || 'Personal']
    );
    return result.lastInsertRowId;
  } catch (error) {
    throw error;
  }
};

export const getTasksByUserId = async (userId) => {
  try {
    const database = await getDatabase();
    const result = await database.getAllAsync(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC;',
      [userId]
    );
    return result.map(task => ({
      ...task,
      completed: task.completed === 1,
    }));
  } catch (error) {
    throw error;
  }
};

export const getTaskById = async (taskId) => {
  try {
    const database = await getDatabase();
    const result = await database.getFirstAsync(
      'SELECT * FROM tasks WHERE id = ?;',
      [taskId]
    );
    if (result) {
      return {
        ...result,
        completed: result.completed === 1,
      };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (taskId, title, description, dueDate, category, completed) => {
  try {
    const database = await getDatabase();
    const result = await database.runAsync(
      'UPDATE tasks SET title = ?, description = ?, due_date = ?, category = ?, completed = ? WHERE id = ?;',
      [title, description, dueDate || null, category || 'Personal', completed ? 1 : 0, taskId]
    );
    return result.changes > 0;
  } catch (error) {
    throw error;
  }
};

export const toggleTaskCompleted = async (taskId, completed) => {
  try {
    const database = await getDatabase();
    const result = await database.runAsync(
      'UPDATE tasks SET completed = ? WHERE id = ?;',
      [completed ? 1 : 0, taskId]
    );
    return result.changes > 0;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const database = await getDatabase();
    const result = await database.runAsync(
      'DELETE FROM tasks WHERE id = ?;',
      [taskId]
    );
    return result.changes > 0;
  } catch (error) {
    throw error;
  }
};

export const getTasksByCategory = async (userId, category) => {
  try {
    const database = await getDatabase();
    const result = await database.getAllAsync(
      'SELECT * FROM tasks WHERE user_id = ? AND category = ? ORDER BY created_at DESC;',
      [userId, category]
    );
    return result.map(task => ({
      ...task,
      completed: task.completed === 1,
    }));
  } catch (error) {
    throw error;
  }
};

