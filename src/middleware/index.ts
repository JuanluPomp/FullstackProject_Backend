import { Response, Request, NextFunction } from "express"
import {body, check, validationResult} from 'express-validator'

export const handleInputsErrors = (req: Request, res: Response, next: NextFunction) =>{
    
    let errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }

    next()
}