const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    sport: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: () => new Date().toISOString().substring(0, 10),
    },
    maxPlayers:{
        type: Number,
        required: true,
    },
    players:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            status: {
                type: String,
                enum: ['pending', 'accepted', 'rejected'],
                default: 'pending',
            },
        },
    ],
});
module.exports = mongoose.model('event', EventSchema);