import mongoose, { Schema, Model, Document } from 'mongoose';

// Define the message schema for better reusability and clarity

type Bid = {
  bidID:string;
  productID:string;
  price:number;
  time:Date;
}
const bidsSchema = new Schema({
  bidID:{
    type:Schema.Types.String,
    required:true,
  },
  productID:{
    type:Schema.Types.String,
    required:true
  },
  price:{
    type:Schema.Types.Number,
    required:true
  },
  time:{
    type:Schema.Types.Date,
    default:new Date(),
    required:true
  }
})


export type UserDocument = Document & {
  id: string;
  name: string;
  age: number;
  phone: number;
  email: string;
  password: string;
  createdAt:Date;
  lastLoginAt:Date;
  isPremium: boolean;
  bids:Bid[]
};

export type UserInput = {
  id: UserDocument['id'];
  name: UserDocument['name'];
  age: UserDocument['age'];
  phone: UserDocument['phone'];
  email: UserDocument['email'];
  password: UserDocument['password'];
  isPremium: UserDocument['isPremium'];
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
    createdAt:{
      type:Schema.Types.Date,
      required:true,
      default:new Date()
    },
    lastLoginAt:{
      type:Schema.Types.Date,
      required:true,
    },
    isPremium: {
      type: Schema.Types.Boolean,
      default: false,
    },
    bids:[bidsSchema]
  },
  {
    collection: 'users',
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  },
);

export const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);


