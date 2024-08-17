const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true 
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const checkFieldExists = async (model, field, value) => {
    const existingUser = await model.findOne({ [field]: value });
    if (existingUser) {
        throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} already in use`);
    }
};
userSchema.statics.signup = async function (firstname, lastname, username, password) {
    await checkFieldExists(this, 'username', username);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ firstname, lastname, username, password: hash });
    return user;
};

userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username });
    if (!user) {
        throw new Error("Incorrect Credentials");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("Incorrect Credentials");
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);
