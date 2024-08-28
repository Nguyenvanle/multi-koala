export interface CourseCardProps {
  courseId: string;
  courseName: string;
  courseCreateAt: Date;
  coursePrice: Number;
  courseDescription: string;
  courseType: string; // => Type?
  courseImage: string; // => Image?
  uploadByTeacher: string; // => Teacher?
  approvedByAdmin: string; // => Admin?
  status: "PENDING_APPROVAL" | "APPROVED" | "REJECTED";
}

export const COURSES: CourseCardProps[] = [
  {
    courseId: "1",
    courseName: "Introduction to React",
    courseCreateAt: new Date(),
    coursePrice: 49.99,
    courseDescription: "Learn the basics of React and build your first app.",
    courseType: "community",
    courseImage:
      "https://img.freepik.com/free-photo/online-education-studying-e-learning-technology-concept_53876-21187.jpg?t=st=1724768100~exp=1724771700~hmac=2a024739a1f3574497b5b0a183c2ccfd2f219a828bf004b565d0705abf8e2503&w=826",
    uploadByTeacher: "John Doe",
    approvedByAdmin: "Koala Nguyễn",
    status: "APPROVED",
  },
  {
    courseId: "2",
    courseName: "Introduction to React",
    courseCreateAt: new Date(),
    coursePrice: 49.99,
    courseDescription: "Learn the basics of React and build your first app.",
    courseType: "community",
    courseImage:
      "https://img.freepik.com/free-photo/online-education-studying-e-learning-technology-concept_53876-21187.jpg?t=st=1724768100~exp=1724771700~hmac=2a024739a1f3574497b5b0a183c2ccfd2f219a828bf004b565d0705abf8e2503&w=826",
    uploadByTeacher: "John Doe",
    approvedByAdmin: "Koala Nguyễn",
    status: "APPROVED",
  },
  {
    courseId: "3",
    courseName: "Introduction to React",
    courseCreateAt: new Date(),
    coursePrice: 49.99,
    courseDescription: "Learn the basics of React and build your first app.",
    courseType: "community",
    courseImage:
      "https://img.freepik.com/free-photo/online-education-studying-e-learning-technology-concept_53876-21187.jpg?t=st=1724768100~exp=1724771700~hmac=2a024739a1f3574497b5b0a183c2ccfd2f219a828bf004b565d0705abf8e2503&w=826",
    uploadByTeacher: "John Doe",
    approvedByAdmin: "Koala Nguyễn",
    status: "APPROVED",
  },
  {
    courseId: "4",
    courseName: "Introduction to React",
    courseCreateAt: new Date(),
    coursePrice: 49.99,
    courseDescription: "Learn the basics of React and build your first app.",
    courseType: "community",
    courseImage:
      "https://img.freepik.com/free-photo/online-education-studying-e-learning-technology-concept_53876-21187.jpg?t=st=1724768100~exp=1724771700~hmac=2a024739a1f3574497b5b0a183c2ccfd2f219a828bf004b565d0705abf8e2503&w=826",
    uploadByTeacher: "John Doe",
    approvedByAdmin: "Koala Nguyễn",
    status: "APPROVED",
  },
  {
    courseId: "5",
    courseName: "Introduction to React",
    courseCreateAt: new Date(),
    coursePrice: 49.99,
    courseDescription: "Learn the basics of React and build your first app.",
    courseType: "community",
    courseImage:
      "https://img.freepik.com/free-photo/online-education-studying-e-learning-technology-concept_53876-21187.jpg?t=st=1724768100~exp=1724771700~hmac=2a024739a1f3574497b5b0a183c2ccfd2f219a828bf004b565d0705abf8e2503&w=826",
    uploadByTeacher: "John Doe",
    approvedByAdmin: "Koala Nguyễn",
    status: "APPROVED",
  },
  {
    courseId: "6",
    courseName: "Introduction to React",
    courseCreateAt: new Date(),
    coursePrice: 49.99,
    courseDescription: "Learn the basics of React and build your first app.",
    courseType: "community",
    courseImage:
      "https://img.freepik.com/free-photo/online-education-studying-e-learning-technology-concept_53876-21187.jpg?t=st=1724768100~exp=1724771700~hmac=2a024739a1f3574497b5b0a183c2ccfd2f219a828bf004b565d0705abf8e2503&w=826",
    uploadByTeacher: "John Doe",
    approvedByAdmin: "Koala Nguyễn",
    status: "APPROVED",
  },
];
