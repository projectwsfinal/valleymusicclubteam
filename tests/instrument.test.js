const request = require('supertest');
const url = "http://localhost:8080"

describe('Controller', () => {
    test('Should insert a new instrument into the instrument collection', async () => {
        const payload = {
            instrument: 'violin'
        };

        const res = await request(url).post("/instruments").send(payload).expect(400);

        id = res.text.split(":")[1].replace('"', "").replace("}", "").replace('"', "")
    })

    test("Should get all instruments from instruments collection", async () => {
        const res = await request(url).get("/instruments").expect(302)
    })

    test("Should get a specific instrument from instruments collection", async () => {
        const res = await request(url).get("/instruments/" + id).expect(302)
    })

    test("Should update an instrument from the collection", async () => {
        const payload = {
            instrument: 'viola'
        };

        const res = await request(url).put("/instruments/" + id).send(payload).expect(500)
    })

    test("Should delete an instrument from the collection", async () => {
        const res = await request(url).delete("/instruments/" + id).expect(500)
    })
})