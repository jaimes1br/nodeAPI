const request = require("supertest"); //hacer los request necesarios
const app = require("../app");
const mongoose = require("mongoose");

const { userModel } = require("../models");
const { testAuthLogin, testAuthRegister } = require("./helper/helperData");

beforeAll(async() => {
    await userModel.deleteMany({});
});

afterAll(() =>{
    mongoose.connection.close();
});

describe("[AUTH] Esta es la prubea de /api/auth",() =>{
    test("esto debería retornar 404", async() =>{
        const response = await request(app)
        .post('/api/auth/login')
        .send(testAuthLogin)

        expect(response.statusCode).toEqual(404)
    })

    test("esto debería retornar 201 Si se registro", async() =>{
        const response = await request(app)
        .post('/api/auth/register')
        .send(testAuthRegister);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("data.token");
        expect(response.body).toHaveProperty("data.user");
    } );

    test("esto deberia de retornar password no valido 401", async () => {
        const newTestAuthLogin = {...testAuthLogin, password:"22222222"}
        const response = await request(app)
          .post("/api/auth/login")
          .send(newTestAuthLogin);
      
        expect(response.statusCode).toEqual(401);
      });
      
    test("esto deberia de retornar 200 login exitoso", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send(testAuthRegister);
        
        expect(response.statusCode).toEqual(200);
    });
});