import { Router } from "express";
import TeacherController from "../controllers/TeacherController";

const router = Router();

router.get("/", TeacherController.getAllTeachers);
router.post("/", TeacherController.addTeacher);
router.get("/:id", TeacherController.getATeacher);
router.put("/:id", TeacherController.updatedTeacher);
router.delete("/:id", TeacherController.deleteTeacher);

export default router;
