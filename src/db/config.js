
import mongoose from "mongoose";

// const connectionDB = async() => {

//     if (!process.env.MONGO_URL) {
//         console.error(`Database URL not defined in .env `);
//         process.exit(1);
//     }    

//     try {
//         const connection = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
//         console.log(`MongoDB connected : ${connection.connection.host}`);
        
//     } catch (error) {
//         console.error("Databse connection Error : ", error.message);
//         process.exit(1) 
//     }
// }

const connectionDB = async() => {

    if (!process.env.MONGO_URL) {
        console.error(`Database URL not defined in .env `);
        process.exit(1);
    }    

    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
        console.log(`MongoDB connected : ${connection.connection.host}`);
        
    } catch (error) {
        console.error("Databse connection Error : ", error.message);
        process.exit(1) 
    }
}




export default connectionDB;