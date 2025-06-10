import express from 'express';
import multer from 'multer';
import { register, login } from '../controllers/authController.js';
const router = express.Router();

const upload = multer();

router.post('/register', upload.none(), register);
router.get('/login', login);

export default router;
