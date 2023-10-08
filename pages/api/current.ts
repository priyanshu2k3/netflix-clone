import {NextApiRequest,NextApiResponse} from 'next';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try {

        if (req.method !=="GET"){return res.status(405).end();}

        const currentUser= await serverAuth(req);
        console.log(currentUser,"api")
        // return res.status(200).json({currentUser});
        res.send(currentUser);
    } catch (error) {
        console.log(error,"error in the current.ts")
        return res.status(400).end();
    }
}

// // 
// import { NextApiRequest, NextApiResponse } from "next";
// import serverAuth from "@/lib/serverAuth";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     if (req.method !== 'GET') {
//       return res.status(405).end();
//     }

//     const { currentUser } = await serverAuth(req, res);

//     return res.status(200).json(currentUser);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).end();
//   }
// }