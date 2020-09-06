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
    private validatePassword(password: string): boolean {
        let count = 0;
        let atLeastFourLowerCase = /(.*[a-z].*){4,}/;
        let atLeastOneUpperCase = /(.*[A-Z].*){1,}/
        let atLeastTwoNumbers = /(.*[\d].*){2,}/
        if(password.match(atLeastFourLowerCase) && password.match(atLeastOneUpperCase) && password.match(atLeastTwoNumbers))
        {
            return true
        }
        return false;
    }

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
        
        if(!this.validatePassword(password))
            throw new AppError('Invalid Password');

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