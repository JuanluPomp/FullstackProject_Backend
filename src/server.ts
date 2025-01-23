import express from 'express'
import colors, { bold } from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
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

//Permitir Conexiones
const corsOptions : CorsOptions = {
    origin:  function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
            console.log('permitir...')
        }else{
            callback(new Error('CORS: acceso denegado'))
        }
    }
}
server.use(cors(corsOptions))

//Leer datos del server
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', router)

//Docs
server.use('/docs', swaggerUi.serve,  swaggerUi.setup(swaggerSpec))

export default server
