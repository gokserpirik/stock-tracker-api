import { Request, Response } from 'express';
import { pool } from '../db/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_change_me';

// 1. REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Hash the password (10 rounds of salt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save to DB
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );

    res.json(newUser.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// 2. LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const user = userResult.rows[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    // Generate Token with email
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// 3. CHANGE PASSWORD
export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; 
    const { oldPassword, newPassword } = req.body;

    // 1. Find the user
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (userResult.rows.length === 0) return res.status(404).json("User not found");
    
    const user = userResult.rows[0];

    // 2. Verify OLD password
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(401).json("Incorrect old password");
    }

    // 3. Hash NEW password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // 4. Update DB
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedNewPassword, 
      userId
    ]);

    res.json({ message: "Password updated successfully" });

  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};