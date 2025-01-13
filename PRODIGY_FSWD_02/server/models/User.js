// import mongoose from "mongoose";
// const userSchema = new mongoose.SchemaType({
//     name:{type:String, required:true},
//     email:{type:String, required:true},
//     password:{type:String, required:true},
//     role:{type:String, enum:['admin','employee'],required:true},
//     profileImage:{type:String},
//     createAt:{type:Date, default:Date.now},
//     UpdateAt:{type:Date, default:Date.now},

    
// })


// const User = mongoose.model("User",userSchema)
// export default User;



import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "employee"], required: true },
    profileImage: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
