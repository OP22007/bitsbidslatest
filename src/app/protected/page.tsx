
import { options } from '../api/auth/[...nextauth]/options'
import React from 'react'
import { getServerSession } from 'next-auth'

async function Protected() {
    const session = await getServerSession(options)
    console.log(session)
  return (
    <div>{session?.user?.email}</div>
  )
}

export default Protected