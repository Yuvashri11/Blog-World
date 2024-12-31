import {Avatar} from "./BlogCard"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useInfo } from "../hooks"

export const Appbar=()=>{
    const {info}=useInfo()
    const n=useNavigate()
    return <div className="border-b flex justify-between py-4 px-10">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer text-2xl font-semibold">
                Medium
        </Link>
        <div className="absolute top-4 right-28">
            <Avatar size={"big"} name={info ? info.name[0] : "Yuvashri" }/>
            
        </div>
        <button onClick={()=>{localStorage.clear();
            n("/")
        }}type="button" className="text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
            </svg>
            <span className="sr-only">Icon description</span>
        </button>
        

    </div>

}