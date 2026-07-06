import clientmodels from "../models/clientmodels.js";

export const createclient = async (req, res) => {
    try {
       
        const { nombre, productos, pago_total } = req.body;

        if (!nombre || !productos || productos.length === 0) {
            return res.status(400).json({ message: "Datos de compra incompletos." });
        }

        
        const descripcionProductos = productos.map(p => `${p.nombre} (x${p.cantidad || 1})`).join(", ");

        
        const producto = descripcionProductos;

        // 4. Enviamos las variables al modelo
        const [rows] = await clientmodels.insertcielente(nombre, producto, pago_total);

        res.status(201).json({
            status: "success",
            message: `Cliente registrado con éxito bajo el ID: ${rows.insertId}`,
            clientId: rows.insertId 
        });
        
    } catch (error) {
        console.error("Error detallado en buycontroller:", error);
        res.status(500).json({
            status: "error",
            message: "Error interno del servidor al registrar la compra en la base de datos."
        });
    }
};