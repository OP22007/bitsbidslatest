import clientPromise from "../../lib/mongodb";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { ChatInput } from "../../../../models/chatmodel";

export async function POST(req: NextRequest) {
    console.log("here")
    try {
        // Get the session
        const session = await getServerSession(options);
        if (!session) {
            return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // Parse the incoming JSON request
        const newChat = await req.json();

        // Generate a unique message ID and set other fields
        const messageID = nanoid();
        console.log(newChat)
        const { ChatID, senderID, receiverID, message } = newChat;
        const createdAt = new Date();

        const chatInput: ChatInput = {
            ChatID,
            participants: { senderID, receiverID },
            messages: [{ id: messageID, content: message, createdAt, senderID }],
        };

        // Get the MongoDB client and database
        const client = await clientPromise;
        const db = client.db("BITSBids");
                
        const chatCollection = db.collection("chats");
        console.log(ChatID)
        const existingChat = await chatCollection.findOne({ ChatID });
              
        if (existingChat) {
            await chatCollection.updateOne(
                { ChatID },
                { $push: { messages: chatInput.messages[0] } }

            );
            return new NextResponse(JSON.stringify({ success: "Message saved successfully" }), { status: 200 });

            console.log("Added a new message to an existing conversation");
        } else {
            await chatCollection.insertOne(chatInput);
            console.log("Created a new chat room");
        }

        console.log("Chat message successfully stored.");
        return new NextResponse(JSON.stringify({ success: "Message saved successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error updating chat:", error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}