import AssignmentsDao from "./dao";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    res.json(dao.findAssignmentsForCourse(courseId));
  }

  const createAssignmentForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignment = { ...req.body, course: courseId };
    const newAssignment = dao.createAssignment(assignment);
    res.json(newAssignment);
  }

  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    dao.deleteAssignment(assignmentId);
    res.sendStatus(200);
  }

  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.updateAssignment(assignmentId, req.body);
    if (!assignment) {
        res.sendStatus(404);
        return;
    }  
    res.json(assignment);
  }

  app.delete("/api/assignments/:assignmentId", deleteAssignment);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.put("/api/assignments/:assignmentId", updateAssignment);
}
