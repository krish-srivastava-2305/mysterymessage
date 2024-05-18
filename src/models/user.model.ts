import mongoose, {Schema, Document} from "mongoose";

export interface message extends Document {
    content: string,
    createdAt: Date
}

const messageSchema: Schema<message> = new Schema({
    content : {
        type: String,
        required: true,
    },
    createdAt : {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface user extends Document {
    name: string;
    email: string;
    username: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: message[];
}

const userSchema: Schema<user> = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    verifyCode: String,
    verifyCodeExpiry: Date,
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage:{
        type:Boolean,
        default: true
    },
    messages: [messageSchema]
})

const userModel = mongoose.models.User as mongoose.Model<user> || mongoose.model<user>("User", userSchema)

export default userModel