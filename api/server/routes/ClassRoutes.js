import { Router } from "express";
import ClassController from "../controllers/ClassController";

const router = Router();

router.get("/", ClassController.getAllClasss);
router.post("/", ClassController.addClass);
router.get("/:id", ClassController.getAClass);
router.put("/:id", ClassController.updatedClass);
router.delete("/:id", ClassController.deleteClass);

export default router;
