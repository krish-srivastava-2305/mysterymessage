import { sendMail } from "@/lib/resend";
import userModel from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnect"
import hashPass from "@/utils/bcryptPass";

export async function POST(req: Request){
    await dbConnect()

    try {
        const { name, username, email, password } = await req.json();
        const user = await userModel.findOne({username})
        const userEmail = await userModel.findOne({email})

        if(user) return Response.json("username already exists")
        else if(userEmail) return Response.json("Email already exists")
        else{
            const verifyCode = Math.floor(100000 + Math.random()*90000).toString() 
            const verifyCodeExpiry = new Date()
            verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1)
            const hashedPass = await hashPass(password)
            
            const newUser = await userModel.create({
                name,
                username,
                email,
                verifyCodeExpiry,
                verifyCode,
                isVerified: false,
                isAcceptingMessage: true,
                messages: [],
                password: hashedPass
            })
            const verificationMail = sendMail(email, username, verifyCode)
            
            return Response.json({success: true, message: "User Registered Successfully"})
        }
        
    } catch (error) {
        console.error("Error in registering user: ", error)
        return Response.json({
            success: false,
            message: "User Registration Failed"
        },
        { status: 500}
    )
    }
}