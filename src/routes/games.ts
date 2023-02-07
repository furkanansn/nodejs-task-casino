import { Request, NextFunction } from "express";
import IResponse from "../interfaces/response";
import express from "express";
import controller from "../controllers/gamesController";

const router = express.Router();

router.get("/", controller.getGames);

router.get("/slot", controller.slotMachine);

export default router;
