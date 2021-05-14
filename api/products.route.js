import express from 'express'
import ProductsCtrl from '../Controller/products.controller.js'

const router = express.Router()

router.route('/')
    .get(ProductsCtrl.apiGetProducts)
export default router