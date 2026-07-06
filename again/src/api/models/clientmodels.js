import connection from "../database/db.js";

const insertcielente = (nombre,producto,pago_total) =>{
    const sql = "INSERT INTO clientes (nombre, producto, pago_total) VALUES (?, ?, ?)";
    return connection.query(sql,[nombre,producto,pago_total])
}
export default{
    insertcielente
}