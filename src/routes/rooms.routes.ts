import { Router } from 'express';
import { getRepository } from 'typeorm';

//import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateRoomService from '../services/CreateRoomService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const roomsRouter = Router();

//const transactionsRepository = new TransactionsRepository();

roomsRouter.get('/', async (request, response) => {
  try {
    const roomRepository = getRepository("Room");
    const room = await roomRepository.find();

    return response.json(room);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

//MUST AUTHENTICATE AS MANAGER
roomsRouter.post('/', async (request, response) => {
  try {
    const roomRepository = getRepository("Room");

    const { name, seats } = request.body;

    const createRoomService = new CreateRoomService();
    const room = await createRoomService.execute({name, seats});

    return response.json(room);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default roomsRouter;
