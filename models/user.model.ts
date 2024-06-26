import mongoose, { Schema, Model, Document } from 'mongoose';

// Define the message schema for better reusability and clarity




export type UserDocument = Document & {
  id: string;
  name: string;
  age: number;
  phone: number;
  email: string;
  password: string;
  enabled: boolean;
};

export type UserInput = {
  id: UserDocument['id'];
  name: UserDocument['name'];
  age: UserDocument['age'];
  phone: UserDocument['phone'];
  email: UserDocument['email'];
  password: UserDocument['password'];
  enabled: UserDocument['enabled'];
};

 export const usersSchema = new Schema(
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

export const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);


