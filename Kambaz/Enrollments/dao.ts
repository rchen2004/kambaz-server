import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    const alreadyEnrolled = enrollments.some(
      (enrollment) => enrollment.user === userId && enrollment.course === courseId,
    );
    if (alreadyEnrolled) return;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }

  function unrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    db.enrollments = enrollments.filter(
      (enrollment) => !(enrollment.user === userId && enrollment.course === courseId),
    );
  }

  return { enrollUserInCourse, unrollUserFromCourse };
}