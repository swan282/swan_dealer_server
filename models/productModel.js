import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    p_name: {type: 'string', required: true},
    p_description: {type: 'string', required: true},
    p_image: {type: 'string', required: true},
    p_price: {type: 'string', required: true},
    p_qty: {type: Number, required: true},
    p_rating: {type: Number},
    p_u_id: {type: String, required: true},
    p_brand_name: {type: String, required: true},
})

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;