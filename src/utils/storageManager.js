import { STORAGE_KEYS } from '../constants/projectConstants';

export function loadProjects() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
    return [];
  }
}

export function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
    if (error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please delete some projects.');
    }
  }
}

export function loadSettings(key, defaultValue) {
  try {
    // Convert camelCase to SNAKE_CASE (e.g., 'sortBy' -> 'SORT_BY')
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toUpperCase();
    const fullKey = STORAGE_KEYS[snakeKey];
    const saved = localStorage.getItem(fullKey);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error loading setting ${key} from localStorage:`, error);
    return defaultValue;
  }
}

export function saveSettings(key, value) {
  try {
    // Convert camelCase to SNAKE_CASE (e.g., 'sortBy' -> 'SORT_BY')
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toUpperCase();
    const fullKey = STORAGE_KEYS[snakeKey];
    localStorage.setItem(fullKey, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving setting ${key} to localStorage:`, error);
  }
}

export function clearAllData() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}
