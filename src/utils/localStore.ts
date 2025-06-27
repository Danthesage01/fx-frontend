// File location: /lib/utils/localStorage.ts

/**
 * Gets an item from localStorage and parses it as JSON with proper type safety
 * @param key The localStorage key to retrieve
 * @param defaultValue Optional default value to return if item doesn't exist
 * @returns The parsed item with the specified type, or null/defaultValue if not found
 */
export function getStoredItem<T>(key: string, defaultValue: T | null = null): T | null {
 try {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as T : defaultValue;
 } catch (error) {
  console.error(`Error retrieving item '${key}' from localStorage:`, error);
  return defaultValue;
 }
}

/**
 * Stores an item in localStorage as JSON
 * @param key The localStorage key to store under
 * @param value The value to store
 * @returns true if successful, false if failed
 */
export function setStoredItem<T>(key: string, value: T): boolean {
 try {
  localStorage.setItem(key, JSON.stringify(value));
  return true;
 } catch (error) {
  console.error(`Error storing item '${key}' in localStorage:`, error);
  return false;
 }
}

/**
 * Removes an item from localStorage
 * @param key The localStorage key to remove
 */
export function removeStoredItem(key: string): void {
 try {
  localStorage.removeItem(key);
 } catch (error) {
  console.error(`Error removing item '${key}' from localStorage:`, error);
 }
}

/**
 * Checks if an item exists in localStorage
 * @param key The localStorage key to check
 * @returns true if the item exists, false otherwise
 */
export function hasStoredItem(key: string): boolean {
 return localStorage.getItem(key) !== null;
}