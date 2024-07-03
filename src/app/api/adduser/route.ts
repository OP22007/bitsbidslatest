/* eslint-disable import/no-anonymous-default-export */
import {User,UserInput} from "../../../../models/user.model";
import clientPromise from "../../lib/mongodb";
import { error } from "console";
import { nanoid } from "nanoid";
import { NextRequest,NextResponse } from "next/server";
import crypto from 'crypto';
import { AES } from "crypto-ts";
var CryptoTS = require("crypto-ts");

const hashPassword = (password:string) => {
    return CryptoTS.AES.encrypt(password,'BITS00461444#$').toString()
}
export async function POST(req:NextRequest){
    const id = nanoid()
    const { name, age,phone, email, password } = await req.json();
    const enabled = true;
    if (!email || !name || !password || !age ||!phone) {
      return new Response (JSON.stringify({ message: 'The fields email, name, password and age are required' }))
    }
  
    const userInput: UserInput = {
      id,
      name,
      age,
      phone,
      email,
      password: hashPassword(password),
      enabled,
    };
    const client = await clientPromise;
    const db = client.db("BITSBids");
        let user = await db
        .collection("users")
        .findOne({ email: email });
        // console.log(user);
        if (!user) {
            let u = await db.collection("users").insertOne({
                userId: nanoid(),
                name: userInput.name,
                age: userInput.age,
                phone: userInput.phone,
                email: userInput.email,
                password: userInput.password,
                createdAt: new Date()
          });
          // console.log(u);
          return new Response (JSON.stringify({ success: "Success" }))
        } else {
          return new Response (JSON.stringify({ error: "User already exists" }))
        }
}
export async function PUT(req: NextRequest) {
  try {
      const { email, name, age, phone } = await req.json();
      console.log(email,name,age,phone)
      if (!email || !name || !age || !phone) {
          return new Response(JSON.stringify({ message: 'The fields email, name, age, and phone are required' }), { status: 400 });
      }

      const client = await clientPromise;
      const db = client.db("BITSBids");

      const result = await db.collection("users").updateOne(
          { email: email },
          { $set: { name: name, age: age, phone: phone } }
      );

      if (result.matchedCount === 0) {
          return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
      }

      return new Response(JSON.stringify({ success: "Success" }), { status: 200 });
  } catch (error) {
      console.error("Error updating user:", error);
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

