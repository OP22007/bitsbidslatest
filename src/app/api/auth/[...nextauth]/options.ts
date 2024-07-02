import type { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import clientPromise from "@/app/lib/mongodb";
var CryptoTS = require("crypto-ts");
import { NextRequest } from "next/server";
import { AES } from "crypto-ts";
import GoogleProvider from "next-auth/providers/google";
import { nanoid } from "nanoid";

export const options:NextAuthOptions = {
    session:{
        strategy:'jwt',
        maxAge:48*60*60
    },
    providers:[
        CredentialsProvider({
            type:'credentials',
            name:"Credentials",
            credentials:{},
            async authorize(credentials){
                const {email,password} = credentials as {
                    email:string;
                    password:string
                }
                const decryptPassword = (password:string) => {
                    const bytes = CryptoTS.AES.decrypt(password,"BITS00461444#$")
                    let decryptedPass = bytes.toString(CryptoTS.enc.Utf8)
                    console.log(decryptedPass)
                    return decryptedPass
                }
                try{
                    const client = await clientPromise;
                    const db = client.db("BITSBids");
            let user = await db
            .collection("users")
            .findOne({ email: email });
            if(user){
                if(email===user.email && password===decryptPassword(user.password)){
                    const username = user.username
                    const email = user.email
                    const u = await db.collection('users').updateOne({email:email},{$set:{lastLoginAt:new Date()}})
                    return user
                }else{
                    throw new Error('Invalid Credentials')
                    // return null
                }
            }else{
                // res.status(400).json({success:false,error:'User not found'})
                throw new Error('User does not exist')
                // return null
            }
                }catch (error) {
                    console.log("Error: ", error);
                }
            }
        }),GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks:{
        async signIn({account,profile}){
            if(account?.provider=='credentials'){
                return true
            }
            if(account?.provider=='google'){
            if(!profile?.name){
                throw new Error('No profile')
            }
            const client = await clientPromise
            const db = client.db("BITSBids");
            let user = await db
            .collection("users")
            .findOne({ email: profile.email });
            if(!user){
                let u = await db.collection("users").insertOne({
                    userId: nanoid(),
                    name: profile.name,
                    age: 0,
                    phone:0,
                    email: profile.email,
                password: "oauth user",
              });
            }else{
                let u = await db.collection('users').updateOne({
                    email:profile.email
                },{$set:{lastLoginAt:new Date()}})
            }
            return true
        }
        }
    },
    pages:{
        signIn:'/login'
    },
    secret:process.env.NEXTAUTH_SECRET
}