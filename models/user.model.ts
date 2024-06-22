import mongoose, { Schema, Model, Document } from 'mongoose';

// Define the message schema for better reusability and clarity
const messageSchema = new Schema({
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

type Message = {
  senderID: string;
  receiverID: string;
  message: string;
  createdAt: Date;
};

type UserDocument = Document & {
  id: string;
  name: string;
  age: number;
  phone: number;
  email: string;
  password: string;
  messages: Message[];
  enabled: boolean;
};

type UserInput = {
  id: UserDocument['id'];
  name: UserDocument['name'];
  age: UserDocument['age'];
  phone: UserDocument['phone'];
  email: UserDocument['email'];
  password: UserDocument['password'];
  messages: UserDocument['messages'];
  enabled: UserDocument['enabled'];
};

const usersSchema = new Schema(
  {
    id: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    age: {
      type: Schema.Types.Number,
      required: true,
    },
    phone: {
      type: Schema.Types.Number,
      unique: true,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    messages: [messageSchema],
    enabled: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    collection: 'users',
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  },
);

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);

export { User, UserInput, UserDocument };
