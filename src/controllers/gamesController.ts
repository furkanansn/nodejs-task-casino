import { NextFunction, Request } from "express";
import IResponse from "../interfaces/response";
import service from "../services/gamesService";

const getGames = async (req: Request, res: IResponse, next: NextFunction) => {
  try {
    let response = await service.getGames(req);
    res.json(response);
  } catch (e) {
    next(e);
  }
};

const slotMachine = async (
  req: Request,
  res: IResponse,
  next: NextFunction
) => {
  try {
    let response = await service.slotMachine(req);
    res.json(response);
  } catch (e) {
    next(e);
  }
};

export default { getGames, slotMachine };
