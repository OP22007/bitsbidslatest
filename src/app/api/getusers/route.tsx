import clientPromise from "@/app/lib/mongodb";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    const client = await clientPromise
    const db = client.db("BITSBids")
    const email = req.nextUrl.searchParams.get('email')
    const id = req.nextUrl.searchParams.get('userID');
    const users = await db.collection('users').find({}).toArray()
    const userByEmail = await db.collection('users').findOne({email:email})
    const userByID = await db.collection('users').findOne({userId:id})
    return new Response(JSON.stringify({users:users,numberOfBids:userByEmail?.bids?.length,user:userByEmail,userByID:userByID}))
}