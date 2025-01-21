import express from 'express'
import colors, { bold } from 'colors'
import router from "./router"
import db from './config/db'

//conectar a la base de datos
export async function connectDB (){
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue.bold('conexion exitosa a la base de datos'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar la base de datos'))
    }
}
connectDB()

//Instancia de express
const server = express()

//Leer datos del server
server.use(express.json())

server.use('/api/products', router)

server.get('/api', (req, res)=>{
    res.json({msg: 'desde el get /api'})
})

export default server
