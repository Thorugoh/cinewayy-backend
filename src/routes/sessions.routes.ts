import { Router } from 'express';
import { getRepository } from 'typeorm';

//import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateSessionService from '../services/CreateSessionService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const sessionsRouter = Router();

//const transactionsRepository = new TransactionsRepository();

sessionsRouter.get('/', async (request, response) => {
  try {
    const sessionRepository = getRepository("Session");
    const room = await sessionRepository.find();

    return response.json(room);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

//MUST AUTHENTICATE AS MANAGER
sessionsRouter.post('/', async (request, response) => {
  try {
    const { showtime, room_id, movie_id } = request.body;

    const createSessionService = new CreateSessionService();
    const room = await createSessionService.execute({showtime, room_id, movie_id});

    return response.json(room);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
