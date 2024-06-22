import clientPromise from "@/app/lib/mongodb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("BITSBids");
        const senderID = req.nextUrl.searchParams.get('senderID');
        const receiverID = req.nextUrl.searchParams.get('receiverID');

        // console.log(`Sender ID: ${senderID}, Receiver ID: ${receiverID}`);

        if (!senderID || !receiverID) {
            return new Response(JSON.stringify({ error: "Missing senderID or receiverID" }), { status: 400 });
        }

        const sender = await db.collection('users').findOne({ email: senderID });

        if (sender && sender.messages) {
            const messages = sender.messages.filter((msg: any) => msg.receiverID === receiverID||msg.receiverID===senderID);
            // console.log(messages);

            return new Response(JSON.stringify({ messages }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: "Sender not found or no messages" }), { status: 404 });
        }
    } catch (error) {
        console.error("Error retrieving messages:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
