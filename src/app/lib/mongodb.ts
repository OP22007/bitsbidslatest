import { error } from "console";
import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI
const options={}
if(!URI) throw new Error("Please add MONGO URI to the env file")
let client 
let clientPromise:Promise<MongoClient>

if(process.env.NODE_ENV==='development'){
    let globalWithMango = global as typeof globalThis & {
        _mongoClientPromise?:Promise<MongoClient>
    }
    if(!globalWithMango._mongoClientPromise){
        client = new MongoClient(URI,options)
        globalWithMango._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMango._mongoClientPromise
}else{
    client = new MongoClient(URI,options)
    clientPromise=client.connect()
}
export default clientPromise
