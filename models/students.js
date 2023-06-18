module.exports = (mongoose) => {
    const Student = mongoose.model(
        'students',
        mongoose.Schema(
            {
                firstName: {
                    type: String,
                    required: [true, 'User first name required']
                },
                middleName: {
                    type: String
                },
                lastName: {
                    type: String,
                    required: [true, 'User last name required']
                },
                birthdate: {
                    type: Date
                },
                user_id: {
                    type: String,
                    required: [true, 'User ID required']
                },
            },
            { timestamps: true }
        )
    );

    return Student;
}

