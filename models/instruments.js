module.exports = (mongoose) => {
    const Instrument = mongoose.model(
        'instruments',
        mongoose.Schema(
            {
                instrument_name: {
                    type: String,
                    required: [true, 'Instrument name required']
                },
             
            },
            { timestamps: true }
        )
    );

    return Instrument;
}


