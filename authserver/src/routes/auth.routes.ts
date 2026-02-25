import { Router } from 'express';
import { login, logout, me, refresh, register } from '#controllers';
import { validateBodyZod } from '#middleware';
import { loginSchema, registerSchema, refreshTokenSchema } from '#schemas';

const authRoutes = Router();

authRoutes.post('/register', validateBodyZod(registerSchema), register);

authRoutes.post('/login', validateBodyZod(loginSchema), login);

authRoutes.post('/refresh', validateBodyZod(refreshTokenSchema), refresh);

authRoutes.post('/logout', validateBodyZod(refreshTokenSchema), logout);

authRoutes.get('/me', me);

export default authRoutes;
