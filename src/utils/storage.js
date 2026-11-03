import { seedUsers, seedAssignments } from "../data/seedData";

const STORAGE_KEYS = {
  USERS: "joineazy_users",
  ASSIGNMENTS: "joineazy_assignments",
  CURRENT_USER: "joineazy_current_user",
  THEME: "joineazy_theme",
};

export const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : null;
};

export const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getAssignments = () => {
  const assignments = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
  return assignments ? JSON.parse(assignments) : null;
};

export const saveAssignments = (assignments) => {
  localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const saveCurrentUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
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
