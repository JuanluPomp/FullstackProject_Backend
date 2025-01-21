import express from 'express'
import {body, param} from 'express-validator'
import { createProducts, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputsErrors } from "./middleware"

const router = express.Router()
/**
 * @swagger
 * components: 
 *  schemas: 
 *      Product:
 *          type: object
 *          properties: 
 *              id: 
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *              name: 
 *                  type: string
 *                  description: The Product Name
 *                  example: Monitor Curvo de 32 pulgadas 
 *              price:  
 *                  type: number
 *                  description: The Product Price
 *                  example: 300
 *              Availability:  
 *                  type: bolean
 *                  description: The Product Availability
 *                  example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a List of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Product'
 */


//Routing
router.get('/',getProducts)

router.get('/:id',
        param('id').isInt().withMessage('El valor ingresado del ID no es valido'),
    handleInputsErrors,
    getProductById)
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products 
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200: 
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      $ref: '#/components/schemas/Product'
 *          400:
 *              description: 'Bad request'
 *          404:
 *              description: 'Not found' 
 * 
 */
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

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Post a product to the dstabase
 *      tags: 
 *          - Products
 *      description: Send a product to the products table 
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: Monitor curvo de 32 pulgadas
 *                          price:
 *                              type: number
 *                              example: 300
 *      responses:
 *          201:
 *              description: The product has beeen created successfully
 *              content:
 *                  aplication/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request
 */

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
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Edit a product by ID
 *      tags:
 *          - Products
 *      description: Return a modified object when has been modified 
 *      parameters:
 *        - in: path
 *          name: id
 *          dscription: The product ID
 *          required: true
 *          schema: 
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:     
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: Montor curvo de 32 pulgadas
 *                          price:
 *                              type: number
 *                              example: 300
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: The product has been modified successfuly
 *              content:
 *                  aplication/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Not Found
 */
router.patch('/:id', 
    param('id').isInt().withMessage('El valor del id para  la consulta no es valido'),
    handleInputsErrors,
    updateAvailability
)
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update product availability
 *      tags:
 *          - Products
 *      description: Returns de updated availabiliy
 *      parameters:
 *        - in: path
 *          name: id
 *          descripption: The product ID
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: The product availability has been modified
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Product not found
 */
router.delete('/:id', 
    param('id').isInt().withMessage('El valor del id para  la consulta no es valido'),
    handleInputsErrors,
    deleteProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product  by given ID
 *      tags:
 *          - Products
 *      description: Return a comfirmattion message from the deleted product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The product ID
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto eliminado'
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Product not found
 */

export default router

