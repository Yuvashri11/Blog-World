import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"
export const Signup=()=>{
    return <div>
        <div className="h-screen flex flex-col lg:flex-row bg-white">
            <div className="w-full lg:w-1/2 flex justify-center items-center p-4 bg-transparent">
                <Auth type="signup"/>
            </div>
            <div className="w-full bg-gray-200 lg:w-1/2 flex justify-center items-center p-4 lg:visible invisible"><Quote/></div>
            
        </div>
    </div>
}