import { Router } from 'express';
import { getRepository } from 'typeorm';

//import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

//const transactionsRepository = new TransactionsRepository();

usersRouter.get('/', async (request, response) => {
  try {
    const usersRepository = getRepository("User");
    const user = await usersRepository.find();

    return response.json(user);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.post('/', async (request, response) => {
  try {
    const usersRepository = getRepository("User");

    const { name, email, permission, password } = request.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({name, email, permission, password});

    return response.json(user);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
