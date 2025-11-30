import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// the secret used in the authController
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_change_me';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // 1. Authorization
  // Standard format: "Bearer <token_string>"
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  // 2. Extract the token
  const token = tokenHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied: Malformed Token" });
  }

  try {
    // 3. Verify the signature
    const verified = jwt.verify(token, JWT_SECRET);

    // 4. Attach the id to the request object
    (req as any).user = verified;

    // 5. Open the gate
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};