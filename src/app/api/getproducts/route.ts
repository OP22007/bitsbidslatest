import clientPromise from "@/app/lib/mongodb";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    const client = await clientPromise
    const db = client.db("BITSBids")
    const email = req.nextUrl.searchParams.get('email')
    const user = await db.collection('users').findOne({email:email})
    const products = await db.collection('products').find({userID:user?.userId}).toArray()
    const allproducts = await db.collection('products').find({}).toArray();
    const totalBids = allproducts.reduce((acc, product) => {
        return acc + (product.bids ? product.bids.length : 0);
    }, 0);
    return new Response(JSON.stringify({numberOfProducts:products.length,totalBids:totalBids}))
}