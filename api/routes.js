import { Router } from "express";

import * as authController from "./Controller/authController.js";

const router = Router();

router.post("/login", authController.loginValidationController);
router.post("/register", authController.registerUserController);

router.post("/verify-user", authController.verifyUserExists);
router.post("/request-code", authController.requestCodeController);
router.post("/validate-code", authController.validationCodeController);

export default router;