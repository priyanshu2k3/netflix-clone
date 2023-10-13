import type { NextApiRequest, NextApiResponse } from 'next'
import { without } from 'lodash'
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'



export default async function handler(  req: NextApiRequest,res: NextApiResponse) {
  try {

    //common checks ⬇️⬇️⬇️
    const {currentUser}= await serverAuth(req,res)
    const {movieId}=req.body;
    const existingMovie= await prismadb.movie.findUnique({
        where:{
            id:movieId,
        }
    })
    if (!existingMovie){
        throw new Error('invalid movie id')
    }
    // end of common checks ⬆️⬆️⬆️ 



    if(req.method === "POST"){
        
        const user= await prismadb.user.update({
            where :{
                email:currentUser.email || "",
            },
            data:{
                favouriteIds:{
                    push:movieId,
                }
            }
        })
        return res.status(200).json(user);
    }
    if(req.method === "DELETE"){
        const updateFavouriteIds=await without(currentUser.favouriteIds,movieId)

        const updatedUser= await prismadb.user.update({
            where :{
                email:currentUser.email || "",
            },
            data:{
                favouriteIds:updateFavouriteIds
            }
        })
        return res.status(200).json(updatedUser);
    }
    return res.status(405).end();
    
  } catch (error) {

    console.log(error,"it is triggered")
    return res.status(500).end();
  }
}
