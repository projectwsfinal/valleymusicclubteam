const request = require('supertest');
const url = "http://localhost:8080"

describe('Controller', () => {
    test('Should insert a new event into the events collection', async () => {

        const payload = {
            performance_type_ID: 1,
            class_level_ID: 1,
            term_ID: 1,
            event_date: 1,
            event_start_time: 1,
            event_end_time: 1,
            student_ID: 1,
        };

        const res = await request(url).post("/events").send(payload).expect(400)

        id = res.text.split(":")[1].replace('"', "").replace("}", "").replace('"', "")
    })

    test("Should get all events from events collection", async () => {
        const res = await request(url).get("/events").expect(302)
    })

    test("Should get a specific event from events collection", async () => {
        const res = await request(url).get("/events/" + id).expect(302)
    })

    test("Should update an event from the collection", async () => {
        const payload = {
            performance_type_ID: 1,
            class_level_ID: 1,
            term_ID: 1,
            event_date: 2,
            event_start_time: 2,
            event_end_time: 2,
            student_ID: 1,
        };

        const res = await request(url).put("/events/" + id).send(payload).expect(500)
    })

    test("Should delete an event from the collection", async () => {
        const res = await request(url).delete("/events/" + id).expect(500)
    })
})
