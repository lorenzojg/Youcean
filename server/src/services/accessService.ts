import prisma from '../utils/prisma';

export async function checkAndUpdateAccess(userId: string, accessDenied: boolean): Promise<void> {
  if (accessDenied) {
    const blockUntil = new Date(Date.now() + 10 * 60 * 1000);
    await prisma.user.update({
      where: { id: userId },
      data: {
        accessDenied: true,
        accessDeniedUntil: blockUntil,
      },
    });
  } else {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user?.accessDeniedUntil && user.accessDeniedUntil <= new Date()) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          accessDenied: false,
          accessDeniedUntil: null,
        },
      });
    }
  }
}
