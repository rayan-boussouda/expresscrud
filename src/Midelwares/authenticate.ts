import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../Config/auth.config";

// Extend the Request interface to include the userId property
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRoles?: string[];
    }
  }
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token." });
    }
    // console.log("Decoded token:", decoded); // Log the decoded token

    // Attach the decoded user ID to the request for future middleware/routes to use
    req.userId = (decoded as any).id;
    req.userRoles = (decoded as any).roles;
    next();
  });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const roles: string[] = (req as any).userRoles.map((el: any) => el.name);
  console.log(roles);
  if (roles && roles.includes("user")) {
    next(); // User is admin, proceed to the next middleware/route handler
  } else {
    return res.status(403).json({ message: "Requires admin role." }); // User is not admin, send forbidden error
  }
};
