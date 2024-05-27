const express = require('express');
const { userRegisterCtrl, userLoginCtrl, fetchUsersCtrl } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');


const userRouter = express.Router();

userRouter.post('/register', userRegisterCtrl);
userRouter.post('/login', userLoginCtrl);
userRouter.get('/', authMiddleware, fetchUsersCtrl);


module.exports = userRouter;