import Image from "next/image"
import logo from "@logo.png"
import Navbaritems from "./Navbaritems"
import MobileMenu from "./MobileMenu"
import AccountMenu from "@/components/AccountMenu"

import {BsBell,BsChevronDown,BsSearch} from "react-icons/bs" 
import { useCallback, useEffect, useState } from "react"


const TOP_OFFSET=66;
const Navbar =()=>{
    

    const [showMobileMenu,setShowMobileMenu]=useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(()=>{
        const handleScroll = () => {
            // console.log(window.scrollY)
            if (window.scrollY >= TOP_OFFSET) {
              setShowBackground(true)
            } else {
              setShowBackground(false)
            }
          }
          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          }
    },[])

    return(<div className="w-full fixed z-40">
        <div className={`px-4 md:px-16 flex flex-row items-center transition duration-500 ${showBackground? 'bg-zinc-900 bg-opacity-90':''}`}>
            <Image className="h-4 lg:h-7 " src="/images/logo.png" alt="logo" width={70} height={32}/>
            <div className="flex-row ml-8 gap-7 hidden lg:flex ">
                <Navbaritems label="home"/>
                <Navbaritems label="Series"/>
                <Navbaritems label="Film"/>
                <Navbaritems label="New & Popular"/>
                <Navbaritems label="My List "/>
                <Navbaritems label="Browse By Languages"/>
            </div>

            <div onClick={()=>{setShowMobileMenu((current)=>!current)}}  className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                <p className="text-white text-sm">Browse</p>
                <BsChevronDown className={` text-white  transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                
                <MobileMenu visible={showMobileMenu} />
            </div>

            <div className="flex flex-row ml-auto gap-7 items-center">
                <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                     <BsSearch className="w-6" />
                </div>
                <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                     <BsBell className="w-6" />
                </div>
                <div onClick={()=>{setShowAccountMenu((current)=>!current)}} onMouseEnter={()=>{setShowAccountMenu(true)}}  className="flex flex-row items-center gap-2 cursor-pointer relative">
                    <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                        <Image className="p-1 rounded-lg " src="/images/defaultImg.png" width={70} height={32} alt="profile"/>
                    </div>
                    <BsChevronDown  className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}  />
                    <AccountMenu  visible={showAccountMenu} />
                </div>
            </div>
        </div>
    </div>)
}

export default Navbar;
