const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authMiddleware = expressAsyncHandler(async (req, res, next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req?.headers?.authorization.split(' ')[1];
        try {
            if(token){
                const decode = jwt.verify(token, process.env.JWT_KEY);
                const user = await User.findById(decode?._id).select('-password');
                req.user = user;
                next();
            }
        } catch (error) {
            throw new Error('Authorization failed, token is expired, login again');
        }
    }
    else{
        throw new Error("Token is not found, login again");
    }
});

module.exports = authMiddleware;