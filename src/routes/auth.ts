import { Request, NextFunction } from "express";
import IResponse from "../interfaces/response";
import express from "express";
import controller from "../controllers/authController";

const router = express.Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

export default router;
