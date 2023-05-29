import mongoose from "mongoose";
const MONGODB:any = process.env.MONGO_URL || "mongodb+srv://tecorb:kumartec123@tecorb.juv3dbp.mongodb.net/GraphQL_Node?retryWrites=true&w=majority"
const mongodb_connect = ()=>{
    mongoose.connect(MONGODB)
    .then(() =>console.log('MongoDB Connected Successfully'))
    .catch((err)=>console.log('MongoDB Connection Failed'))
}

export default mongodb_connect;

