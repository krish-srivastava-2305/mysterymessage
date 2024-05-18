import mongoose from "mongoose";

// type connectionObject = {
//     isConnected?: number 
// }
// const connected : connectionObject = {}

export const dbConnect = async () : Promise<void> => {
    if(mongoose.connection.readyState >= 1) {
        console.log("Already Connected")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URL || '')
        console.log("DB connection successful")
        return 
    } catch (error) {
        console.log("DB connection error", error)
        process.exit(1)
    }
}
