import type { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import clientPromise from "@/app/lib/mongodb";
var CryptoTS = require("crypto-ts");
import { NextRequest } from "next/server";
import { AES } from "crypto-ts";
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
        })
    ],
    pages:{
        signIn:'/login'
    },
    secret:process.env.NEXTAUTH_SECRET
}