const request = require('supertest');
const url = "http://localhost:8080"

describe('Controller', () => {
    test('Should insert a new student into the students collection', async () => {

        const payload = {
            firstName: 'test',
            middleName: 'test',
            lastName: 'test',
            birthdate: 'test',
            user_id: 'test',
        };

        const res = await request(url).post("/students").send(payload).expect(412)

        id = res.text.split(":")[1].replace('"', "").replace("}", "").replace('"', "")
    })

    test("Should get all students from students collection", async () => {
        const res = await request(url).get("/students").expect(302)
    })

    test("Should get a specific student from students collection", async () => {
        const res = await request(url).get("/students/" + id).expect(302)
    })

    test("Should update a student from the collection", async () => {
        const payload = {
            firstName: 'test2',
            middleName: 'test2',
            lastName: 'test2',
            birthdate: 'test2',
            user_id: 'test2',
        };

        const res = await request(url).put("/students/" + id).send(payload).expect(412)
    })

    test("Should delete a student from the collection", async () => {
        const res = await request(url).delete("/students/" + id).expect(500)
    })
})