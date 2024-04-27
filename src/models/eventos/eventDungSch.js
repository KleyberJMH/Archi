const { Schema, model } = require('mongoose');
const participantSchema = require('../general/pjSch').Schema

const eventDungSchema = new Schema({
    AuthorID: {
        type: String,
        required: true
    },
    GuildID: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        default: '',
    },
    DungName: {
        type: String,
        required: true
    },
    DesiredPeople: {
        type: Number,
        default: 2,
        required: true
    },
    MinPeople: {
        type: Number,
        default: 1
    },
    MaxPeople: {
        type: Number,
        default: 4
    },
    participantAmount: {
        type: Number,
        default: 0
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventID: {
        type: String,
        required: true
    },
    achievements: {
        type: Boolean,
        default: false
    },
    keyGiven: {
        type: Boolean,
        default: false
    },
    strictDate: {
        type: Boolean,
        default: false
    },
    participants: {
        type: [participantSchema],
        default: []
    }
})
/**
 * 
 * @param {participantSchema} participant 
 * @returns {Integer}
*/
eventDungSchema.methods.addParticipant = function (participant) {
    console.log(participant);
    console.log(this.participants);
    if (participant==null|this.participants.includes(participant)) return -1
    try {
        this.participants.push(participant);
        this.participantAmount = this.participants.length
        return this.participantAmount;
    }
    catch (error) {
        console.log("Error ading participant:\n" + error);
        return -1
    }
}




module.exports = model('eventDung', eventDungSchema)