const event = require('../controllers/event')

describe('Controller', () => {

    let mRes;
    let mNext;
    beforeEach(() => {
        mRes = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn()};
        mNext = jest.fn();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("Test creating event with no required info", () => {
        const mReq = {body: {firstName: ''}}
        event.createEvent(mReq, mRes, mNext);
        // expect(mRes.status).toBeCalledWith(400);
        // expect(mRes.status().json).toBeCalledWith({message: 'Content cannot be empty!'});
        expect(mRes.status).toHaveBeenCalledWith(400);
        expect(mRes.send).toHaveBeenCalled();
    });
})


