const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/send-message', async (req, res, next) => {
    try {
        const data = req.body;
        const response = await messageController.sendMessage(data);
        return res.status(201).json(response);

    }catch (error){
        return res.status(500).json({
            message: 'Error Occurred',
            error,
        })
    }
});

router.get('/get-message', async (req, res, next) => {
    try {
        const data = req.query;
        const response = await messageController.getMessage(data);
        return res.status(200).json(response);

    }catch (error){
        return res.status(500).json({
            message: 'Error Occurred',
            error,
        })
    }
});


module.exports = router;