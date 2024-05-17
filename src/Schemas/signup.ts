import {z} from "zod"

export const usernameValidation = z
    .string()
    .min(3,{message: "Min length is 3"})
    .max(20, {message: "Username cannot be larger than 20 words"})
    .regex(/ ^[a-zA-Z0-9_]$ /, {message: "Username must not have special characters"})

export const signupValidation = z.object({
    username : usernameValidation,
    email : z.string().email(),
    password: z.string().regex(/^[a-zA-Z0-9_-]{3,16}$/)
})