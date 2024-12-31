import { BACKEND_URL } from "../config";
import { ChangeEvent,useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Publish=()=>{
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const navigate=useNavigate()
    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8 px-4 md:px-8"> 
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title" />

                <TextEditor onChange={(e) => {
                    setContent(e.target.value)
                }} />
                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title:title,
                        content:content,
                        date:new Date().toJSON().slice(0,10),
                    }, {
                        headers: {
                            Authorization:localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="mt-4 inline-flex items-center justify-center px-5 py-2.5 w-full sm:w-auto text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish Blog
                </button>
            </div>
        </div>
    </div>

}

function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-4">
        <div className="w-full mb-4 bg-white rounded-lg border border-gray-300">
            <div className="flex items-center justify-between px-2 py-2 border-b">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={15} className="focus:outline-none block w-full px-2 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
}