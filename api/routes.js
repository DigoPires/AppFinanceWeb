import { Router } from "express";

import * as authController from "./Controller/authController.js";

const router = Router();

router.post("/login", authController.loginValidationController);
router.post("/register", authController.registerUserController);

export default router;