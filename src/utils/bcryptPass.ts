import bcrypt from "bcrypt"

const saltnum = 10

export default async function hashPass(password : string) : Promise<string> {
    try {
        const hashedPass = await bcrypt.hash(password,saltnum)
        return hashedPass
    } catch (error) {
        console.error("Error hashing pass", error)
        return "Hashing failed"
    }
} 