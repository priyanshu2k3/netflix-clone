import React from 'react'
import prismadb from "@/lib/prismadb"

import serverAuth from '@/lib/serverAuth'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) 
{
    if (req.method !=="GET"){
        return res.status(405).end()
    }

    const {currentUser} =await serverAuth(req)
  try {
    const favouriteMovies = await prismadb.movie.findMany({
        where:{
            id:{
                in:currentUser?.favouriteIds
            }
        }
    })
    return res.status(200).json(favouriteMovies)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
