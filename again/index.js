import express from "express";
const app = express()
import cors from "cors"
import enviroments  from "./src/api/config/enviroments.js";
import connection from "./src/api/database/db.js";
import { loggerUrl } from "./src/api/middelwares/middelwares.js";
import { authroutes, productroutes as productroutes, userroutes, viewroutes,buyroutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js"; 
import session  from "express-session";


const {port,session_key} = enviroments

app.use(express.urlencoded({extended:true}))
app.use(express.static(join(__dirname, "src/public")));
app.use(session({
    secret : process.env.SESSION_KEY ,
    resave : false,
    saveUninitialized : true
}))


///****middelware parsea toda info recibidaq a jsonh */
app.use(express.json())
app.use(cors())
app.use((req,res,next)=>{
    console.log("soy un middleware que saluda en todas las")
    next()
})


app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src/views"));


app.use("/api/products", productroutes); // Todas las peticiones a esta URL se las pasamos a product.routes.js
app.use("/dashboard", viewroutes); // Rutas de vistas
app.use("/login", authroutes); // Rutas de autenticacion
app.use("/api/users", userroutes) // Rutas de usuario
app.use("/clientes", buyroutes ) 
















app.listen(port,()=>{
    console.log(`este servidor esta corriendo en el puero${port}`)
})
//** http://localhost:3000*/