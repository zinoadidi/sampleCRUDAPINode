
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const statusCodes = require("../utility/response").statusCodes;
const {logger} = require("../utility/response");

router.post('/register', async (req, res) => {
       await userController.register(req.body)
        .then((result) => {
            return  res.status(result.statusCode).json(result).end();
        }).catch((err) => {
            logger(err);
            return res.status(500).json(err).end();
        });
    }
);
router.post('/authenticate', async (req, res) => {
       await userController.authenticate(req.body)
        .then((result) => {
            return  res.status(result.statusCode).json(result).end();
        }).catch((err) => {
            logger(err);
            return res.status(500).json(err).end();
        });
    }
);
router.get('/', (req, res) => {
    userController.getAllUsers(req.body)
            .then((result) => {
                return  res.status(result.statusCode).json(result).end();
            }).catch((err) => {
            logger(err);
            return res.status(statusCodes.serverError).json(err).end();
        });
    }
);

router.get('/:id', (req, res) => {
        userController.getUserByUniqueID(req.params)
            .then((result) => {
                logger(result);

                return  res.status(result.statusCode).json(result).end();
            }).catch((err) => {
            logger(err);

            return res.status(statusCodes.serverError).json(err).end();
        });
    }
);
router.put('/:id', (req, res, next) => {

        userController.updateUser(req.body)
            .then((result) => {
                logger(result);

                return  res.status(result.statusCode).json(result).end();
            }).catch((err) => {
            logger(err);

            return res.status(statusCodes.serverError).json(err).end();
        });
    }
);


router.put('/updatePassword', (req, res, next) => {

        userController.updatePassword(req)
            .then((result) => {
                logger(result);

                return  res.status(result.statusCode).json(result).end();
            }).catch((err) => {
            logger(err);

            return res.status(util.statusCodes.serverError).json(err).end();
        });
    }
);

router.delete('/:id', (req, res, next) => {

        userController.deleteUser(req.param)
            .then((result) => {
                logger(result);

                return  res.status(result.statusCode).json(result).end();
            }).catch((err) => {
            logger(err);

            return res.status(statusCodes.serverError).json(err).end();
        });
    }
);




module.exports = router;
