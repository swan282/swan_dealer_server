import ProductService from "../Services/Product.service.js";
export default class ProductController {
    constructor(){
        // this.ProductService = new ProductService()
    }

    async addProduct (req, res){
        try {
            console.log(req.user, req.body);
            const productService = new ProductService();
            const data = await productService.createProduct(req.user, req.body);
            res.send(data);
        } catch (error) {
            res.send({status: false, message: error.message});
        }
    }
}