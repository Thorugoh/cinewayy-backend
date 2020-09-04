import Room from "../models/Room";
import { getRepository } from "typeorm";

import AppError from '../errors/AppError';
interface Request{
    name: string;
    seats: number;
}

class CreateRoomService {
    
    public async execute({name, seats}: Request):Promise<Room> {
        const roomRepository = getRepository(Room);

        const checkRoomExists = await roomRepository.findOne({
            where: {name},
        });

        if(checkRoomExists !== undefined){
            return checkRoomExists;
        }

       if(seats < 20 || seats > 100)
       {
           throw new AppError('Invalid number of seats');
       }
        
        const room = roomRepository.create({
            name,
            seats
        });

        await roomRepository.save(room);

        return room;
    }
    
}

export default CreateRoomService;