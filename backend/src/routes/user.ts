import {Hono} from "hono"
import {sign,verify} from "hono/jwt"
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { signupInput } from "@yuvashri-11/medium-common-2"
import { signinInput } from "@yuvashri-11/medium-common-2"

export const userRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    }
}>()
userRouter.post('/signup', async(c) => {
    const body=await c.req.json();
    const {success}=signupInput.safeParse(body)
    if (!success){
      c.status(403)
      return c.json({
        message:"Input incorrect"
      })
    }
    const prisma = new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
    try{
        const user=await prisma.user.create({
            data:{
              name:body.name,
              email:body.username,
              password:body.password,
            }
        })
        
        const token=await sign({id:user.id},"secret")
        return c.text(token)
    }
    catch(e){
        c.status(404)
        return c.text("error")
    }
       
})
userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
  
    const body=await c.req.json();
    const {success}=signinInput.safeParse(body)
    if (!success){
      c.status(403)
      return c.json({
        message:"Input incorrect"
      })
    }
    const user=await prisma.user.findUnique({
      where:{
        email:body.username,
        password:body.password,
      }
    })
    if(!user){
      c.status(403)
      return c.json({error:"user not found"});
      
    }
  
    const token=await sign({id:user.id},"secret")
    return c.text(token)
    
})
