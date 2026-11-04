import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  initializeStorage,
  getUsers,
  getAssignments,
  saveUsers,
  saveAssignments,
  getCurrentUser,
  saveCurrentUser,
  clearCurrentUser,
  getTheme,
  saveTheme,
} from "../utils/storage";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => getTheme());

  useEffect(() => {
    const initializeApp = () => {
      initializeStorage();

      const storedUsers = getUsers();
      const storedAssignments = getAssignments();
      const storedCurrentUser = getCurrentUser();

      setUsers(storedUsers || []);
      setAssignments(storedAssignments || []);
      setCurrentUser(storedCurrentUser || null);

      setIsLoading(false);
    };

    initializeApp();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const login = (userId) => {
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    saveCurrentUser(user);
    setCurrentUser(user);

    return {
      success: true,
      user,
    };
  };

  const logout = () => {
    clearCurrentUser();
    setCurrentUser(null);
  };

  const submitAssignment = (assignmentId, studentId) => {
    setAssignments((prevAssignments) => {
      const updatedAssignments = prevAssignments.map((assignment) => {
        if (assignment.id !== assignmentId) {
          return assignment;
        }

        return {
          ...assignment,
          submissions: {
            ...assignment.submissions,
            [studentId]: "submitted",
          },
        };
      });

      saveAssignments(updatedAssignments);
      return updatedAssignments;
    });
  };

  const createAssignment = (assignmentData) => {
    const newId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `assignment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    const newAssignment = {
      id: newId,
      ...assignmentData,
      createdBy: currentUser?.id || "admin-1",
      createdAt: new Date().toISOString(),
      submissions: (assignmentData.assignedTo || []).reduce((acc, studentId) => {
        acc[studentId] = "pending";
        return acc;
      }, {}),
    };

    setAssignments((prevAssignments) => {
      const updatedAssignments = [newAssignment, ...prevAssignments];
      saveAssignments(updatedAssignments);
      return updatedAssignments;
    });

    return newAssignment;
  };

  const updateAssignment = (assignmentId, updatedData) => {
    setAssignments((prevAssignments) => {
      const updatedAssignments = prevAssignments.map((assignment) => {
        if (assignment.id !== assignmentId) {
          return assignment;
        }

        const updatedAssignedTo = updatedData.assignedTo || [];
        const updatedSubmissions = {};

        updatedAssignedTo.forEach((studentId) => {
          updatedSubmissions[studentId] =
            assignment.submissions?.[studentId] || "pending";
        });

        return {
          ...assignment,
          ...updatedData,
          submissions: updatedSubmissions,
        };
      });

      saveAssignments(updatedAssignments);
      return updatedAssignments;
    });
  };

  const deleteAssignment = (assignmentId) => {
    setAssignments((prevAssignments) => {
      const updatedAssignments = prevAssignments.filter(
        (assignment) => assignment.id !== assignmentId
      );

      saveAssignments(updatedAssignments);
      return updatedAssignments;
    });
  };

  const updateAssignments = (updatedAssignments) => {
    setAssignments(updatedAssignments);
    saveAssignments(updatedAssignments);
  };

  const updateUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  const getStudentAssignmentsForCurrentUser = () => {
    if (!currentUser) return [];
    return assignments.filter((assignment) =>
      assignment.assignedTo?.includes(currentUser.id)
    );
  };

  const getAdminAssignmentsForCurrentUser = () => {
    if (!currentUser) return [];
    return assignments.filter(
      (assignment) => assignment.createdBy === currentUser.id
    );
  };

  return (
    <AppContext.Provider
      value={{
        users,
        assignments,
        currentUser,
        isLoading,
        theme,
        toggleTheme,

        login,
        logout,
        submitAssignment,
        createAssignment,
        updateAssignment,
        deleteAssignment,

        updateAssignments,
        updateUsers,

        getStudentAssignmentsForCurrentUser,
        getAdminAssignmentsForCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
