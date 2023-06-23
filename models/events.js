module.exports = (mongoose) => {
    const Event = mongoose.model(
        'events',
        mongoose.Schema(
            {
                performance_type_ID: {
                    type: String,
                    required: [true, 'Performance type ID required']
                },
                class_level_ID: {
                    type: String,
                    required: [true, 'Class level ID required']
                },
                term_ID: {
                    type: String,
                    required: [true, 'Term ID required']
                },
                event_date: {
                    type: Date,
                    required: [true, 'Event date required']
                },
                event_start_time: {
                    type: Date,
                    required: [true, 'Event start time required']
                },
                event_end_time: {
                    type: Date,
                    required: [true, 'Event end time required']
                },
                student_ID: {
                    type: String,
                    required: [true, 'Student ID required']
                },
            },
            { timestamps: true }
        )
    );

    return Event;
}


