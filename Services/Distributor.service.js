import jwt from 'jsonwebtoken'
import bcrypt, {genSalt} from 'bcrypt'
import OTPModel from "../models/otpVerifyModel.js";
import EmailAlertService from "./EmailAlert.service.js";
import DistributorModel from "../models/distributorModel.js";
export default class DistributorService {
    constructor(){
        this.EmailAlertService = new EmailAlertService
    }

    emailVerify = async (data) => {
        try {
            if(!data.email) return {status: false, message: 'Please enter a valid email address'}

            const email_exists = await OTPModel.findOne({email: data.email});
            if(email_exists) return {status: false, message: 'We Already Sent An OTP to your email address'}

            const sendEmailVerification = await this.EmailAlertService.emailVerification(data.email);
            return sendEmailVerification
        } catch (error) {
            return {status: false, message: error.message}
        }
    }

    verifyOTP = async (data) => {
        try {
            const emailData = await OTPModel.findOne({email: data.email})
            if(!emailData) return {status: false, message: 'Invalid Email Address'}
            
            if(emailData.otp !== Number(data.otp)) return {status: false, message: 'OTP Verification Failed. Please try again'}
            
            return {status: true, message: 'OTP Verification Successful'}
        } catch (error) {
            return {status: false, message: error.message}
        }
    }

    registerDealer = async (data) => {
        try {
            const {d_name, d_email, d_phone, d_location, d_zip, d_s_name, d_password} = data
            
            const d_cnf_pass = d_password;
            if(d_password !== d_cnf_pass) return {status: false, message: 'Password and Confirmation Password Mismatch.'}

            const isEmail = await DistributorModel.findOne({d_email: d_email})
            if(isEmail) return {status: false, message: 'Email Address Already Exists'}

            const isPhone = await DistributorModel.findOne({d_phone: d_phone})
            if(isPhone) return {status: false, message: 'Phone Number Already Exists'}

            const isShop = await DistributorModel.findOne({d_s_name: d_s_name});
            if(isShop) return {status: false, message: 'Shop Name already Exist.Please Use your Own Shop Name'}

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(d_password, salt);

            const newDealer = new DistributorModel({
                d_email: d_email,
                d_phone: d_phone,
                d_password: hashPassword,
                d_name: d_name,
                d_s_name: d_s_name,
                d_location: d_location,
                d_zip: d_zip,
            }).save();

            if(!newDealer) return {status: false, message: 'Failed to create new Distributor.Please Try Again'}
            const token = jwt.sign({dealerId: newDealer._id},process.env.SECRET_KEY, {expiresIn: '30d'})

            return {status: true, message: 'User created Successfully', user: newDealer, token: token}

        } catch (error) {
            return {status: false, message: error.message}
        }
    }

    logInDealer = async (data) => {
        try {
            if(!data.d_email) return {status: false, message: 'Please Enter your email address'}
            if(!data.d_password) return {status: false, message: 'Please Enter your password'}

            const dealer = await DistributorModel.findOne({d_email: data.d_email})
            if(!dealer) return {status: false, message: 'No User Found'}

            const compare_password = await bcrypt.compare(data.d_password, dealer.d_password)
            if(compare_password === false) return {status: false, message: 'Password or Email mismatch'}

            const token = jwt.sign({dealerId: dealer._id}, process.env.SECRET_KEY, {expiresIn: '30d'})
            return {status: true, user: dealer, message: 'User signed In Success' , token: token}
        } catch (error) {
            return {status: false, message: error.message}
        }
    }
    
    loggedUser = async (user) => {
        try {
            const userData = await DistributorModel.findOne({_id: user._id});
            return {status: true, data: userData} 
        } catch (error) {
            return {status: false, message: error.message}
        }
    }
}