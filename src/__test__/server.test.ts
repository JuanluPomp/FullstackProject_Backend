
import server from "../server"
import  request  from "supertest"

describe('GET /api', ()=>{
    it('should send back a json response', async ()=>{
        const res = await request(server).get('/api')
        expect(res.status).toBe(200)
        //con el "(res.headers['content-type'])" se accede al contenido del json de una peticion de nuestra api
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('desde el get /api')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde nuestra api')
    })
})