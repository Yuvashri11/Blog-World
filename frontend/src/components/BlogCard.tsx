import { Link } from "react-router-dom"
import {format} from "date-fns"
interface BlogCardProps{
    id:string
    authorName:string
    title:string
    content:string
    publishedDate:Date
}
const formatDate = (date: string | Date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return 'Invalid Date';
    }
    return format(parsedDate, 'MMMM dd, yyyy');
};

export const BlogCard=({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4">
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <Avatar name= {authorName} />
                    </div>
                <div className="pl-2 text-sm font-extralight flex justify-center flex-col ">
                    {authorName}
                    </div> 
                <div className="flex justify-center flex-col pl-2"><Circle/></div>
                    
                {/* <div className=" text-xs pl-2">.</div> */}
                <div className="pl-2 font-extralight text-sm text-slate-500 flex justify-center flex-col ">
                {formatDate(publishedDate)}
               
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title} 
            </div>
            <div className="text-md font-thin">
                {content.slice(0,100)+"..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-2">
                {`${Math.ceil(content.length/300)} minutes`}
            </div>
            {/* <div className="bg-slate-200 h-1 w-full">

            </div> */}
        </div>
    </Link>
}
export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

     </div>
}
export function Avatar({ name ,size="small"}:{ name : string,size?:"small"|"big"}){
    return <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700`}>
        <span className={` ${size==="small"?"text-sm":"text-md"}font-xs text-gray-600 dark:text-gray-3001`}>{name[0]}</span>
    </div>
}