import {Hono} from "hono"
import {sign,verify} from "hono/jwt"
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { createBlogInput, updateBlogInput } from "@yuvashri-11/medium-common-2"
import { cors } from "hono/cors"
export const blogRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
  }>()
blogRouter.use("/*",cors({
    origin: '*', // Allow all origins (not recommended for production)
  }),async (c,next)=>{

    const h=c.req.header("authorization") || ""
    try{
        const response=await verify(h,c.env.JWT_SECRET)
        if(response){
            c.set("userId",response.id as string)
            console.log(response.id)
            await next()
          }
          else{
            c.status(404)
            return c.json({message:"unauthorized user"})
          }
    }
    catch(e){
        c.status(403)
        return c.json({
            message:"You are not logged in"
        })
    }
    
})
  
blogRouter.post('/', async (c) => {
    const body=await c.req.json()
    const {success}=createBlogInput.safeParse(body)
    if (!success){
      c.status(403)
      return c.json({
        message:"Input incorrect"
      })
    }
    const prisma = new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
    const authorId=c.get("userId")
    const blog=await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:c.get("userId") || ""
        },
        select: {
            id: true,
            title: true,
            content: true,
            publishedDate: true,
        },
    })
    return c.json({id:blog.id,
        
    })
    
    
})
blogRouter.put("/",async function(c){
    const body=await c.req.json()
    const {success}=updateBlogInput.safeParse(body)
    if (!success){
      c.status(403)
      return c.json({
        message:"Input incorrect"
      })
    }
    const prisma = new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
    const blog=await prisma.blog.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })
    return c.json({id:blog.id})
    
})
blogRouter.get('/bulk', async (c) => {

   const prisma = new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
    const blogs=await prisma.blog.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            publishedDate:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })
    return c.json({
        blogs
    })
})
blogRouter.get("/info",async(c)=>{
    const prisma = new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
    const userId = c.get("userId");
    // if (!userId) {
    //     c.status(401);
    //     return c.json({ message: "User ID is missing. Unauthorized access." });
    // }
    // return c.json(userId)

    try{
        const info=await prisma.user.findUnique(
            {
                where:{
                    id:c.get("userId")
                },select:{
                    name:true
                }
                
            })
            return c.json(info)
    }
    catch(e){
        c.status(411)
        return c.json({message:"user not found"})
    }
    
})
blogRouter.get('/:id', async (c) => {
    const id=c.req.param("id")
    const prisma = new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
    const authorId=c.get("userId")
    try{
        const blog=await prisma.blog.findUnique({
            where:{
                id:id
            },
            select:{
                content:true,
                title:true,
                id:true,
                publishedDate:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json(blog)
    }
    catch(e){
        c.status(411)
        return c.json({message:"blog not found"})
    }
})
