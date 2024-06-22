var CryptoTS = require("crypto-ts");
import { AES } from "crypto-ts";
import { NextRequest,NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
var jwt = require('jsonwebtoken')
export async function POST(req:NextRequest){
    const decryptPassword = (password:string) => {
        const bytes = CryptoTS.AES.decrypt(password,"BITS00461444#$")
        let decryptedPass = bytes.toString(CryptoTS.enc.Utf8)
        // console.log(decryptedPass)
        return decryptedPass
    }
    const client = await clientPromise;
    const body = await req.json()
    // console.log(body)
        const db = client.db("BITSBids");
            let user = await db
            .collection("users")
            .findOne({ email: body.email });
        if(user){
            if(body.email===user.email && body.password===decryptPassword(user.password)){
                const username = user.username
                const email = user.email
                var token = jwt.sign({userid:user.userid,email:user.email,name:user.name},'jwtsecret',{expiresIn:'2d'})
                return new Response(JSON.stringify({success:true,token,email}))
            }else{
                return new Response(JSON.stringify({success:false,error:"Invalid Credentials"}))
            }
        }else{
           return new Response(JSON.stringify({success:false,error:'User not found'}))
        }
}
