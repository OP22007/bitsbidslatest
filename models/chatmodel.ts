import mongoose, { Schema, Document, Model } from 'mongoose';

export type Message = {
  senderID: string;
  receiverID: string;
  message: string;
  createdAt: Date;
};

export const messageSchema = new Schema({
  senderID: {
    type: Schema.Types.String,
    required: true,
  },
  receiverID: {
    type: Schema.Types.String,
    required: true,
  },
  message: {
    type: Schema.Types.String,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
    required: true,
  },
});


export interface ChatRoomDocument extends Document {
  chatRoomID: string;
  participants: string[];
  messages: Message[];
}
export type ChatInput ={
    chatID:ChatRoomDocument['chatRoomID'];
    participants:ChatRoomDocument['participants'];
    messages:ChatRoomDocument['messages'];
}

export const chatRoomSchema = new Schema<ChatRoomDocument>({
  chatRoomID: {
    type: String,
    required: true,
    unique: true,
  },
  participants: [{
    type: String,
    required: true,
  }],
  messages: [messageSchema],
});

export const MessageModel: Model<Message> = mongoose.model<Message>('Message', messageSchema);
export const ChatRoomModel: Model<ChatRoomDocument> = mongoose.model<ChatRoomDocument>('ChatRoom', chatRoomSchema);