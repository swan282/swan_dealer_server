import express from 'express';
import VerifyToken from '../middleware/middleware.js';
import DistributorController from "../controller/DistributorController.js"


const distRouter = express.Router();
const distController = new DistributorController

//OTP verificaation route
distRouter.get('/reg/otp-verify', distController.dealerOTPVerification);
distRouter.post('/reg/dealer-send-otp', distController.dealerEmailVerify);

//Create and Login Swan Dealer
distRouter.post('/reg/dealer-create', distController.createDealer);
distRouter.post('/reg/dealer-login', distController.logInDealer);

distRouter.get('/login-user', VerifyToken)
distRouter.get('/login-user', distController.loginUser);


export default distRouter