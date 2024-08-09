import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import ProductModel from '../models/productModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default class ProductService {
    constructor(){}

    async createProduct (user, data) {
        if(!user || !data) return {status: false, message: 'User Not Found.Please try again'};
        const { p_name, p_price, p_brand_name, p_qty, p_description, p_image, token } = data;
        try {
            const imageName = uuidv4();
            const imagePath = path.join(__dirname, '../images', imageName);
            const imageUrl = `/images/${imageName}`

            const productData = {
                p_name,
                p_brand_name,
                p_description,
                p_price: Number(p_price),
                p_qty: Number(p_qty),
                p_image: imageUrl,
                p_u_id: user._id
            };
            const saveProduct = await ProductModel(productData).save()
            if(!saveProduct) return {status: false, message: "Failed to save product"}
            return {status: true, message: "Product saved successfully"}
        } catch (error) {
            return {status: false, message: error.message}
        }
    }
}