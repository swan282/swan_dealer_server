import DistributorService from "../Services/Distributor.service.js"

export default class DistributorController {
    constructor(){
        this.DistributorService = new DistributorService
    }

    loginUser = async (req, res) => {
        try {
            const user = await this.DistributorService.loggedUser(req.user);
            res.send(user);
        } catch (error) {
            res.send({status: false, message: error.message})
        }
    }

    dealerEmailVerify = async (req, res) => {
        try {
            const verify = await this.DistributorService.emailVerify(req.body);
            res.send(verify)
        } catch (error) {
            res.send({status: false, message: error.message})
        }
    }

    createDealer = async (req, res) => {
        try {
            const dealer = await this.DistributorService.registerDealer(req.body);
            res.send(dealer)
        } catch (error) {
            res.send({status: false, error: error.message});
        }
    }

    dealerOTPVerification = async (req, res) => {
        try {
            const checkOTP = await this.DistributorService.verifyOTP(req.query);
            res.send(checkOTP);
        } catch (error) {
            res.send({status: false, error: error.message});
        }
    }

    logInDealer = async (req, res) => {
        try {
            console.log(req.body);
            const logIn = await this.DistributorService.logInDealer(req.body);
            res.send(logIn);
        } catch (error) {
            res.send({status: false, error: error.message});
        }
    }
}