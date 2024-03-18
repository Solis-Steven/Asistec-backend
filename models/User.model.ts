import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";


interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    career:string,
    createdAt: Date,
    updatedAt: Date,
    verifyPassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    career: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

// This function hash user password
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }

    const salt: string = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.verifyPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}


const User = model<IUser>("User", userSchema);
export default User;