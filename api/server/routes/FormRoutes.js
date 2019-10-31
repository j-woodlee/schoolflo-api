import { Router } from "express";
import FormController from "../controllers/FormController";

const router = Router();

router.get("/", FormController.getAllForms);
router.post("/", FormController.addForm);
router.get("/:id", FormController.getAForm);
router.put("/:id", FormController.updatedForm);
router.delete("/:id", FormController.deleteForm);

export default router;
