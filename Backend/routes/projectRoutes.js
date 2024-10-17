import express from 'express';
import { createProject, deleteAllProjects, deleteProject, getAllProjects, updateProject } from '../controllers/projectController.js';


const router = express.Router()


router.post("/create", createProject)
router.get("/", getAllProjects)
router.put("/:id/update", updateProject)
router.delete("/:id/delete", deleteProject)
router.delete("/deleteAll",deleteAllProjects)


export default router;