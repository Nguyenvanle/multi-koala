import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY_PREFIX = "@TestData:";

export const saveTestData = async (testId, answers) => {
  try {
    const key = `${STORAGE_KEY_PREFIX}${testId}`;
    await AsyncStorage.setItem(key, JSON.stringify(answers));
  } catch (error) {
    console.error("Error saving test data:", error);
  }
};

export const getTestData = async (testId) => {
  try {
    const key = `${STORAGE_KEY_PREFIX}${testId}`;
    const storedData = await AsyncStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Error getting test data:", error);
    return null;
  }
};

export const clearTestData = async (testId) => {
  try {
    const key = `${STORAGE_KEY_PREFIX}${testId}`;
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error clearing test data:", error);
  }
};
