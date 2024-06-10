import clientPromise from "@/app/lib/mongodb";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){

    const email = req.nextUrl.searchParams.get('email');
    console.log(email)
    if(!email)
        {
            console.log("dfadsiofh")
        }
    const client = await clientPromise
    const db = client.db("BITSBids")
    const chatBlock= await db.collection('chats').findOne({userEmail:`${email}`})
      if(chatBlock)
    return new Response(JSON.stringify({chatBlock:chatBlock}))
else
 return new Response("Your previous chats appear here");
}