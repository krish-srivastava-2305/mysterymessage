import { message } from "@/models/user.model";

export interface ApiResponse{
    success : boolean;
    message: string;
    messages?: [message]
    isAcceptingMessage?: true
}