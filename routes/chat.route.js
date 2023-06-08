const express = require('express');

const { Chat } = require('../models/chat.model');

const { User } = require('../models/user.model');

const {auth}=require('../middlewares/auth')

const chatRouter = express.Router();

// get all chat

chatRouter.get('/api/getChat',auth, async(req, res) => {
    try {
        let info = await Chat.find()
         .populate('users', '-password')
            .populate('groupAdmin', '-password');
        res.status(200).send({"Message":"Group Info",'Info':info})
    } catch (error) {
        res.status(400).send({ "Message": error.Message });
        console.log(error);
    }
});




chatRouter.post('/api/createGroup',auth,async (req,res) =>{
    var users = JSON.parse(req.body.users);
    users.push(req.user);
try {
    const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate('users', '-password')
        .populate('groupAdmin', '-password');
    res.status(200).send({"Message":"Group Created Successfully",'Group':fullGroupChat})
} catch (error) {
            res.status(400).send({ "Message": error.Message });
        console.log(error);
}

})


module.exports={chatRouter}

