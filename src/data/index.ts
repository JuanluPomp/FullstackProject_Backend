import {argv, exit} from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({force: true}) //asi se eliminan los registros de la base de datos
        console.log('datos eliminados correctamente')
        exit(0)
    } catch (error) {
        console.log(error)
        exit(1)
    }
}
if(process.argv[2] === '--clear'){
    clearDB()
}
