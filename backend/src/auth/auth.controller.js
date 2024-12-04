import express from "express";
const router = express.Router();
import * as authService from "./auth.service.js";
import { loginValidate } from "./auth.validate.js";
import createHttpError from "http-errors";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isValid = await loginValidate.isValid({
      email,
      password,
    });

    if (!isValid) {
      throw createHttpError(400, "Input Not Valid");
    }

    const login = await authService.login(email, password);

    res.json(login);
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message,
    });
  }
});

export default router;
