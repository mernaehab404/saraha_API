import mongoose, { Schema, model } from "mongoose";

const schema= new Schema({
    content:String,
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
},{
  timestamps:{createdAt:true},
  versionKey:false
})
export const Message= model('Message',schema)
