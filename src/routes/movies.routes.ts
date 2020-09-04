import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateMovieService from '../services/CreateMovieService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const moviesRouter = Router();


moviesRouter.get('/', async (request, response) => {
  try {
    const movieRepository = getRepository("Movie");
    const movie = await movieRepository.find();

    return response.json(movie);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

//MUST AUTHENTICATE AS MANAGER
moviesRouter.post('/', async (request, response) => {
  try {
    const { title, image, description, duration, animation, audio } = request.body;

    const createMovieService = new CreateMovieService();
    const room = await createMovieService.execute({title, image, description, duration, animation, audio});

    return response.json(room);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default moviesRouter;
