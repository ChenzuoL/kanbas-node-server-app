import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  app.delete("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const status = modulesDao.deleteModule(moduleId); // No need for `await` since it's not async
      res.send(status);
    } catch (error) {
      console.error("Error deleting module:", error);
      res.status(500).send({ error: "Failed to delete module" });
    }
  });

  app.put("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const moduleUpdates = req.body;

      // Validate moduleUpdates
      if (!moduleUpdates || typeof moduleUpdates !== "object") {
        return res.status(400).send({ error: "Module updates are required and must be a valid object" });
      }

      // Call the updateModule function from modulesDao
      const updatedModule = modulesDao.updateModule(moduleId, moduleUpdates);
      res.status(200).send(updatedModule);
    } catch (error) {
      console.error("Error updating module:", error.message);
      res.status(500).send({ error: error.message });
    }
  });
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  }); 
}
