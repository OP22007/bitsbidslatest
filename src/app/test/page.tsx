"use client"
import { useEffect,useState } from "react"
import { io } from "socket.io-client"
import { Button,Input } from "@nextui-org/react"
export default function Home(){
    const [socket,setSocket] = useState<any>(undefined)
    const [inbox,setInbox] = useState<any>([])
    const [message,setMessage] = useState("")
    const [roomName,setRoomName] = useState("")
    const handleJoinRoom = ()=>{
        socket.emit("joinRoom",roomName)
    }
    const handleSendMessage = ()=>{
        socket.emit("message",message,roomName)
    }
    useEffect(()=>{
        const socket = io("http://localhost:3001")
        socket.on('message',(message)=>{
            setInbox((inbox:any)=>[...inbox,message])
        })
        setSocket(socket)
    },[])
    return (
        <div>
            {inbox.map((message:string,index:number)=>(
                <div key={index}>{message}</div>
            ))}
            <Input type="text" name='message'value={message} onChange={(e)=>{setMessage(e.target.value)}} />
            <Button variant="ghost" color="success" onClick={handleSendMessage}>Send Message</Button>
            <Input type="text" value={roomName} onChange={(e)=>{setRoomName(e.target.value)}} />
            <Button variant="ghost" color="success" onClick={handleJoinRoom} >Join Room</Button>
        </div>
    )
}