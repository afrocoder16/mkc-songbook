import { Schema, model } from "mongoose";
import sendEmail from "../config/nodemailer.config.js";
import bcrypt from "bcrypt";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    },
});

otpSchema.pre("save", async function (next) {
    if (this.isNew) {
        const mailResponse = await sendEmail(
            this.email,
            "MKC-Choir Email Verification",
            `Your verification code is ${this.otp}`
        );
    }
    next();
});

const OTPModel = model("OTP", otpSchema);

export default OTPModel;
