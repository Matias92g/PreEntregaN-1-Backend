import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import crypto from "crypto";
import { ProductManager } from "./productManager.js";

const productCart = new ProductManager('./products.json');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class CartManager {
    constructor() {
        this.path = join(__dirname, '../../carts.json');
        this.path2 = join(__dirname, '../../products.json');
    }

    async addCart() {
        try {
            let carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const existCart = carts.find(cart => cart.id === cart.cid);
            if (existCart) {
                return false;
            } else {
                const newCart = { "id": crypto.randomBytes(16).toString('hex'), "products": [] };
                carts.push(newCart);
                await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
                return newCart;
            }
        } catch (error) {
            console.error("Error while adding cart:", error);
            return false;
        }
    }

    async getCartById(cid) {
        try {
            const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const cart = carts.find(cart => cart.id === cid);
            return cart;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async addProductToCart(cid, pid, quantity) {
        try {
            const cart = await this.getCartById(cid);
            const prods = await productCart.getProductsById(pid);
            if (!prods || !cart) {
                return false;
            }
            const existProd = cart.products.find(prod => prod.id === pid);
            if (existProd) {
                existProd.quantity = parseInt(existProd.quantity) + 1;
            } else {
                const newProduct = { id: prods.id, quantity: parseInt(quantity) };
                cart.products.push(newProduct);
            }
            await fs.writeFile(this.path, JSON.stringify(cart, null, 2));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
