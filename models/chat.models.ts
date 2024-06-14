import mongoose, { Schema, Model, Document } from 'mongoose';
export interface Message {
    sender: string,
    content :string,
    timestamp:string
} 
export interface Conversation {
    participantName: string,
    participantEmail: string,
    messages:Message[];
}
export interface ChatDocument extends Document{
    username: string,
    userEmail:string;
    conversations:Conversation[];
}
export type ChatInput = {
    username:ChatDocument['username']
    userEmail : ChatDocument['userEmail'];
    conversation : ChatDocument['conversations'];

  };
export const chatSchema = new Schema<ChatDocument>({
    username: { type: String, required: true },
    userEmail: { type: String, required: true },
    conversations: [
      {
        participantName: { type: String, required: true },
        participantEmail: { type: String, required: true },
        messages: [
          {
            sender: { type: String, required: true },
            content: { type: String, required: true },
            timestamp: { type: String, required: true },
          },
        ],
      },
    ],
  });
  const ChatModel = mongoose.model<ChatDocument>('Chat', chatSchema);

export default ChatModel;