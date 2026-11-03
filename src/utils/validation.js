export const validateAssignment = (assignment = {}) => {
  const errors = {};

  if (!assignment.title?.trim()) {
    errors.title = "Title is required";
  }

  if (!assignment.description?.trim()) {
    errors.description = "Description is required";
  }

  if (!assignment.dueDate) {
    errors.dueDate = "Due date is required";
  }

  if (!assignment.driveLink?.trim()) {
    errors.driveLink = "Drive link is required";
  }

  if (!assignment.assignedTo || assignment.assignedTo.length === 0) {
    errors.assignedTo = "At least one student must be assigned";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

