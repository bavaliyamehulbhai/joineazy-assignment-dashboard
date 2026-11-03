export const getStudentAssignments = (assignments = [], studentId) => {
  return assignments.filter((assignment) =>
    assignment.assignedTo?.includes(studentId)
  );
};

export const getSubmittedCount = (assignments = [], studentId) => {
  return assignments.filter(
    (assignment) =>
      assignment.assignedTo?.includes(studentId) &&
      assignment.submissions?.[studentId] === "submitted"
  ).length;
};

export const getPendingCount = (assignments = [], studentId) => {
  return assignments.filter(
    (assignment) =>
      assignment.assignedTo?.includes(studentId) &&
      assignment.submissions?.[studentId] === "pending"
  ).length;
};

export const getStudentProgress = (assignments = [], studentId) => {
  const studentAssignments = getStudentAssignments(assignments, studentId);

  if (studentAssignments.length === 0) {
    return 0;
  }

  const submitted = studentAssignments.filter(
    (assignment) => assignment.submissions?.[studentId] === "submitted"
  ).length;

  return Math.round((submitted / studentAssignments.length) * 100);
};

export const getAssignmentProgress = (assignment) => {
  if (!assignment || !assignment.assignedTo) {
    return { submitted: 0, total: 0, percentage: 0 };
  }

  const total = assignment.assignedTo.length;

  if (total === 0) {
    return {
      submitted: 0,
      total: 0,
      percentage: 0,
    };
  }

  const submitted = assignment.assignedTo.filter(
    (studentId) => assignment.submissions?.[studentId] === "submitted"
  ).length;

  return {
    submitted,
    total,
    percentage: Math.round((submitted / total) * 100),
  };
};

export const getAdminAssignments = (assignments = [], adminId) => {
  return assignments.filter((assignment) => assignment.createdBy === adminId);
};
