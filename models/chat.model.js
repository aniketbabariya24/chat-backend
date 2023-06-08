const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    chatName: String,
    isGroupChat: {
        type: Boolean,
        default: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamp: true
    });

const Chat=mongoose.model('Chat',chatSchema);

module.exports={Chat}