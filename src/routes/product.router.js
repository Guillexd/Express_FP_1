import { Router } from "express";
import ProductManager from "../persistencia/daos/product.manager.js";

const productManager = new ProductManager();

const router = Router();

router.get('/', async(req, res) => {
  const {limit, page, category, status, sort} = req.query;
  const products = await productManager.getProducts({limit, page, category, status, sort});

  if (products) {
    // res.json({ products });
    res.render('home', {
      products
    })
  } else {
    res.json({ error: 'Error in get products' });
  }
})

router.get('/prodId', async(req, res) => {
  const {prodId} = req.params;
  const product = getProductById(prodId);
  if (product) {
    res.json({ product });
  } else {
    res.json({ error: 'Error in get product by Id' });
  }
})

router.post('/addProducts', async(req, res) => {
  const objProducts = req.body;
  const newProduct = await productManager.addProducts(objProducts);
  if (newProduct) {
    res.json({ mesagge: 'Successfull', newProduct });
  } else {
    res.json({ mesagge: 'Error in post products' });
  }
})

export default router;