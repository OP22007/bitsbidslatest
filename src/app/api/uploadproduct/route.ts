import {Product,ProductInput} from "../../../../models/product.model";
import clientPromise from "../../lib/mongodb";
import { nanoid } from "nanoid";
import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
export async function POST(req:NextRequest){
    const session = await getServerSession(options)
    console.log(session)
    const productID = nanoid()
    const { image,name, description,category } = await req.json();
    if (!image||!name||!description||!category) {
        return new Response(JSON.stringify({ message: 'The fields name,description and category are required' }))
    }
    
    const client = await clientPromise;
    if(session){
    let user = await client.db("BITSBids").collection("users").findOne({email:session?.user?.email})
    if(user){
    const userID = user.userId
    const productID = nanoid()
    const productInput: ProductInput = {
        userID,
        productID,
        image,
        name,
        description,
        category
    };
    const db = client.db("BITSBids");
            let p = await db.collection("products").insertOne({
                userID:productInput.userID,
                productID: productInput.productID,
                image:productInput.image,
                name: productInput.name,
                description: productInput.description,
                category: productInput.category,
          });
          console.log(p);
          return new NextResponse(JSON.stringify({ success: "Success" }))
    }
    }
}