export interface JwtPayload {
  type: 'access' | 'refresh';
  userId?: string;
  isAdmin?: boolean;
}
