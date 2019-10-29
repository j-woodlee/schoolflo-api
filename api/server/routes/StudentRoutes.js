import { Router } from "express";
import StudentController from "../controllers/StudentController";

const router = Router();

router.get("/", StudentController.getAllStudents);
router.post("/", StudentController.addStudent);
router.get("/:id", StudentController.getAStudent);
router.put("/:id", StudentController.updatedStudent);
router.delete("/:id", StudentController.deleteStudent);

export default router;
