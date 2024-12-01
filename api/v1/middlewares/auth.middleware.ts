import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

interface CustomRequest extends Request {
    user?: any; // Or more specifically, your User document type
}
export const requireAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.headers.authorization) {
    res
      .status(401)
      .json({ error: "You must be logged in to access this route" });
    return;
  } else {
    // const decodedToken=jwt.verify(token, process.env.JWT_SECRET);
    // if(!decodedToken){
    //     return res.status(403).json({error: 'Access denied'});
    // }
    // req.user=decodedToken.user;
    const token: string = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({ token: token, deleted: false }).select(
      "-password"
    );
    if (!user) {
      res.status(403).json({ error: "Access denied" });
      return;
    }
    req.user = user;
    next();
  }

};
