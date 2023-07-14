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

    test("Test validating student with all required info", () => {
        const mReq = {body: {firstName: 'test', middleName: '', lastName: 'test', birthdate: '2017-05-13', user_id: 'fdsa54354hhdf'}}
        validate.validateStudent(mReq, mRes, mNext);
        // expect(mRes.status).toBeCalledWith(400);
        // expect(mRes.status().json).toBeCalledWith({message: 'Content cannot be empty!'});
        expect(mNext);
    });

    test("Test validating event with all required info", () => {
        const mReq = {body: {performance_type_ID: 'ghre4353', class_level_ID: 'g5', term_ID: 'spring', event_date: '2017-05-13', event_start_time: '2017-05-13', event_end_time: '2017-05-13', student_ID: 'fgret543543'}}
        validate.validateEvent(mReq, mRes, mNext);
        // expect(mRes.status).toBeCalledWith(400);
        // expect(mRes.status().json).toBeCalledWith({message: 'Content cannot be empty!'});
        expect(mNext);
    });

    test("Test validating event with all required info", () => {
        const mReq = {body: {instrument: 'violin'}}
        validate.validateInstrument(mReq, mRes, mNext);
        // expect(mRes.status).toBeCalledWith(400);
        // expect(mRes.status().json).toBeCalledWith({message: 'Content cannot be empty!'});
        expect(mNext);
    });
})