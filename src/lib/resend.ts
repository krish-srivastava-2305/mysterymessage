import { ApiResponse } from "@/types/ApiResponse";
import { Resend } from "resend";
import VerificationCodeEmail from "../../emails/Verificationemail";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMail(
    email: string,
    username: string,
    verifyCode: string
):Promise<ApiResponse>{
    try {
    const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification Code',
            react: VerificationCodeEmail({username, otp: verifyCode}),
          });
        return {success:true, message:"Email sent successfully"}
    } catch (error) {
        console.error("Email not sent", error)
        return {success:false, message: "Email sending not successful"}
    }
}