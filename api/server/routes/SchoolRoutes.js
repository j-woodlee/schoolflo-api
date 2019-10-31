import { Router } from "express";
import SchoolController from "../controllers/SchoolController";

const router = Router();

router.get("/", SchoolController.getAllSchools);
router.post("/", SchoolController.addSchool);
router.get("/:id", SchoolController.getASchool);
router.put("/:id", SchoolController.updatedSchool);
router.delete("/:id", SchoolController.deleteSchool);

export default router;
