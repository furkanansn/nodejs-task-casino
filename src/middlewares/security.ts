import { NextFunction, Request } from "express";
import IResponse from "../interfaces/response";
import jwt from "jsonwebtoken";

const security = (req: Request, res: IResponse, next: NextFunction) => {
  const secret = process.env.SECRET_KEY as string;
  const token = req.headers["x-access-token"]?.toString();
  if (!token) {
    res.json({
      success: false,
      data: null,
      errorMessage: "Unauthorized Access",
    });
  } else {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        res.json({
          success: false,
          data: null,
          errorMessage: "Unauthorized Access",
        });
      } else {
        (<any>req).user = decoded;        
        next();
      }
    });
  }
};

export default security;