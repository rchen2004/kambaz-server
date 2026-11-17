import AssignmentsDao from "./dao";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForModule = (req, res) => {
    const { moduleId } = req.params;
    res.json(dao.findAssignmentsForModule(moduleId));
  }

  const createAssignmentForModule = (req, res) => {
    const { moduleId } = req.params;
    const assignment = { ...req.body, module: moduleId };
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
  app.post("/api/modules/:moduleId/assignments", createAssignmentForModule);
  app.get("/api/modules/:moduleId/assignments", findAssignmentsForModule);
  app.put("/api/assignments/:assignmentId", updateAssignment);
}
