import { Router } from 'express';
import { login, logout, me, refresh, register } from '#controllers';
// import { validateBodyZod } from '#middleware';
import { loginSchema, registerSchema } from '#schemas'; // TODO: use the schemas for validation

const authRoutes = Router();

authRoutes.post('/register', register);

authRoutes.post('/login', login);

authRoutes.post('/refresh', refresh);

authRoutes.delete('/logout', logout);

authRoutes.get('/me', me);

export default authRoutes;
