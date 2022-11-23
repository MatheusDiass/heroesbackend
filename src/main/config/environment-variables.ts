import path from 'path';
import dotenv from 'dotenv';

export const configEnvironmentVariable = () => {
  dotenv.config({
    path:
      process.env.NODE_ENV === 'development'
        ? path.resolve('.env.development')
        : path.resolve('.env.production'),
  });
};
