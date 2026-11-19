import PeopleDao from "./dao";

export default function PeopleRoutes(app, db) {
  const dao = PeopleDao(db);

  const isFaculty = (req) => req.session["currentUser"]?.role === "FACULTY";

  const findPeopleForCourse = (req, res) => {
    res.json(dao.findPeopleForCourse(req.params.cid));
  };

  const createPersonInCourse = (req, res) => {
    if (!isFaculty(req)) {
      res.sendStatus(403);
      return;
    }
    if (dao.findPersonByUsername(req.body.username)) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    res.json(dao.createPersonInCourse(req.body, req.params.cid));
  };

  const updatePerson = (req, res) => {
    if (!isFaculty(req)) {
      res.sendStatus(403);
      return;
    }
    const { pid } = req.params;
    dao.updatePerson(pid, req.body);
    const person = dao.findPersonById(pid);
    if (!person) {
      res.sendStatus(404);
      return;
    }
    res.json(person);
  };

  const deletePerson = (req, res) => {
    if (!isFaculty(req)) {
      res.sendStatus(403);
      return;
    }
    dao.deletePerson(req.params.pid);
    res.sendStatus(200);
  };

  app.get("/api/courses/:cid/people", findPeopleForCourse);
  app.post("/api/courses/:cid/people", createPersonInCourse);
  app.put("/api/people/:pid", updatePerson);
  app.delete("/api/people/:pid", deletePerson);
}
