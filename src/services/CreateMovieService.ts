import Movie from "../models/Movie";
import { getRepository } from "typeorm";

import AppError from '../errors/AppError';

interface Request{
    title: string;
    image: string;
    description: string;
    duration: number;
    animation: '3d' | '2d';
    audio: string;
}

class CreateMovieService {
    
    public async execute({title, image, description, duration, animation, audio}: Request):Promise<Movie> {
            
        const movieRepository = getRepository(Movie);

        const checkMovieExists = await movieRepository.findOne({
            where: {title},
        });

        if(checkMovieExists !== undefined){
            return checkMovieExists;
        }
        
        const movie = movieRepository.create({ 
            title, 
            image, 
            description, 
            duration, 
            animation, 
            audio
        });

        await movieRepository.save(movie);

        return movie;
    }
    
}

export default CreateMovieService;