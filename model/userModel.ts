import { Schema,Document, model } from "mongoose";
import { iUser } from "../interface/interface";

interface iUserData extends iUser, Document{};

const userModel = new Schema<iUserData>(
    {
        email:{
            type: String,
            unique: true,
            required: true
        },
        password:{
            type:String
        },
        schoolName:{
            type: String
        },
        token:{
            type: String
        },
        status:{
            type:String
        },
        schoolCode:{
            type:String,
            unique: true,
        },
        verify:{
            type:Boolean,
            default: false
        },
    },
    {timestamps: true}
);

export default model<iUserData>("users",userModel);