const validate = require('../middleware/validate');

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

    test("Test creating user with no required info", () => {
        const mReq = {body: {firstName: ''}}
        validate.validateUser(mReq, mRes, mNext);
        // expect(mRes.status).toBeCalledWith(400);
        // expect(mRes.status().json).toBeCalledWith({message: 'Content cannot be empty!'});
        expect(mRes.status).toHaveBeenCalledWith(412);
        expect(mRes.send).toHaveBeenCalled();
    });

    test("Test creating user with all required info", () => {
        const mReq = {body: {firstName: 'test', middleName: '', lastName: 'test', username: 'testname', password: 'test', email: 'test@test.com', phone: '222-222-2222', juniorParticipants: 5, adultParticipants: 5}}
        validate.validateUser(mReq, mRes, mNext);
        // expect(mRes.status).toBeCalledWith(400);
        // expect(mRes.status().json).toBeCalledWith({message: 'Content cannot be empty!'});
        expect(mNext);
    });
})