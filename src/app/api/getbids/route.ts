import clientPromise from "@/app/lib/mongodb";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    const client = await clientPromise
    const db = client.db("BITSBids")
    const products = await db.collection('products').find({category:'other'}).toArray()
    console.log((products))
    return new Response(JSON.stringify({products:products}))
}