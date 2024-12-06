import prisma from '../utils/prisma';
import { isValid } from 'date-fns';

import { User } from '../types/User';
import { ValidationError, AlreadyExistsError, NotFoundError } from '../utils/errors';
import { validateEmail, validatePassword, hashPassword, verifyPassword, generateToken  } from '../utils/utils';

export async function registerUser(user: User): Promise<string> {
  /**
   * @brief Register a new user
   * @param user: user to register
   * @return id of the user
   */
  const existingUserByUsername = await prisma.user.findUnique({ where: { username: user.username } });
  if (existingUserByUsername) {
    throw new AlreadyExistsError('Ce nom d\'utilisateur est déjà utilisé');
  }
  
  const existingUserByEmail = await prisma.user.findUnique({ where: { email: user.email } });
  if (existingUserByEmail) {
    throw new AlreadyExistsError('Cet email est déjà utilisé');
  }

  if (!validateEmail(user.email)) {
    throw new ValidationError('L\'email est invalide');
  }
  
  if (!validatePassword(user.password)) {
    throw new ValidationError('Le mot de passe doit contenir au moins 8 caractères, un chiffre, une lettre majuscule et une lettre minuscule');
  }
  
  if (user.birthDate && !isValid(new Date(user.birthDate))) {
    throw new ValidationError('La date de naissance est invalide');
  }
  
  const hashedPassword = await hashPassword(user.password);
  
  const newUser = await prisma.user.create({
    data: { 
      username: user.username,
      email: user.email,
      password: hashedPassword, 
      firstName: user.firstName, 
      lastName: user.lastName, 
      birthDate: user.birthDate ? new Date(user.birthDate) : null
    },
  });
  return newUser.id;
}

export async function loginUser(identifier: string, password: string): Promise<string> {
  /**
    * @brief Login of a user by email or username and password
    * @param identifier: email or username
    * @param password: password
    * @return token
  */
  if (!identifier || !password) {
    throw new ValidationError('Identifiant et mot de passe requis');
  }
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) {
    throw new NotFoundError('Identifiant ou mot de passe incorrect');
  }

  if (!(await verifyPassword(password, user.password))) {
    throw new ValidationError('Identifiant ou mot de passe incorrect');
  }

  return generateToken(user.id, user.email);
}