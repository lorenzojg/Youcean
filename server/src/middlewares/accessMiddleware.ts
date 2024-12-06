import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';

interface AuthenticatedRequest extends Request {
  user?: {
    id?: string;
  };
}

export async function checkAccessMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Utilisateur non authentifié' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user?.accessDenied) {
      if (user.accessDeniedUntil && user.accessDeniedUntil > new Date()) {
        res.status(403).json({ error: 'Accès refusé temporairement' });
        return;
      }

      // Débloque l'accès si le temps de blocage est écoulé
      await prisma.user.update({
        where: { id: userId },
        data: {
          accessDenied: false,
          accessDeniedUntil: null,
        },
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Une erreur interne est survenue' });
  }
}
