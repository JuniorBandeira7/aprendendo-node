const Product = require('../routes/productsRoutes')

module.exports = class ProductController{
    static showProducts(req, res){
        res.render('products/all')
    }
}