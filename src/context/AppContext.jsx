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
} from "../utils/storage";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

        login,
        logout,
        submitAssignment,

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
