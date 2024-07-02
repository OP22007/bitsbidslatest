import {Product,ProductInput} from "../../../../models/product.model";
import clientPromise from "../../lib/mongodb";
import { nanoid } from "nanoid";
import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { error } from "console";
export async function PUT(req:NextRequest){
    const session = await getServerSession(options)
    // console.log(session)
    const { productID,price } = await req.json();
    if (!price) {
        return new Response(JSON.stringify({ message: 'The fields name,description and category are required' }))
    }
    const client = await clientPromise;
    if(session){
    let user = await client.db("BITSBids").collection("users").findOne({email:session?.user?.email})
    if(user){
    let product = await client.db("BITSBids").collection('products').findOne({productID:productID})
    if(!product){
        return new NextResponse(JSON.stringify({error:'Product Not Found'}),{status:404});
    }
    let bids = product.bids||[];
    let userbids = user.bids||[];
    const bidderID = user.userId
    const bidID = nanoid()
    const time = new Date()
    console.log(time.getDate())
    const bid = {
        bidID,
        bidderID,
        price,
        time
    }
    const userbid = {
        bidID,
        productID,
        price,
        time
    }
    bids.push(bid);
    userbids.push(userbid)
    const db = client.db("BITSBids");
    console.log(price)
    // console.log(bids)
    await Promise.all([
        db.collection("products").updateOne(
            { productID: productID },
            { $set: { bids:bids,price:price } },
        ),
    ]);
    await Promise.all([
        db.collection("users").updateOne(
            { userId: bidderID },
            { $set: { bids:userbids} },
        ),
    ]);
    console.log("Bid successful");
    //    console.log(b);
          return new NextResponse(JSON.stringify({ success: "Success" }))
    }
    }
}