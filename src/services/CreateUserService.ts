import User from "../models/User";
import { getRepository } from "typeorm";
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
interface Request{
    name: string;
    email: string;
    permission: 'client' | 'manager';
    password: string;
}

class CreateUserService {
    
    public async execute({name, email, permission, password}: Request):Promise<User> {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: {email},
        });

        if(checkUserExists !== undefined){
            return checkUserExists;
        }

        const isAValidName = name.length > 4 ? true: false;
        const isAValidEmail = emailRegex.test(email) ? true : false;  
        //TODO VERIFY PASSWORD REGEX (one or more uppercase, 4 or more lowercase, two numbers);

        const isAValidUser = isAValidName && isAValidEmail ? true: false;
        
        if(!isAValidName){
            throw new AppError('Invalid username!')
        }
         
        if(!isAValidEmail){
            throw new AppError('Invalid email!')
        }

        const hashedPassword = await hash(password, 8);
        
        const user = userRepository.create({
            name,
            email,
            permission,
            password: hashedPassword
        });

        await userRepository.save(user);

        return user;
    }
    
}

export default CreateUserService;