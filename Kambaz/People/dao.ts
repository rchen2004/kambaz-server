import { v4 as uuidv4 } from "uuid";

export default function PeopleDao(db) {
  let { users } = db;

  const findPeopleForCourse = (courseId) => {
    const userIds = db.enrollments
      .filter((enrollment) => enrollment.course === courseId)
      .map((enrollment) => enrollment.user);
    return users.filter((user) => userIds.includes(user._id));
  };

  const findPersonById = (personId) => users.find((user) => user._id === personId);

  const findPersonByUsername = (username) =>
    users.find((user) => user.username === username);

  const createPersonInCourse = (person, courseId) => {
    const newPerson = { ...person, _id: uuidv4() };
    users = [...users, newPerson];
    db.enrollments.push({ _id: uuidv4(), user: newPerson._id, course: courseId });
    return newPerson;
  };

  const updatePerson = (personId, person) =>
    (users = users.map((u) => (u._id === personId ? person : u)));

  const deletePerson = (personId) => {
    users = users.filter((u) => u._id !== personId);
    db.enrollments = db.enrollments.filter((e) => e.user !== personId);
  };
  
  return {
    findPeopleForCourse, findPersonById, findPersonByUsername,
    createPersonInCourse, updatePerson, deletePerson,
  };
}
