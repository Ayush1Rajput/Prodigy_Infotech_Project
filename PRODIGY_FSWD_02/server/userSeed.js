// import User from './models/User.js'
// import bcrypt from 'bcrypt'
// import connectToDatabase from "./db/db.js"

// const userRegister = async ()=>{
//     connectToDatabase()
//     try{
//         const hashPassword = await bcrypt.hash('admin',10)

//         const newUser = new User({
//             name:"Admin",
//             email:"admin@gmail.com",
//             password: hashPassword,
//             role:'admin'
//         })

//         await newUser.save()
//     }
//     catch(error){
//         console.log(error)
//     }
// }

// userRegister();


import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectToDatabase from "./db/db.js";

const userRegister = async () => {
    await connectToDatabase(); // Connect to MongoDB

    try {
        // Hash the password
        const hashPassword = await bcrypt.hash("admin", 10);

        // Create a new user instance
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin",
        });

        // Save the user to the database
        await newUser.save();
        console.log("Admin user seeded successfully!");
    } catch (error) {
        console.error("Error seeding admin user:", error.message);
    } finally {
        process.exit(); // Exit the process after completion
    }
};

userRegister();
