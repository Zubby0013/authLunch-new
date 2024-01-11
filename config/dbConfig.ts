import {connect} from "mongoose";
import env from "dotenv";
env.config();

const URL: string| undefined =  process.env.DATABASE_URL;

export const dbConfig = async()=>{
    try {
       await connect(URL!).then(()=>{
            console.log("let's go flying 🚀🚀🚀🚀")
            console.log("DB Connected...")
        }).catch(()=> console.error());
    } catch (error) {
        return error;
    }
};