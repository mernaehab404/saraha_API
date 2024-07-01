import Joi from "joi";
import { Message } from "../../../database/models/message.model.js"
import jwt, { decode } from "jsonwebtoken"

const messageSchema = Joi.object({
    receiverId: Joi.string().required(),
    content: Joi.string().required(),
  });
  
  const idSchema = Joi.object({
    id: Joi.string().required(),
  });

const sendMessage=async(req,res)=>{
    try {
        const { error } = messageSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
        let message= await Message.insertMany(req.body)
        res.status(201).json({ message: 'Message added successfully', message });
      } catch (error) {
        res.status(500).json({ message: 'Failed to add message', error: error.message });
      }
    };


  
      const getMessages = async (req, res) => {
        try {
          const receiverId = req.body.receiverId; 
      
          // Ensure receiverId matches authenticated user's userId
          if (receiverId !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized access to messages' });
          }
      
          const messages = await Message.find({ receiverId });
          res.status(200).json({ message: 'Messages fetched successfully', messages });
        } catch (error) {
          res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
        }
      };
       

      const deleteMessage = async (req, res) => {
        try {
          const messageId = req.params.id;
      
          // Find the message and validate existence
          const message = await Message.findOneAndDelete({
            _id: messageId,
            receiverId: req.user.userId  // Ensure only the message owner can delete
          });
      
          if (!message) {
            return res.status(404).json({ message: 'Message not found or unauthorized to delete' });
          }
      
          res.status(200).json({ message: 'Message deleted successfully', deletedMessage: message });
        } catch (error) {
          res.status(500).json({ message: 'Failed to delete message', error: error.message });
        }
      };
      
export{
    sendMessage,
    getMessages,
    deleteMessage
}