const { Schema, model } = require('mongoose');
const participantSchema = require('../general/pjSch')

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
        type: [participantSchema.schema],
        default: []
    },
    postId:{
        type:String
    }
})
/**
 * 
 * @param {participantSchema} participant 
 * @returns {Integer} -1: already there, -2 other error
*/
eventDungSchema.methods.addParticipant = function (participant) {
    console.log(participant);
    console.log(this.participants);
        
    if (participant==null|this.participants.findIndex(p=>p.PJName===participant.PJName)!=-1) return -1
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
/**
 * 
 * @param {participantSchema} participant 
 * @returns {Integer} -1: not there, -2 other error
*/
eventDungSchema.methods.removeParticipant = function (participant) {
    console.log(participant);
    console.log(this.participants);
    /**@type {[participantSchema]} */
    const participants=this.participants;
    
    if (participant==null) return -2
    const index= participants.findIndex(p=>p.PJName===participant.PJName)
    if (index==-1) return -1
    try {
        this.participants.splice(index,1);
        this.participantAmount = this.participants.length
        return this.participantAmount;
    }
    catch (error) {
        console.log("Error ading participant:\n" + error);
        return -2
    }
}





module.exports = model('eventDung', eventDungSchema)