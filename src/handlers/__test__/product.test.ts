import  request  from "supertest"
import server from "../../server"
describe('POST - TEST /api/products ',() => {

    test('should display validation errors', async ()=> {
        const response = await request(server).post('/api/products').send({

        })
        expect(response.body).toHaveProperty('errors')
        expect(response.status).toBe(400)
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    test('the number value has to be greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            "name": "juan - test",
            "price": 0
        })
        expect(response.body).toHaveProperty('errors')
        expect(response.status).toBe(400)
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)

    })

    test('test the number value has to be a numeric value and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            "name": "juan - testing",
            "price": "gy"
        })
        expect(response.body).toHaveProperty('errors')
        expect(response.status).toBe(400)
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)

    })

    test('should create a new porduct', async () => {
            const response = await request(server).post('/api/products').send({
            "name": "juan 2.0 - testing",
            "price": 300
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toBe('errors')
    })
    
})

describe('GET - TEST  /api/products', () => {

    test('it should check if url api exist', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })

    test('GET  a json response from products', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET - TEST  /api/products/:id', () => {
    test('it should a 404 reponse for a non-existent product', async () => {
        const testID = 2000
        const response = await request(server).get(`/api/products/${testID}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Elemento no encontrado')
    })
    
    test('it shoud a valid value id to /api/product/:id', async () => {
        const testInvalidId = 'hola'
        const response = await request(server).get(`/api/products/${testInvalidId}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El valor ingresado del ID no es valido')

    })

    test('get a single product from /api/products/:id', async () => {
        const existentValidId = 1
        const response = await request(server).get(`/api/products/${existentValidId}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.headers['content-type']).toMatch(/json/)
    } )
})

describe('PUT - TEST /api/product', () => {
    test('should display validation error messages when updating a product', async () => {
        const response = await request(server).put(`/api/products/${1}`).send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(5)
        
        expect(response.status).not.toBe(200)
    })

    test('it shoud be a valid value id into /api/product/:id', async () => {
        const testInvalidId = 'hola'
        const response = await request(server).put(`/api/products/${testInvalidId}`).send({
            "name": "juan",
            "availability": true,
            "price": 300
          })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El valor del id para  la consulta no es valido')

    })

    test('should display validation not-valid price message error', async () => {
        const response = await request(server).put(`/api/products/${1}`).send({
            "name": "juan",
            "availability": true,
            "price": 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El valor del precio debe ser mayor a 0')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('should return a 404 response for a non-existent product', async () => {
        const nonExistentProduct = 2000
        const response = await request(server).put(`/api/products/${nonExistentProduct}`).send({
            "name": "juan",
            "availability": true,
            "price": 300
        })
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Elemento no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('should update a  product with a valid values', async () => {
        const response = await request(server).put(`/api/products/1`).send({
            "name": "juan",
            "availability": true,
            "price": 300
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('PATCH - TEST /api/product', () => {
    test('show retuen a 404 response for a non-existet product', async () => {
        const productID = 2000
        const response = await request(server).patch(`/api/products/${productID}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Elemento no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

   test('should update product availability', async ()=> {
    const response = await request(server).patch('/api/products/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data.availability).toBe(false)

    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(404)
    expect(response.body).not.toHaveProperty('errors')
   })
})

describe('DELETE - TEST /api/product/:id', () => {
    test('show  a error message if the id value is not valid', async () => {
        const response = await request(server).delete('/api/products/not-valid')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El valor del id para  la consulta no es valido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('show return a 404 response for a non.existent product', async () => {
        const noExistentId = 2000
        const response = await request(server).delete(`/api/products/${noExistentId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Elemento no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('it should delete a existent product', async ()=> {
        const response = await request(server).delete('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toBe("Producto Eliminado")

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('PATCH - TEST /api/product/:id', () => {
    test('show retuen a 404 response for a non-existet product', async () => {
        const productID = 2000
        const response = await request(server).patch(`/api/products/${productID}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Elemento no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    // test('should update the product availability', async() => {
    //     const response = await request(server).patch(`/api/products/1`)

    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty('data')
    //     expect(response.body.data.availability).toBe('Elemento no encontrado')

    //     expect(response.status).not.toBe(200)
    //     expect(response.body).not.toHaveProperty('data')
    // })
    
})