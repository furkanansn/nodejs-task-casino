import http from 'http';
import * as dotenv from 'dotenv'
dotenv.config()
import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './middlewares/error_handler';
import auth_routes from './routes/auth';
import games_routes from './routes/games';
import security from './middlewares/security';

const router: Express = express();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors());
router.use(errorHandler);

router.use('/api/auth/', auth_routes);
router.use('/api/games/',security,games_routes);

const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => {});