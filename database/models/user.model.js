import { Schema, model } from "mongoose"

const schema= new Schema({
    username:String,
    email:String,
    password:String,
    otp:String,
    confirmEmail:{
        type:Boolean,
        default:false
    }

  },{
    timestamps:{updatedAt:false},
    versionKey:false
  })
  export const User= model('User',schema)
  