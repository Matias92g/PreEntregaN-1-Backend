import express from "express";

import usersRouter from "./routes/users.routes.js"
import routerProd from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";

const PORT = 8080
const app = express()
//Motor de Plantillas 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('handlebars', engine()); //inicializa
app.set('view engine', 'handlebars'); //indica que dentro de la carpeta tendremos archivos handlebars
app.set('views', (__dirname, './views'));  //ubicación de la carpeta 
// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
/// Routes 

app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
app.use('/users', usersRouter)
app.listen(PORT, () => { console.log(`Server run in port ${PORT}`) })  