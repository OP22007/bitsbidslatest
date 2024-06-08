import clientPromise from "@/app/lib/mongodb";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    const client = await clientPromise
    const db = client.db("BITSBids")
    const users = await db.collection('users').find({}).toArray()
    return new Response(JSON.stringify({users:users}))
}