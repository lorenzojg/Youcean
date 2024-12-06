import { Response } from 'express';
import { checkAndUpdateAccess } from '../services/accessService';
import { AuthRequest } from '../middlewares/authMiddleware';

export async function handleAccessUpdate(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { accessDenied } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Utilisateur non authentifié' });
      return;
    }

    if (typeof accessDenied !== 'boolean') {
      res.status(400).json({ error: 'Le champ accessDenied est requis et doit être un booléen' });
      return;
    }

    await checkAndUpdateAccess(userId, accessDenied);

    res.status(200).json({ message: 'Statut d\'accès mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur interne est survenue' });
  }
}
