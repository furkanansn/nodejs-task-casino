import { NextFunction,Request } from "express";
import IResponse from "../interfaces/response";
import service from "../services/authService";

const register = async (req: Request, res: IResponse, next: NextFunction) => {
  try {
    let response = await service.register(req);
    res.json(response);
  } catch (e) {
    next(e);
  }
}

const login = async (req: Request, res: IResponse, next: NextFunction) => {
  try {
    let response = await service.login(req);
    res.json(response);
  } catch (e) {
    next(e);
  }
}


export default { register, login };
