// import mongoose from "mongoose";

// const connectToDatabase = async()=>{
//     try{
//         await mongoose.connect(process.env.MONGODB_URL)
//     }catch(error){
//         console.log(error)
//     }
// }

// export default connectToDatabase;


import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectToDatabase;

