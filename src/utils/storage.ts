import AsyncStorage from '@react-native-async-storage/async-storage';

const CREDENTIALS_KEY = '@pebblo_credentials';

interface SavedCredentials {
  email: string;
  password: string;
}

export const saveCredentials = async (credentials: SavedCredentials) => {
  try {
    await AsyncStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
  } catch (error) {
    console.error('Error saving credentials:', error);
  }
};

export const loadCredentials = async (): Promise<SavedCredentials | null> => {
  try {
    const saved = await AsyncStorage.getItem(CREDENTIALS_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading credentials:', error);
    return null;
  }
};

export const clearCredentials = async () => {
  try {
    await AsyncStorage.removeItem(CREDENTIALS_KEY);
  } catch (error) {
    console.error('Error clearing credentials:', error);
  }
};
