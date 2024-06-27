import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("BITSBids");
        const productID = req.nextUrl.searchParams.get('productID');
        const userEmail = req.nextUrl.searchParams.get('userEmail');
        const productName = req.nextUrl.searchParams.get('productName');
        const sellerName = req.nextUrl.searchParams.get('sellerName');
        const categories = req.nextUrl.searchParams.getAll('category')
        console.log(categories)
        console.log(categories.length)
        // Initialize query objects
        let productQuery = {};
        if (categories && categories.length > 0&&JSON.stringify(categories)!=JSON.stringify([''])) {
            productQuery.category = { $in: categories };
        }
        if (productName) {
            productQuery.name = { $regex: productName, $options: 'i' };
        }

        let sellerQuery = {};
        if (sellerName) {
            sellerQuery.name = { $regex: sellerName, $options: 'i' };
        }

        // Fetch users based on seller name
        const users = await db.collection('users').find(sellerQuery).toArray();
        const userIds = users.map(user => user.userId); // Corrected from user.userId to user.userID

        // Combine product query with userID filter if any users matched
        if (userIds.length > 0) {
            productQuery.userID = { $in: userIds };
        }
        const products = await db.collection('products').find({}).toArray();
        // Fetch products based on combined query
        const productsBySandPName = await db.collection('products').find(productQuery).toArray();
        const productbyID = await db.collection('products').findOne({productID:productID})
        let userID = await db.collection('users').findOne({email:userEmail})
        if(userID)
        userID = userID.userId;
        const productbyUserID = await db.collection('products').find({userID:userID}).toArray()
        return new NextResponse(JSON.stringify({ products,productsBySandPName,productbyID,productbyUserID }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
