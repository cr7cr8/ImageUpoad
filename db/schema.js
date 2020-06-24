const mongoose = require("mongoose");
const { connDB } = require("./db")



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
},
    {
        toObject: { virtuals: true },
        collection: "users",
        //  timestamps: true, 
    }

)


/*
userSchema.virtual("listingBooks", {

    localField: "username",
    foreignField: "owner", ref: "bookList",
    justOne: false
})

const bookListSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, minlength: 1, },
        author: { type: String, },
        owner: { type: String },
        id: { type: Number },
        finish: { type: Boolean, default: false },
        files:{type:Object,default:null},
        picture:{type:Boolean,default:false}

    },
    {
        //timestamps: true,
        collection: "bookList"
    }
)
*/




















const User = connDB.model("users", userSchema);





module.exports = { User }

