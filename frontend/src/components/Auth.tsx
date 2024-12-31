import { signupInput } from "@yuvashri-11/medium-common"
import { ChangeEvent, useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import {BACKEND_URL} from "../config"
export const Auth=({type}:{type:"signup"| "signin"})=>{
    const navigate=useNavigate()
    const [postInputs,setpostInputs]=useState<signupInput>({
        name:"",
        username:"",
        password:""
    })

    async function sendRequest(){
        try{
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" :"signin"}`,postInputs)
            const jwt=response.data
            localStorage.setItem("token",jwt)
            navigate("/blogs")
        }
        catch(e){
            alert("Error while signing up")      
        }
    }
    return <div className="h-screen flex flex-col lg:flex-row justify-center items-center space-x-8 bg-white">
        <div className="w-full max-w-md bg-white p-6 rounded-ls shadow-lg">
            <div>
                <div className="px-10">
                    <div className=" text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400 mt-2 text-center">
                        {type==="signin"?"Don't have an account":"Already have an account?"}
                        <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>
                            {type==="signin"?"Sign up":"Signin"}
                        </Link> 
                    </div>
                </div>
                <div className="pt-6">
                    {type==="signup"?<LabelledInput label="Name" placeholder="name" type="text" onChange={(e)=>{
                        setpostInputs({
                            ...postInputs,
                            name:e.target.value
                        })
                    }}/>:null}
                    <LabelledInput label="Username" placeholder="yuvashri@gmail.com" type="text" onChange={(e)=>{
                        setpostInputs({
                            ...postInputs,
                            username:e.target.value
                        })
                    }}/>
                    <LabelledInput label="Password" placeholder="7896" type="password" onChange={(e)=>{
                        setpostInputs({
                            ...postInputs,
                            password:e.target.value
                        })
                    }}/>
            
                    <button onClick={sendRequest} type="button" className="text-white mt-6 w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign up":"Sign in"}</button>
                   
                </div>
            </div>
        </div>
    </div>

}
interface LabelledInputType
{
    label:string,
    placeholder:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
    type?:string
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
    return <div>    
            <label className="block mb-2 text-sm font-medium pt-2 text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={type||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />

    </div>
}