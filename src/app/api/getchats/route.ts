import clientPromise from "@/app/lib/mongodb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("BITSBids");
        const ChatID = req.nextUrl.searchParams.get('ChatID')

        // console.log(`Sender ID: ${senderID}, Receiver ID: ${receiverID}`);

     console.log(ChatID)

        const chats = await db.collection('chats').findOne({ ChatID:ChatID });

        if (chats) {
            const messages = chats.messages;
             console.log(messages);

            return new Response(JSON.stringify({ messages }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: ChatID }), { status: 404 });
        }
    } catch (error) {
        console.error("Error retrieving messages:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
