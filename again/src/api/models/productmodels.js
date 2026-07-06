import connection from "../database/db.js";

const selectallproducts = () =>{
    const sql = "SELECT id,nombre, genero,imagen,precio FROM juegos" 
    return connection.query(sql)
}
const selectbyuid = (id) =>{
    const sql = "SELECT id,nombre, genero,imagen,precio FROM juegos where id = ?"
    return connection.query(sql,[id])
}

const insertProduct = (cleanName, image, category, price) => {
    
    const sql = "INSERT INTO juegos (nombre, imagen, genero, precio) VALUES (?, ?, ?, ?)";

    return connection.query(sql, [cleanName, image, category, price]);
}
const modifyproduct = (cleanName,image,category,price) =>{
    const sql = "UPDATE juegos SET nombre = ?, imagen = ?,genero = ?, precio = ?"
    return connection.query(sql,[cleanName,image,category,price])
}


export default {
    selectallproducts,
    selectbyuid,
    insertProduct
    
    
}