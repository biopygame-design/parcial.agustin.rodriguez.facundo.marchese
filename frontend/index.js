// Agarramos los dos contenedores del HTML
let contenedor_retros = document.querySelector("#listado-retros");
let contenedor_nuevos = document.querySelector("#listado-nuevos");

let carro = JSON.parse(localStorage.getItem("carro")) || [];
let listaProductosGlobal = [];

async function mostrarpoductos() {
    try {
        let respuesta = await fetch("http://localhost:3000/api/products/juegos");
        let formato = await respuesta.json();
        listaProductosGlobal = formato.payload;
        
        // Limpiamos los contenedores por si acaso antes de renderizar
        contenedor_retros.innerHTML = "";
        contenedor_nuevos.innerHTML = "";
        
        renderizarproductos();
    } catch (error) {
        console.error("Error al traer los productos:", error);
    }
}

// Función auxiliar para generar el HTML de una tarjeta (así no repetimos código)
function crearTarjetaHTML(producto) {
    return `
        <li class="card-productos">
            <img class="imagen-producto" src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.genero}</p>
            <p>$ ${producto.precio}</p>
            <div class="botones-card">
                <button class="btn-ag" onclick="llenarcarro('${producto.nombre}')">+</button>
                <button class="btn-sc" onclick="restarproducto('${producto.id}')">-</button>
            </div>
        </li>
    `;
}

function renderizarproductos() {
    listaProductosGlobal.forEach(producto => {
        // Controlá bien cómo tenés guardados los strings en tu BD (si 'retro', 'Retro', etc.)
        if (producto.tipo_de_juegos && producto.tipo_de_juegos.toLowerCase() === 'retro') {
            contenedor_retros.innerHTML += crearTarjetaHTML(producto);
        } else {
            // Si no es retro (o si dice 'nuevo'), va a la sección de abajo
            contenedor_nuevos.innerHTML += crearTarjetaHTML(producto);
        }
    });
}

function llenarcarro(nombrejuego) {
    let productoencarro = carro.find(p => p.nombre === nombrejuego);
    if (productoencarro) {
        productoencarro.cantidad += 1;
    } else {
        let juegooriginal = listaProductosGlobal.find(p => p.nombre === nombrejuego);
        carro.push({ ...juegooriginal, cantidad: 1 });
    }
    alert("Has añadido este producto");
    localStorage.setItem("carro", JSON.stringify(carro));
}

function restarproducto(idpro) {
    let indice = carro.findIndex(p => p.id == idpro);
    if (indice === -1) {
        alert("No existe este producto en el carrito");
        return;
    }
    
    let productoencarro = carro[indice];
    productoencarro.cantidad -= 1;
    
    if (productoencarro.cantidad <= 0) {
        carro.splice(indice, 1);
        console.log("Se borró el producto del carrito");
    }
    localStorage.setItem("carro", JSON.stringify(carro));
}

// Ejecutamos la carga inicial
mostrarpoductos();