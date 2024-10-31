type TestDataType = {
  id: number;
  student: string;
  avatar: string;
  course: string;
  lesson: string;
  testName: string;
  correct: string;
  score: number;
  date: string;
};

export const testData: TestDataType[] = [
  {
    id: 1,
    student: "Alice Johnson",
    avatar: "AJ",
    course: "React Fundamentals",
    lesson: "Components",
    testName: "Component Lifecycle",
    correct: "18/20",
    score: 90,
    date: "2024-10-22",
  },
  {
    id: 2,
    student: "Bob Smith",
    avatar: "BS",
    course: "Python Basics",
    lesson: "Data Structures",
    testName: "Lists and Tuples",
    correct: "15/20",
    score: 75,
    date: "2024-09-11",
  },
  {
    id: 3,
    student: "Charlie Brown",
    avatar: "CB",
    course: "Machine Learning",
    lesson: "Neural Networks",
    testName: "Backpropagation",
    correct: "35/40",
    score: 87.5,
    date: "2024-08-13",
  },
  {
    id: 4,
    student: "Diana Ross",
    avatar: "DR",
    course: "Web Development",
    lesson: "CSS Layouts",
    testName: "Flexbox and Grid",
    correct: "0/20",
    score: 0,
    date: "2024-07-05",
  },
  {
    id: 5,
    student: "Ethan Hunt",
    avatar: "EH",
    course: "Data Science",
    lesson: "Data Visualization",
    testName: "Matplotlib Basics",
    correct: "16/20",
    score: 80,
    date: "2024-06-18",
  },
];
