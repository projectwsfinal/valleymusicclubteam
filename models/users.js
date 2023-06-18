module.exports = (mongoose) => {
    const User = mongoose.model(
        'users',
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
                username: {
                    type: String,
                    required: [true, 'Username required']
                },
                password: {
                    type: String,
                    required: [true, 'Password required']
                },
                email: {
                    type: String,
                    trim: true,
                    lowercase: true,
                    unique: true,
                    validate: {
                        validator: function(v) {
                            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                        },
                        message: 'Please enter a valid email'
                    },
                    required: [true, 'Email required']
                },
                phone: {
                    type: String,
                    validate: {
                        validator: function(v) {
                            return /\d{3}-\d{3}-\d{4}/.test(v);
                        },
                        message: props => `${props.value} is not a valid phone number`
                    },
                    required: [true, 'User phone number required']
                },
                juniorParticipants: {
                    type: Number
                },
                adultParticipants: {
                    type: Number
                },
            },
            { timestamps: true }
        )
    );

    return User;
}

