import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    otp: { type: Number},
    email: { type: String}
})

const OTPModel = mongoose.model('OTP', otpSchema);
export default OTPModel;