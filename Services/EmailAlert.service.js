import sg from '@sendgrid/mail';
import OTPModel from '../models/otpVerifyModel.js';

export default class EmailAlertService {
    constructor() {
        sg.setApiKey(process.env.SG_API_KEY);
    }

    emailVerification = async (email) =>{
        try {
            const getRandomNumber = Math.floor(1000 + Math.random() * 9000);
            const saveOTP = await OTPModel({
                otp: getRandomNumber,
                email: email
            }).save();

            const msg = {
                to: email,
                from: 'bishaldeb282@gmail.com',
                subject: 'OTP Verification For Swan Distributor SignUP',
                html: `Your OTP Verification Code is ${getRandomNumber}`
            }

            await sg.send(msg);
            return {status: true, message: 'Email Sent Success'}
        } catch (error) {
            return {status: false, message: error.message}
        }
    }
}