import AsyncStorage from '@react-native-async-storage/async-storage';

const CREDENTIALS_KEY = '@auth_credentials';

export const saveCredentials = async (email: string, password: string) => {
  try {
    const credentials = JSON.stringify({ email, password });
    await AsyncStorage.setItem(CREDENTIALS_KEY, credentials);
  } catch (error) {
    console.error('Error saving credentials:', error);
  }
};

export const loadCredentials = async () => {
  try {
    const credentials = await AsyncStorage.getItem(CREDENTIALS_KEY);
    return credentials ? JSON.parse(credentials) : null;
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
