import { Router } from 'express';

import usersRouter from './users.routes';
import roomsRouter from './rooms.routes';
import moviesRouter from './movies.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/rooms', roomsRouter);
routes.use('/movies', moviesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
