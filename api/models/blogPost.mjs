import mongoose from "mongoose"
const snakeCaseStamps = {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }};


    const Blog = mongoose.model("Blog", new mongoose.Schema({
        _id:{
            type: mongoose.Schema.Types.ObjectId
        },
        title:{
            type: String
        },
        content:{
            type:String
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        totalVotes:{
            type: Number
        },

    }, snakeCaseStamps
    ))

    export default Blog