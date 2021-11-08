import dotenv from 'dotenv';

dotenv.config();

export const DB_HOST = process.env.DB_HOST;
export const SECRET_JWT = process.env.SECRET_KEY;