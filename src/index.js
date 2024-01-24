import express  from "express";
import routerProd from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";

const PORT = 8080
const app = express()
// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
/// Routes 

app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
app.listen (PORT, ()=>{console.log(`Server run in port ${PORT}`)})  