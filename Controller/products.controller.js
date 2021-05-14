import e from 'express'
import ProductsDAO from '../DAO/productsDAO.js'

export default class ProductsCtrl{
    static async apiGetProducts(req, res, next){
        const productsPerPage = req.query.productsPerPage ? parseInt(req.productsPerPage, 10): 12 //default value
        const page = req.query.page ? parseInt(req.query.page): 0

        let filter = {}

        if(req.query.product_name){
            filter["product_name"] = req.query.product_name
        }else if(req.query.product_cat){
            filter["product_cat"] = req.query.product_cat
        }else if(req.query.product_price){
            filter["product_price"] = req.query.product_price
        }
        const {productsList, totalNumProducts} = await ProductsDAO.getProducts({filter, page, productsPerPage}) 

        let response = {
            products: productsList,
            page: page,
            filter: filter,
            entries_per_page: productsPerPage,
            total_result: totalNumProducts
        }

        res.json(response)
    }
    
}