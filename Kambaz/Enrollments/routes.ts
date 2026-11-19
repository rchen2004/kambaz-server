import EnrollmentsDao from "./dao";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollUserInCourse = (req, res) => {
    const { uid, cid } = req.params;
    dao.enrollUserInCourse(uid, cid);
    res.sendStatus(200);
  };

  const unenrollUserFromCourse = (req, res) => {
    const { uid, cid } = req.params;
    dao.unrollUserFromCourse(uid, cid);
    res.sendStatus(200);
  };

  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
