import productmodels from "../models/productmodels.js"



export const GetAll =  async(req,res)=>{
    try{
       
        const [rows] = await productmodels.selectallproducts()

        if(rows.length === 0){
            return res.status(404).json({
                message : "no se encontro el producto"
            })
        }
        res.status(200).json({
            payload: rows,
            total: rows.length 
           
        })


    }catch(error){
        console.log("error obteniendo el contenido")
        return res.status(500).json({
            message : "error interno en el server"
        })
        
    }
     
}
export const GetById = async(req,res)=>{
    try{
        
        const [rows] =  await productmodels.selectbyuid(req.id)
        console.log(rows)
        return res.status(200).json({
            payload:rows
        })
    }catch(error){
        console.log("error")
        res.status(500).json({
            message : "error"

        })
    }
}

export const createproduct = async(req,res) =>{
    try{


        const { nombre, imagen, genero, precio } = req.body;
        const cleanName = nombre.trim();

        const [rows] = await productmodels.insertProduct(cleanName, imagen, genero, precio);
        res.status(201).json({
            message: `Producto creado con exito con id ${rows.insertId}`,
            productId: rows.insertId // Optimizacion 4: Devolvemos info util como el nuevo id creado
        });
    } catch(error){
        console.log(error);

        // Optimizacion 2: Devolvemos errores 500
        res.status(500).json({
            message: "Error interno del servidor al crear productos"
        })
    }
    
}

export const modificarproducto = async(req,res) =>{
    try{
        const {nombre,imagen,genero,precio} = req.body
    const cleanname = nombre.trim()

    const [rows] = await productmodels.modifyproduct(cleanname , imagen, genero, precio)
    res.status(200).json({
        message: `producto modificado exitosamente`,
        productId: rows.insertId
    })
    } catch(error){
        console.log(error)

        res.status(500).json({
            message:"error al modificar producto"
        })
    }
    
}


