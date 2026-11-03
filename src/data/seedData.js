export const seedUsers = [
  {
    id: "admin-1",
    name: "Dr. Rajesh Patel",
    email: "rajesh@joineazy.com",
    role: "admin",
  },
  {
    id: "admin-2",
    name: "Prof. Priya Shah",
    email: "priya@joineazy.com",
    role: "admin",
  },

  {
    id: "student-1",
    name: "Mehul Bavaliya",
    email: "mehul@student.com",
    role: "student",
  },
  {
    id: "student-2",
    name: "Aarav Patel",
    email: "aarav@student.com",
    role: "student",
  },
  {
    id: "student-3",
    name: "Riya Shah",
    email: "riya@student.com",
    role: "student",
  },
  {
    id: "student-4",
    name: "Dhruv Mehta",
    email: "dhruv@student.com",
    role: "student",
  },
  {
    id: "student-5",
    name: "Kavya Joshi",
    email: "kavya@student.com",
    role: "student",
  },
];

export const seedAssignments = [
  {
    id: "assignment-1",
    title: "React Fundamentals",
    description:
      "Build a responsive React application demonstrating components, props, state, and event handling.",
    dueDate: "2026-11-07",
    driveLink: "https://drive.google.com/",
    createdBy: "admin-1",
    assignedTo: [
      "student-1",
      "student-2",
      "student-3",
      "student-4",
      "student-5",
    ],
    submissions: {
      "student-1": "submitted",
      "student-2": "submitted",
      "student-3": "pending",
      "student-4": "pending",
      "student-5": "submitted",
    },
    createdAt: "2026-11-01T10:00:00.000Z",
  },

  {
    id: "assignment-2",
    title: "JavaScript ES6 Practice",
    description:
      "Solve JavaScript problems using modern ES6+ features including map, filter, reduce, destructuring, and promises.",
    dueDate: "2026-11-09",
    driveLink: "https://drive.google.com/",
    createdBy: "admin-1",
    assignedTo: [
      "student-1",
      "student-2",
      "student-3",
      "student-4",
    ],
    submissions: {
      "student-1": "submitted",
      "student-2": "pending",
      "student-3": "submitted",
      "student-4": "pending",
    },
    createdAt: "2026-11-01T11:00:00.000Z",
  },

  {
    id: "assignment-3",
    title: "REST API Development",
    description:
      "Create a REST API with Node.js and Express.js including CRUD operations and proper HTTP status codes.",
    dueDate: "2026-11-11",
    driveLink: "https://drive.google.com/",
    createdBy: "admin-2",
    assignedTo: [
      "student-1",
      "student-2",
      "student-3",
      "student-5",
    ],
    submissions: {
      "student-1": "pending",
      "student-2": "submitted",
      "student-3": "pending",
      "student-5": "submitted",
    },
    createdAt: "2026-11-02T09:00:00.000Z",
  },

  {
    id: "assignment-4",
    title: "MongoDB Database Design",
    description:
      "Design MongoDB collections and implement basic database operations for a student management system.",
    dueDate: "2026-11-13",
    driveLink: "https://drive.google.com/",
    createdBy: "admin-2",
    assignedTo: [
      "student-1",
      "student-3",
      "student-4",
      "student-5",
    ],
    submissions: {
      "student-1": "pending",
      "student-3": "submitted",
      "student-4": "pending",
      "student-5": "pending",
    },
    createdAt: "2026-11-02T10:00:00.000Z",
  },

  {
    id: "assignment-5",
    title: "Frontend UI Challenge",
    description:
      "Build a responsive dashboard interface using React and Tailwind CSS.",
    dueDate: "2026-11-15",
    driveLink: "https://drive.google.com/",
    createdBy: "admin-1",
    assignedTo: [
      "student-1",
      "student-2",
      "student-3",
      "student-4",
      "student-5",
    ],
    submissions: {
      "student-1": "pending",
      "student-2": "pending",
      "student-3": "pending",
      "student-4": "submitted",
      "student-5": "pending",
    },
    createdAt: "2026-11-02T12:00:00.000Z",
  },
];
