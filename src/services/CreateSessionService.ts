import Room from "../models/Room";
import Movie from "../models/Movie";
import Session from "../models/Session";
import { getRepository } from "typeorm";

import AppError from '../errors/AppError';
interface Request{
    showtime: Date,
    room_id: string;
    movie_id: string;
}

class CreateSessionService {
    
    public async execute({showtime, room_id, movie_id}: Request):Promise<Session> {
        
        const sessionRepository = getRepository(Session);

        const session = sessionRepository.create({
            showtime,
            room_id,
            movie_id
        });

        await sessionRepository.save(session);

        return session;
    }
    
}

export default CreateSessionService;