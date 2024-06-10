import ChatModel,{Message,ChatDocument,chatSchema,Conversation,ChatInput} from "../../../../models/chat.models";
import clientPromise from "../../lib/mongodb";
import { nanoid } from "nanoid";
import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";


export async function POST(req:NextRequest){
    const session = await getServerSession(options)
    console.log(session)
   // return new Response(session)
     const newChat  = await req.json();
     console.log(newChat.conversation[0].participantName)
    // if (!image||!name||!description||!category||!price) {
    //     return new Response(JSON.stringify({ message: 'The fields name,description and category are required' }))
    // }r


    const username = newChat.username;
    const conversation =newChat.conversation
    const content = newChat.conversation[0].messages[0].content;
    const participantEmail = newChat.conversation[0].participantEmail
    const participantName = newChat.conversation[0].participantName
    const userEmail =newChat.userEmail;
    console.log(userEmail)
    const client = await clientPromise;
  
   if(newChat){
    const db = client.db("BITSBids");
     let chatBlock = await db.collection("chats").findOne({userEmail:`${userEmail}`})
     if(!chatBlock)
      { 
        const chat : ChatInput={
          username,
          userEmail ,
          conversation
      
        };
      
        let c = await db.collection("chats").insertOne({
          username:chat.username,
          userEmail:chat.userEmail ,
          conversation:chat.conversation
        });
        console.log("creating a new chatBlock");
       
      }
      else
      {
        console.log(chatBlock.conversation[0].participantEmail)
        const conversationIndex =chatBlock.conversation.findIndex((conversation)=>
          conversation.participantName === participantName &&
          conversation.participantEmail === participantEmail
        );
        console.log(conversationIndex)
        if (conversationIndex !== -1) {
              // If the conversation exists, add the new message
              chatBlock.conversation[conversationIndex].messages.push({
                content:content,
                timestamp: new Date().toISOString(),
                sender: username,
              
              });
              const updateResult = await db.collection("chats").updateOne(
                { userEmail },
                { $set: { conversation: chatBlock.conversation } }
              );
              console.log("conversation found inserting message "+conversationIndex) 
        
              if (updateResult.modifiedCount === 1) {
                return NextResponse.json({ success: true, message: 'Message added to conversation' });
              } 
                }
      else {
        // If the conversation doesn't exist, create a new one

        console.log("conversation not found creating a new chatroom ") 
        chatBlock.conversation.push({
          participantName,
          participantEmail,
          messages: [
            {
              sender: username,
              content,
              timestamp: new Date().toISOString(),
            },
          ],
        });
        
     
        const updateResult = await db.collection("chats").updateOne(
          { userEmail },
          { $set: { conversation: chatBlock.conversation } }
        );
       
  
        if (updateResult.modifiedCount === 1) {
          return NextResponse.json({ success: true, message: 'Message added to conversation' });
        } 
      }
      
    //     c.conversations[conversationIndex].messages.push({
    //       sender: username,
    //       content,
    //       timestamp: new Date().toISOString(),
    //     });
    //   }
      // const conversationIndex = chatBlock.conversations.findIndex(
      //   (conversation) =>
      //     conversation.participantName === participantName &&
      //     conversation.participantEmail === participantEmail
      // );
    //   console.log(conversationIndex)
    //   if (conversationIndex !== -1) {
    //     // If the conversation exists, add the new message
    //     chat.conversations[conversationIndex].messages.push({
    //       sender: username,
    //       content,
    //       timestamp: new Date().toISOString(),
    //     });
  
    // console.log(chat)
    //   // Save the updated chat document
    //   await chat.save();
      

    //  };
    //  const db = client.db("BITSBids");
    //        let p = await db.collection("chats").insertOne({
    //             userID:productInput.userID,
    //             productID: productInput.productID,
    //             image:productInput.image,
    //             name: productInput.name,
    //             price:productInput.price,
    //             description: productInput.description,
    //             category: productInput.category,
    //       });
    //       console.log(p);
    //       return new NextResponse(JSON.stringify({ success: "Success" }))
    // }
    // }

    }
    
  }
  return new Response (JSON.stringify({ success: "Success" }))
}
