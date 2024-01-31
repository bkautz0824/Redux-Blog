import mongoose from "mongoose";
import validator from "validator";
import Blog from "./blogPost.mjs";
const snakeCaseStamps = {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }};

const User = mongoose.model("User", new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        validate: [ validator.isAlphanumeric, "Username can only contain letters and numbers" ]
    },
    password: {
        type: String,
        required: [true, "Enter Password"],
    },
    blogs_created: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Blog
    }],
    blogs_saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Blog
    }]
}, snakeCaseStamps
))

export default User