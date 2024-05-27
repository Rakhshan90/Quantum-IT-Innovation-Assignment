const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: 'String',
        required: [true, 'firstName is required'],
    },
    lastName: {
        type: 'String',
        required: [true, 'lastName is required'],
    },
    dob: {
        type: 'String',
        required: [true, 'Date of birth is required'],
    },
    email: {
        type: 'String',
        required: [true, 'Email is required'],
    },
    password: {
        type: 'String',
        required: [true, 'Password is required'],
    }
},
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    });


// Hashing user password
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) next();

    // Hash user password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isPasswordMatch = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// Compiling this user schema into model
const User = mongoose.model('User', userSchema);
module.exports = User;