export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  const due = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  return due < today;
};

export const formatDate = (dateString) => {
  if (!dateString) {
    return "No date";
  }

  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getUserById = (users = [], userId) => {
  return users.find((user) => user.id === userId);
};

export const getStudents = (users = []) => {
  return users.filter((user) => user.role === "student");
};

export const getAdmins = (users = []) => {
  return users.filter((user) => user.role === "admin");
};

export const isAdmin = (user) => {
  return user?.role === "admin";
};

export const isStudent = (user) => {
  return user?.role === "student";
};
