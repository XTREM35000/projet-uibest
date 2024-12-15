// server/utils/auth.ts (fusionné)
import jwt from 'jsonwebtoken';
import { useRuntimeConfig } from '#imports';
import { H3Event, getHeader, createError } from 'h3';
import { User } from '../models/User';

interface JWTPayload {
  userId: string;
  iat: number;
  exp: number;
}

export function generateToken(userId: string): string {
  const config = useRuntimeConfig();
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '24h' });
}

export function verifyToken(token: string): JWTPayload | null {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.jwtSecret) as JWTPayload;
  } catch {
    return null;
  }
}

export async function getUserFromEvent(event: H3Event) {
  const authorizationHeader = getHeader(event, 'authorization');
  const token =
    typeof authorizationHeader === 'string' ? authorizationHeader.replace('Bearer ', '') : undefined;

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  return await User.findById(decoded.userId);
}

export async function requireAuth(event: H3Event) {
  const user = await getUserFromEvent(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Non authentifié',
    });
  }
  return user;
}

export async function requireRole(event: H3Event, roles: string[]) {
  const user = await requireAuth(event);
  if (!roles.includes(user.role)) {
    throw createError({
      statusCode: 403,
      message: 'Accès non autorisé',
    });
  }
  return user;
}
