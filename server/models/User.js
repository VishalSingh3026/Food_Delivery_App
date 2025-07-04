const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        cartData: {
            type: Object,
            default: {},
        },
    },
    {
        minimize: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);