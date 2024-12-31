import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
const formatDate = (date: Date): string => {
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) {
    return "Invalid Date"; 
  }
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  

export const FullBlog = ({blog}:{blog:Blog}) => {
    const formattedDate = formatDate(new Date(blog.publishedDate));

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="w-full max-w-screen-xl px-4 pt-122">
                <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-8">
                        <div className="text-5xl mt-2 font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                        {formattedDate}
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                <div className="lg:col-span-4 lg:mt-4 mt-8 p-4 lg:p-16 bg-gray-100 rounded-lg">
                    <div className="text-slate-600 text-lg ">
                        Author
                    </div>
                    <div className="flex w-full mt-4">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>  
                </div>
                </div>
            </div>
        </div>
    </div>
}