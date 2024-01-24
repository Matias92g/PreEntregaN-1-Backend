import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import crypto from "crypto"


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
            return true
        }
    }


    async getCartById(cid) {
        const carts = JSON.parse(await fs.readFile(this.path), 'utf-8', null, 2)
        const cart = carts.find(cart => cart.id === cid)
        return cart
    }

    async addProductToCart(cid, pid) {
        const carts = JSON.parse(await fs.readFile(this.path))
        const cart = carts.findIndex(cart => cart.id === cid)
        const prods = JSON.parse(await fs.readFile(this.path2))
        const prod = carts.findIndex(producto => producto.id === pid)
        if (prod != -1) {
            return carts[prod].quantity++
        } else {
            newCart = await this.addCart(cart)
            cart.push(prod)
            await fs.writeFile(this.path, JSON.stringify(prod))
            return true
        }
    }
}
