import mongoose from "mongoose";

const distributorSchema = mongoose.Schema({
    d_email: {type: String, required: true},
    d_phone: {type: String, required: true},
    d_password: {type: String, required: true},
    d_name: {type: String, required: true},
    d_s_name: {type: String, required: true}, 
    d_location: {type: String, required: true},
    d_zip: {type: String, required: true},
},{ timestamps: true })

const DistributorModel = mongoose.model("Distributor", distributorSchema);
export default DistributorModel