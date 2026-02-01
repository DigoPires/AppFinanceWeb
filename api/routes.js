import { Router } from "express";

import loginValidationController from "./Controller/authController.js";

const router = Router();

router.post("/loginUser", loginValidationController);

export default router;