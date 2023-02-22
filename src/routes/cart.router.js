import { Router } from "express";
import CartManager from "../persistencia/daos/cart.manager.js";

const cartManager = new CartManager();

const router = Router();

router.get('/', async (req, res) => {
  const cart = await cartManager.getCarts();
  if (cart) {
    res.json({ cart });
  } else {
    res.json({ error: 'Error in get carts' });
  }
})

router.get('/:cartId', async (req, res) => {
  const {cartId} = req.params;
  const cart = await cartManager.getCartById(cartId);
  if (cart) {
    res.json({ cart });
  } else {
    res.json({ error: 'Error in get carts' });
  }
})

router.post('/addCart', async (req, res) => {
  let objCart = req.body;
  objCart = {...objCart, time: Date.now()};
  const newCart = await cartManager.addCart(objCart);
  if (newCart) {
    res.json({ mesagge: 'Success', newCart });
  } else {
    res.json({ mesagge: 'Error in post carts' });
  }
})

router.put('/:cartId', async(req, res)=>{
  const {prodId} = req.body;
  const {cartId} = req.params;
  const cart = await cartManager.addProductToCart(cartId, prodId);
  if (cart) {
    res.json({ mesagge: 'Success', cart });
  } else {
    res.json({ mesagge: 'Error in put carts' });
  }
})

router.put('/:cartId/products/:prodId', async(req, res)=>{
  const {cartId, prodId} = req.params;
  const {quantity=1} = req.body;
  const cart = await cartManager.addQuantity(cartId, prodId, quantity);
  if (cart) {
    res.json({ mesagge: 'Success', cart });
  } else {
    res.json({ mesagge: 'Error in put carts add.' });
  }
})

router.delete('/:cartId', async(req, res)=>{
  const {cartId} = req.params;
  const cart = await cartManager.emptyCart(cartId);
  if (cart) {
    res.json({ mesagge: 'The cart is empty', cart });
  } else {
    res.json({ mesagge: 'Error in delete carts empty' });
  }
})

router.delete('/:cartId/products/:prodId', async(req, res)=>{
  const {cartId, prodId} = req.params;
  const cart = await cartManager.deletaProduct(cartId, prodId);
  if (cart) {
    res.json({ mesagge: 'Products deleted succesfully', cart });
  } else {
    res.json({ mesagge: 'Error in delete carts product' });
  }
})

export default router;