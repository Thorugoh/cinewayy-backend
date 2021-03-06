import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import routes from './routes'
import AppError from './errors/AppError';

import './database';

const app =express();

app.use(express.json());

app.use(routes);


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }

    console.error(err);
    
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })

})


app.get('/', (request, response) => {
    return response.json({message: 'Hello World'});
})

app.listen(3333, () => {
    console.log('Server started on port 3333!');
})