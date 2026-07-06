import connection from "../database/db.js"

const selectAdminUsers = (email) => {
        
    const sql = "SELECT * FROM users where email = ? ";

    return connection.query(sql, [email]);
}


const createclient =(name,email,password) =>{
    const sql = "SELECT users where email = ? AND password = ?"
    return connection.query(sql,[name,email,password])
}
const insertAdminUser = (name, email, password) => {

    const sql = "INSERT into users (name, email, password) VALUES (?, ?, ?)";

    return connection.query(sql, [name, email, password]);
}

export default{
    createclient,
    selectAdminUsers
}