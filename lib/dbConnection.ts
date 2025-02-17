import mongoose from "mongoose";

const mongo_url:string = process.env.MONGO_URL|| "";

export const dbConnection = async() => {
    try{
        const isConnected = mongoose.connection.readyState;
        if(isConnected === 1){
            console.log("Already connected");
        }
        if(isConnected === 2){
            console.log("Establishing connection to the database");
        }

        await mongoose.connect(mongo_url, {
            bufferCommands: true
        });

        console.log("connected");
    }catch(error){
        console.log(error);
    }
}