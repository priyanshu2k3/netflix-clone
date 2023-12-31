import Input from "@/components/Input";
import {useState,useCallback} from "react";
import axios from "axios"
import {signIn} from 'next-auth/react';

import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa'
import { callbackify } from "util";
import Image from "next/image";

const Auth =()=>{
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [variant,setVariant]=useState("login");



    const toggleVariant=useCallback(()=>{setVariant((currentVariant)=> currentVariant ==="login" ? "register" : "login");},[])

    
    const login =useCallback(async ()=>{
        try {
            await signIn("credentials",{email,password,callbackUrl:'/'})
        } catch (error) {
            console.log(error,"something went wrong ")
        }
            },[email,password])

    
    const register =useCallback(async()=>{
        try {
            await axios.post('/api/register',{
                email,
                name,
                password,
            })
            login();
        } catch (error) {
            console.log(error,"error in the auth.js")
        }

    },[email,name,password,login])


    return(
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <Image src="/images/logo.png" className="h-12" height={12} width={100} alt="logo"/>
                    <div className="flex justify-center ">
                        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-e-md rounded-md w-full">
                            <h2 className="text-white text-4xl mb-8 font-semibold">
                            {(variant==="login" && "Login")|| "Register"}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {(variant==="register" && 
                                <Input label="name" id="name" onChange={(event:any)=>{setName(event.target.value)}} type="name" value={name}/>
                                )}
                                <Input label="Email" id="email" onChange={(event:any)=>{setEmail(event.target.value)}} type="email" value={email}/>
                                
                                <Input label="Password" id="password" onChange={(event:any)=>{setPassword(event.target.value)}} type="password" value={password}/>
                                
                            </div>
                            <button onClick={(variant==="login" && login)|| register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                                {(variant==="login" && "Login")|| "SignUp"}
                            </button>
                            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                                <div onClick={()=>{signIn('google',{callbackUrl:'/'})}}className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursir-pointer hover:opacity-80 transition">
                                    <FcGoogle size={80}/>                                     
                                </div>
                                <div onClick={()=>{signIn('github',{callbackUrl:'/'})}} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursir-pointer hover:opacity-80 transition">
                                    <FaGithub size={80}/>                                     
                                </div>
                            </div>
                            <p className="text-neutral-500 mt-12">
                            {(variant==="login" && "First time using Netflix?")|| "Already have account?"} 
                                <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">{(variant==="login" && "Create an account")|| "Login"} </span>
                            </p>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );

}

export default Auth;