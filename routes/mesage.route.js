const express = require('express');

const { Chat } = require('../models/chat.model');

const { User } = require('../models/user.model');

const { Message } = require('../models/message.model');

const {auth}=require('../middlewares/auth')

const messageRouter = express.Router();

messageRouter.get('/api/allmesages/:chatiId', auth,async (req, res) => {
    let chatId = req.params.id
    try {
        let allMessages = (await Message.find(chatId))
            .populate('sender', '-password')
            .populate('chat')
        res.status(200).send({ "Message": "Chat fetched Successfully", "Message": allMessages })
    } catch (error) {
        res.status(400).send({ "Message": error.Message });
        console.log(error);
    }
});

messageRouter.post('/api/sendmessage', auth,async (req, res) => {
    const { content, chatId,id } = req.body;
    var newMessage = {
        sender: id,
        content: content,
        chat: chatId
    }

    try {
        var message = await  Message.create(newMessage);
        message = await message.populate('sender', '-password'),
            message = await message.populate('chat')
        // message = await message.populate('message')
        res.status(200).send({'Messge':"Message Sent Successfully"})
        
    } catch (error) {
        res.status(400).send({ "Message": error.Message });
        console.log(error);
    }
});



module.exports={messageRouter}