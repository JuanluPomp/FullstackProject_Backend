import { Request, Response } from 'express';
import Product from '../models/Product.model';


export const createProducts = async (req: Request, res: Response): Promise<void> => {
    // Crear el producto
    const product = await Product.create(req.body);
    res.status(201).json({ data: product }); // Devuelve el producto creado con un status 201
}

export const getProducts = async (req: Request,res: Response) => {
    const products = await Product.findAll({
        order: [
            ['id', 'ASC']
    ],
    limit: 3,
    attributes: {exclude: ['createdAt', 'updatedAt']}
    })
    res.json({data: products})
}

export const getProductById = async (req: Request,res: Response) => {
    const {id} = req.params
        const product = await Product.findByPk(id)
        if(!product){
             res.status(404).json({
                error: 'Elemento no encontrado'
            })
            return
        }
        res.json({data: product})
}

export const updateProduct = async (req: Request,res: Response) => {
    const {id} = req.params
        const product = await Product.findByPk(id)
        if(!product){
             res.status(404).json({
                error: 'Elemento no encontrado'
            })
            return
        }

        //Update Product
        product.availability = req.body.availability
        await product.save()
        res.json({data: product}) 
}

export const updateAvailability = async(req: Request,res: Response) => {
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)
        if(!product){
             res.status(404).json({
                error: 'Elemento no encontrado'
            })
            return
        }

        //Update Product
        product.availability = !product.dataValues.availability
        await product.save()
        res.json({data: product}) 

    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async(req: Request,res: Response) => {
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)
        if(!product){
             res.status(404).json({
                error: 'Elemento no encontrado'
            })
            return
        }
        await product.destroy()
        res.json('Producto Eliminado')
    } catch (error) {
        console.log(error)
    }
}


// export class ProductController {
//     constructor() {}

//     static async createProduct (req: Request, res: Response): Promise<void> {
//         try {
//             const product = await Product.create(req.body);
//             res.json({ data: product });
//         } catch (error) {
//             console.error('Error creating product:', error);
//             res.status(500).json({ error: 'Failed to create product' });
//         }
//     };
// }