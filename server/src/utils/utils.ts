import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const SALT_ROUNDS = 10;

export function generateUniqueUsername(firstName: string, lastName: string): string {
  /**
   * @brief Generate a unique username
   * @param firstName: first name of the user
   * @param lastName: last name of the user
   * @return unique username
   */
  return `${firstName.toLowerCase().charAt(0)}.${lastName.toLowerCase()}`;
}

export function validateEmail(email: string): boolean {
  /**
   * @brief Validate an email
   * @param email: email to validate
   * @return true if the email is valid, false otherwise
   */
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
  /**
   * @brief Validate a password
   * @param password: password to validate
   * @return true if the password is valid, false otherwise
   */
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

export async function hashPassword(password: string): Promise<string> {
  /**
   * @brief Hash a password
   * @param password: password to hash
   * @return hashed password
   */
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  /**
   * @brief Verify a password
   * @param password: password to verify
   * @param hash: hashed password
   * @return true if the password is valid, false otherwise
   */
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: string, userEmail: string): string {
  /**
   * @brief Generate a token
   * @param userId: id of the user
   * @param userEmail: email of the user
   * @return token
   */
  return jwt.sign({ id: userId, email: userEmail }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): { id: string, email: string } {
  /**
   * @brief Verify a token
   * @param token: token to verify
   * @return user id and email
   */
  return jwt.verify(token, JWT_SECRET) as { id: string, email: string };
}