import { NextFunction, Response } from "express";
import { HTTP } from "../interface/enums";

export const authRized = (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.session.isAuth) {
      next();
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Very Bad",
      });
    }
  } catch (error) {
    return error;
  }
};
