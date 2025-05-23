import { Request, Response, NextFunction } from 'express';
import admin from '../firebase/configSnippet';

export async function expressAuthentication(
  req: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === 'firebase') {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("Cabeçalho Authorization ausente ou inválido");
    }

    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    
    req.user = { uid: decoded.uid };
    
    return decoded;
  }
  throw new Error("Esquema de segurança não suportado");
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    await expressAuthentication(req, 'firebase', []);
    next();
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}