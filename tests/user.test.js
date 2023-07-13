// const user = require('../controllers/user');

// describe('Controller', () => {

//     let mRes;
//     let mNext;
//     beforeEach(() => {
//         mRes = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn()};
//         mNext = jest.fn();
//     });
//     afterEach(() => {
//         jest.resetAllMocks();
//     });

//     test("Test creating user with no required info", () => {
//         const mReq = {body: {firstName: ''}}
//         user.createUser(mReq, mRes, mNext);
//         // expect(mRes.status).toBeCalledWith(400);
//         // expect(mRes.status().json).toBeCalledWith({message: 'Content cannot be empty!'});
//         expect(mRes.status).toHaveBeenCalledWith(400);
//         expect(mRes.send).toHaveBeenCalled();
//     });

//     test("Test creating user with all required info", () => {
//         const mReq = {body: {firstName: 'test', middleName: 'test', lastName: 'test', username: 'testname', password: 'test', email: 'test@test.com', phone: '222-222-2222', juniorParticipants: 5, adultParticipants: 5}}
//         user.createUser(mReq, mRes, mNext);
//         // expect(mRes.status).toBeCalledWith(400);
//         // expect(mRes.status().json).toBeCalledWith({message: 'Content cannot be empty!'});
//         expect(mRes.status).toHaveBeenCalledWith(500);
//         expect(mRes.send).toHaveBeenCalled();
//     });

//     test("Test getting all users", () => {
//         const mReq = {body: {}};
//         user.getAllUsers(mReq, mRes);
//         // expect(mRes.status).toBeCalledWith(400);
//         // expect(mRes.status().json).toBeCalledWith({message: 'Content cannot be empty!'});
//         expect(mRes.status).toHaveBeenCalledWith(201);
//         expect(mRes.send).toHaveBeenCalled();
//     });
// })


const request = require('supertest');
const url = "http://localhost:8080"

describe('Controller', () => {
    test('Should insert a new user into the users collection', async () => {

        const payload = {
            firstName: 'test',
            middleName: 'test',
            lastName: 'test',
            username: 'test',
            password: 'test',
            email: 'test@test.com',
            phone: '222-222-2222',
            juniorParticipants: 5,
            adultParticipants: 4
        };

        const res = await request(url).post("/users").send(payload).expect(500)

        id = res.text.split(":")[1].replace('"', "").replace("}", "").replace('"', "")
    })

    test("Should get all users from users collection", async () => {
        const res = await request(url).get("/users").expect(302)
    })

    test("Should get a specific user from users collection", async () => {
        const res = await request(url).get("/users/" + id).expect(302)
    })

    test("Should update a user from the collection", async () => {
        const payload = {
            firstName: 'test2',
            middleName: 'test',
            lastName: 'test2',
            username: 'test2',
            password: 'test2',
            email: 'test2@test.com',
            phone: '222-322-2222',
            juniorParticipants: 5,
            adultParticipants: 4
        };

        const res = await request(url).put("/users/" + id).send(payload).expect(500)
    })

    test("Should delete a user from the collection", async () => {
        const res = await request(url).delete("/users/" + id).expect(500)
    })
})