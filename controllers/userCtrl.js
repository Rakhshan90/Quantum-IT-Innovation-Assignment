const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../config/token/generateToken");


const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
    // Check whether the user is already registered
    const userExisted = await User.findOne({ email: req?.body?.email });
    if (userExisted) throw new Error(`User is already registered with this email ${req?.body?.email} address`);
    try {
        const user = await User.create({
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            dob: req?.body?.dob,
            email: req?.body?.email,
            password: req?.body?.password
        });
        const { firstName, lastName, dob, email } = user;
        res.json({ firstName, lastName, dob, email });
    } catch (error) {
        res.json(error);
    }
});

const userLoginCtrl = expressAsyncHandler(async (req, res) => {
    const { email, password } = req?.body;
    const foundUser = await User.findOne({ email });
    if (foundUser && (await foundUser.isPasswordMatch(password))) {
        res.json({
            _id: foundUser?._id,
            firstName: foundUser?.firstName,
            lastName: foundUser?.lastName,
            email: foundUser?.email,
            dob: foundUser?.dob,
            token: generateToken(foundUser?._id),
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
});

const fetchUsersCtrl = expressAsyncHandler(async (req, res)=>{
    try {
        const users = await User.find({});
        // const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.json(error);
    }
})


module.exports = { userRegisterCtrl, userLoginCtrl, fetchUsersCtrl };