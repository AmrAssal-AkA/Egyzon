import express from "express";

import { contactController } from "../controller/contact.controller";
import { validate } from "../middleware/validate";
import { contactSchema } from "../validators/contact.validate";
import { isAuthenticated } from "../middleware/Auth.middleware";
import { Authorize } from "../middleware/Authorization";

const router = express.Router();

router.post("/send", validate(contactSchema), contactController.createContact);
router.get("/all",isAuthenticated, Authorize("admin"), contactController.getContacts);

export default router;
