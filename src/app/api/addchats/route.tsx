import clientPromise from "../../lib/mongodb";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function PUT(req: NextRequest) {
    try {
        // Get the session
        const session = await getServerSession(options);
        // console.log(session);

        // Parse the incoming JSON request
        const newChat = await req.json();
        // console.log(newChat.senderID);

        // Generate a unique message ID and set other fields
        const messageID = nanoid();
        const { senderID, receiverID, message } = newChat;
        const createdAt = new Date();

        const chat = {
            messageID,
            senderID,
            receiverID,
            message,
            createdAt,
        };

        // Get the MongoDB client and database
        const client = await clientPromise;
        const db = client.db("BITSBids");

        // Fetch both users in parallel
        const [sender, receiver] = await Promise.all([
            db.collection("users").findOne({ email: senderID }),
            db.collection("users").findOne({ email: receiverID })
        ]);

        if (!sender) {
            return new NextResponse(JSON.stringify({ error: "Sender not found" }), { status: 404 });
        }

        if (!receiver) {
            return new NextResponse(JSON.stringify({ error: "Receiver not found" }), { status: 404 });
        }

        // Update the sender's messages
        const senderMessages = sender.messages || [];
        senderMessages.push(chat);

        // Update the receiver's messages
        const receiverMessages = receiver.messages || [];
        receiverMessages.push(chat);

        // Update both users in parallel
        await Promise.all([
            db.collection("users").updateOne(
                { email: senderID },
                { $set: { messages: senderMessages } }
            ),
            db.collection("users").updateOne(
                { email: receiverID },
                { $set: { messages: receiverMessages } }
            )
        ]);

        console.log("Chat message successfully stored.");

        return new NextResponse(JSON.stringify({ success: "Success" }), { status: 200 });
    } catch (error) {
        console.error("Error updating chat:", error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
