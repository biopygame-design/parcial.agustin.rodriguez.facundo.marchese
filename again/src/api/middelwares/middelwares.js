
const valitadeid = (req,res,next) => {
    const id = Number(req.params.id)

    if(!Number.isInteger(id) || id <= 0){
        res.status(200).json({
            message : "El id debe ser un numero positvo"
        })
    }
    req.id = id;
    next();
}


const loggerUrl = (req,res,next) =>{
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleDateString()}] ${req.method} ${req.url}`)
    next()
}
const requirelogin = (req,res,next)=>{
    if (!req.session.user){

    }
    next()
}

export {
    loggerUrl,
    valitadeid,
    requirelogin
    
}
