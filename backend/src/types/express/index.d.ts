import { UserRecord } from 'firebase-admin/auth';

declare global {
  namespace Express {
    interface Request {
      user?: { uid: string };
    }
  }
}