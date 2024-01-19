import { promises as fs } from "fs";
import crypto from "crypto"

//crypto.randomBytes(16).toString('hex')// Genera id únicos

export class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts() {
        const prods = JSON.parse(await fs.readFile(this.path), 'utf-8', null, 2)
        return prods
    }

    async getProductsById(id) {
        const prods = JSON.parse(await fs.readFile(this.path), 'utf-8', null, 2)
        const prod = prods.find(producto => producto.id === id)
        return prod
    }

    async addProduct(prod) {
        const prods = JSON.parse(await fs.readFile(this.path), 'utf-8', null, 2)
        const existProd = prods.find(producto => producto.id === prod.id)
        if (existProd) {
            return false
        } else {
            prod.id = crypto.randomBytes(16).toString('hex')
            prods.push(prod)
            await fs.writeFile(this.path, JSON.stringify(prods))
            return true
        }
    }

    async updateProduct(id, producto) {
        const prods = JSON.parse(await fs.readFile(this.path), 'utf-8', null, 2)
        const prod = prods.find(producto => producto.id === id)
        if (prod) {
            prod.title = producto.title
            prod.description = producto.description
            prod.price = producto.price
            prod.stock = producto.stock
            prod.code = producto.code
            prod.category = producto.category
            prod.status = producto.status
            prod.thumbnails = producto.thumbnails
            prods.filter(producto => producto.id !== prod.id)
            await fs.writeFile(this.path, JSON.stringify(prods))
            return true
        } else {
            return false
        }
    }

    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(this.path), 'utf-8')
        const prod = prods.find(producto => producto.id === id)

        if (prod) {
            prods.filter(producto => producto.id !== prod.id)
            await fs.writeFile(this.path, JSON.stringify(prods.filter(producto => producto.id !== prod.id)))
            return true
        }
        else {
            return false
        }
    }
}
