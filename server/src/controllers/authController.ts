import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';
import { User } from '../types/User';
import { ValidationError, AlreadyExistsError, NotFoundError } from '../utils/errors';
import { generateUniqueUsername } from '../utils/utils';

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { 
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = req.body;

    let { username, birthDate } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      throw new ValidationError('Tous les champs obligatoires ne sont pas remplis');
    }

    if (confirmPassword !== password) {
      throw new ValidationError('Les mots de passe ne correspondent pas');
    }

    if (birthDate && isNaN(Date.parse(birthDate))) {
      throw new ValidationError('La date de naissance est invalide');
    }

    // Générer un nom d'utilisateur si non fourni
    if (!username) {
      username = generateUniqueUsername(firstName, lastName);
    }

    const user: User = {
      firstName,
      lastName,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      username,
      email,
      password,
    };

    const userId = await registerUser(user);
    res.status(201).json({ id: userId, message: 'Inscription réussie' });
  } catch (error) {
    if (error instanceof AlreadyExistsError || error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Une erreur interne est survenue lors de l\'enregistrement' });
    }
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  /**
   * @brief Handles user login
   */
  try {
    const { identifier, password } = req.body;

    const token = await loginUser(identifier, password);

    res.status(200).json({ token, message: 'Connexion réussie' });
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ValidationError) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Une erreur interne est survenue lors de la connexion' });
    }
  }
}
