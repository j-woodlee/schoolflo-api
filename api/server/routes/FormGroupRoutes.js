import { Router } from "express";
import FormGroupController from "../controllers/FormGroupController";

const router = Router();

router.get("/", FormGroupController.getAllFormGroups);
router.post("/", FormGroupController.addFormGroup);
router.get("/:id", FormGroupController.getAFormGroup);
router.put("/:id", FormGroupController.updatedFormGroup);
router.delete("/:id", FormGroupController.deleteFormGroup);

export default router;
