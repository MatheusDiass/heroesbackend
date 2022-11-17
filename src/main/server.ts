import express from 'express';
import { createRoutes } from './config/express-routes';

const app = express();
const router = express.Router();

createRoutes(router);

app.use(express.json());
app.use(router);

export default app;
