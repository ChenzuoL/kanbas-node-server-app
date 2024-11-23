import Database from "../Database/index.js";
export function updateModule(moduleId, moduleUpdates) {
    const { modules } = Database;
    const module = modules.find((module) => module._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
  }  
export function deleteModule(moduleId) {
    const { modules } = Database;
    Database.modules = modules.filter((module) => module._id !== moduleId);
   }   
export function findModulesForCourse(courseId) {
  const { modules } = Database;
  return modules.filter((module) => module.course === courseId);
}
export function createModule(module) {
    const newModule = { ...module, _id: Date.now().toString() };
    Database.modules = [...Database.modules, newModule];
    console.log("Module created and added to Database:", newModule);
    return newModule;
}

// Delete an assignment by ID
export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  const index = assignments.findIndex((assignment) => assignment._id === assignmentId);

  if (index === -1) {
    throw new Error(`Assignment with ID ${assignmentId} not found`);
  }

  const [deletedAssignment] = assignments.splice(index, 1); // Remove the assignment
  return deletedAssignment;
}

  
