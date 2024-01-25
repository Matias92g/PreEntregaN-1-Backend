import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import crypto from "crypto"
import { ProductManager } from "./productManager.js";

const productCart = new ProductManager('./products.json')
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export class CartManager {
    constructor() {
        this.path = join(__dirname, '../../carts.json')
        this.path2 = join(__dirname, '../../products.json')
    }

    async addCart() {
        const carts = JSON.parse(await fs.readFile(this.path), 'utf-8', null, 2)
        const existCart = carts.find(cart => cart.id === cart.cid)
        if (existCart) {
            return false
        } else {
            carts.id = crypto.randomBytes(16).toString('hex')
            const newCart = { "id": carts.id, "products": [] }
            carts.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(carts))
            return newCart
        }
    }
    async getCartById(cid) {
        const carts = JSON.parse(await fs.readFile(this.path), 'utf-8', null, 2)
        const cart = carts.find(cart => cart.id === cid)
        return cart
    }

    async addProductToCart(cid, pid, quantity) {
        const cart = await this.getCartById(cid)
        const prods = await productCart.getProductsById(pid)
        if (!prods || !cart) {
            return false
        }
        const existProd = cart.products.find(prod => prod.id === pid)
        if (existProd) {
            parseInt(existProd.quantity++)
        } else {
            const newProduct = [{ "id": prods.id, quantity: parseInt(quantity) }]
            cart.products.push(newProduct)

        }
        await fs.writeFile(this.path, JSON.stringify(cart))
        return true
    }
}
