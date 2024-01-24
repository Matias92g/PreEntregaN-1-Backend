import { promises as fs } from "fs";
import crypto from "crypto"
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export class CartManager {
    constructor() {
        this.path = join(__dirname, '../../carts.json')
        this.path2 = join(__dirname, '../../products.json')
    }

    async addCart() {
        const carts = JSON.parse(await fs.readFile(this.path), 'utf-8', null, 2)
        const existCart = carts.find(cart => cart.id === cart.id)
        if (existCart) {
            return false
        } else {
            const idCart = carts.length ? carts[carts.length - 1].id + 1 : 1
            const newCart = { "Carrito de compras - id": idCart, "products": [] }
            carts.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(carts))
            return true
        }
    }


    async getCartById(id) {
        const carts = JSON.parse(await fs.readFile(this.path), 'utf-8', null, 2)
        const cart = carts.find(cart => cart.id === id)

        return cart
    }

    async addProductToCart(cid, pid) {
        const carts = JSON.parse(await fs.readFile(this.path))
        const cart = carts.find(cart => cart.id === cid)
        const prods = JSON.parse(await fs.readFile(this.path2))
        const prod = prods.find(producto => producto.id === pid)
        if (prod && cart) {
            return false
        } else {
            cart.push({ "id": pid, "quantity": 1 })
            await fs.writeFile(this.path, JSON.stringify(prods))
            return true
        }
    }
}
