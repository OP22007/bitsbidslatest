import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("BITSBids");
        const products = await db.collection('products').find({}).toArray();

        return new NextResponse(JSON.stringify({ products }), {
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
