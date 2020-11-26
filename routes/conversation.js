const express = require("express");
const router = express.Router();
const Conversation = require('../models/Conversation');

router.post('/add', (req, res) => {
    const conversation = new Conversation({
        members: req.body.members, // array
        messages: []
    })
})

router.delete('/delete/:id', (req, res) => {
        
})

module.exports = router;