// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request type to include a user property
interface AuthenticatedRequest extends Request {
    user?: any; 
  }
  
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token, 'e0NldHbb/VaWwH7B9J0kPM6B5HSPfKHOkeo4KF5VeQji8neWwTk7oI7kp44awOdPzvHaToJT9hJ36NkNA7VPZ1LIj/7TYLwloPUVTp/VhsAky9874XeQoaZOUUT2I+tOL3L0z8BnEbN2+uyH6kvKkNMUHLKWsRx1OxKf/oXaQt5X9P56lF7rPPuoY3JO97xgFvLaEY6393B1wnEiVWqHPW9xeMz/XOBIDiGQvHTAopAlg61UKJmHRaA6wfAh4HGQldMojIHPAat5zyTUAsjnkGNSV9BfCbCqKiOxbXE3rRC/4R5+2edpMHMLqAjq55B2S636m+Q0kTeRuiSNN+mH2Q==', (err: any, user: any) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
}
