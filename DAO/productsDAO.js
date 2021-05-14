let products

export default class ProductsDAO {
    static async injectDB(myConnection) {
        if (products) {
            return
        }
        try {
            products = await myConnection.db(process.env.DB_NAME).collection('products')
        } catch (err) {
            console.error(`Khon the lay du lieu products: ${err}`)
        }
    }

    static async getProducts({
        filter = null,
        page = 0,
        productsPerPage = 12,
    } = {}) {
        let mongodbQuery
        if (filter) {
            if ('product_name' in filter) {
                mongodbQuery = { $text: { $search: filter['product_name'] } }
            } else if ("product_cat" in filter) {
                mongodbQuery = { "cate": { $eq: filter['product_cat.cate_id'] } }
            } else if ("product_price" in filter) {
                mongodbQuery = { "product_price": { $eq: filter['product_price'] } }
            } 

        }

        let cursor

        try {
            cursor = await products.find(mongodbQuery)
        } catch (err) {
            console.error(`error: ${err}`)
            return { product_list: [], totalNumProducts: 0 }
        }

        const display_cursor = cursor.limit(productsPerPage).skip(page * productsPerPage)

        try {
            const productsList = await display_cursor.toArray()
            const totalNumProducts = await products.countDocuments(mongodbQuery)

            return { productsList, totalNumProducts }
        } catch (err) {
            console.error(`Khong the chuyen doi cursor sang array hoac loi dem so luong san pham: ${err}`)
            return { product_list: [], totalNumProducts: 0 }
        }
    }
    
}