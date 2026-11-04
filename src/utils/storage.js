import { seedUsers, seedAssignments } from "../data/seedData";

const STORAGE_KEYS = {
  USERS: "joineazy_users",
  ASSIGNMENTS: "joineazy_assignments",
  CURRENT_USER: "joineazy_current_user",
  THEME: "joineazy_theme",
};

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (err) {
    console.error("Storage parse error:", err);
    return fallback;
  }
};

export const getUsers = () => {
  return safeParse(localStorage.getItem(STORAGE_KEYS.USERS), null);
};

export const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getAssignments = () => {
  return safeParse(localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS), null);
};

export const saveAssignments = (assignments) => {
  localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
};

export const getCurrentUser = () => {
  return safeParse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER), null);
};

export const saveCurrentUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const getTheme = () => {
  return localStorage.getItem(STORAGE_KEYS.THEME) || "light";
};

export const saveTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

export const initializeStorage = () => {
  const existingUsers = getUsers();
  const existingAssignments = getAssignments();

  if (!existingUsers) {
    saveUsers(seedUsers);
  }

  if (!existingAssignments) {
    saveAssignments(seedAssignments);
  }
};

export { STORAGE_KEYS };
