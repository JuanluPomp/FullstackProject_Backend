import express from 'express'
import {body, param} from 'express-validator'
import { createProducts, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputsErrors } from "./middleware"
const router = express.Router()

//Routing
router.get('/',getProducts)
router.get('/:id',
        param('id').isInt().withMessage('El valor ingresado del ID no es valido'),
    handleInputsErrors,
    getProductById)

router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('Valor no valido, ingrese un numero')
        .notEmpty().withMessage('El nombre no puede ir vacío')
        .custom(value => value > 0).withMessage('El valor del precio debe ser mayor a 0'),
    handleInputsErrors,
    createProducts
)

router.put('/:id',
    param('id')
        .isInt().withMessage('El valor del id para  la consulta no es valido'), 
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('Valor no valido, ingrese un numero')
        .notEmpty().withMessage('El nombre no puede ir vacío')
        .custom(value => value > 0).withMessage('El valor del precio debe ser mayor a 0'),
    body('availability')
        .isBoolean().withMessage('El valor que ingreso para la disponibilidad es invalido'),
    handleInputsErrors,
    updateProduct)

router.patch('/:id', 
    param('id').isInt().withMessage('El valor del id para  la consulta no es valido'),
    handleInputsErrors,
    updateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('El valor del id para  la consulta no es valido'),
    handleInputsErrors,
    deleteProduct
)

export default router

