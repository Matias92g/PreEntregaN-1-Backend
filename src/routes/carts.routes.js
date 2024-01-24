import { Router } from "express";
import { CartManager } from "../models/cartManager.js";

const routerCart = Router()
const cartManager = new CartManager('./carts.json')

routerCart.post('/', async (req, res) => {
    const cart = await cartManager.addCart()
    if (cart) {
        res.status(201).send("Carrito creado correctamente")
    } else
        res.status(200).send(cart)
})
routerCart.post('/:cid/products/:pid', async (req, res) => {
    console.log('Carrito producto')
    const { cid,pid } = req.params

    const { quantity } = req.body
    const addToCart = await cartManager.addProductToCart(cid, pid, quantity)
    if (addToCart) {
        res.status(201).send(`Se agregó correctamente el producto ${pid}`)
    } else {
        res.status(400).send(`Algo salió mal. No se pudo agregar el producto ${pid} al carrito${cid}`)
    }
    // const { cid } = req.params
    // const cart = await cartManager.getCartById(cid)

    // if (cart) {
    //     res.status(200).send({cart})
    // } else {
    //     res.status(404).send('No se puedo encontrar carrito con el ID ingresado')
    // }
})
routerCart.post('/:cid/products/:pid'), async (req, res) => {
    console.log('Carrito producto')
    const { cid,pid } = req.params

    const { quantity } = req.body
    const addToCart = await cartManager.addProductToCart(cid, pid, quantity)
    if (addToCart) {
        res.status(201).send(`Se agregó correctamente el producto ${pid}`)
    } else {
        res.status(400).send(`Algo salió mal. No se pudo agregar el producto ${pid} al carrito${cid}`)
    }
    
}


export default routerCart