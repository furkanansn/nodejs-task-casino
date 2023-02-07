import { Request, NextFunction } from 'express';
import IResponse from '../interfaces/response';

const errorHandler = (err : any, req : Request, res : IResponse, next : NextFunction) => {       
    const errMsg = err.message || 'Something went wrong';
    res.json({
        success: false,
        data : null,
        errorMessage : errMsg
    })      
}

export default errorHandler;