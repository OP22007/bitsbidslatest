import clientPromise from "@/app/lib/mongodb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("BITSBids");
  const email = req.nextUrl.searchParams.get("email");
  const id = req.nextUrl.searchParams.get("userID");
  const name = req.nextUrl.searchParams.get("name");
//   console.log(name)
  const query: any = {};
  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }

  const users = await db.collection("users").find({}).toArray();
  const usersByName = await db.collection('users').find(query).toArray();
  const userByEmail = await db.collection("users").findOne({ email: email });
  const userByID = await db.collection("users").findOne({ userId: id });
//   console.log(usersByName)
  return new Response(
    JSON.stringify({
      users: users,
      usersByName: usersByName,
      numberOfBids: userByEmail?.bids?.length,
      user: userByEmail,
      userByID: userByID,
    })
  );
}
