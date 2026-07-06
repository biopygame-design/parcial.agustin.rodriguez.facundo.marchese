let carrito = [];

function obtenerCarrito() 
{
    carrito = JSON.parse(localStorage.getItem("carro")) || [];
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");
    if (!tabla) return; // Seguridad por si la tabla no está en el HTML

    obtenerCarrito();
    let totalCarrito = 0;
    
    // 1. Reseteamos la tabla dejando fijos tus encabezados originales
    tabla.innerHTML = `
        <tr class="fila-header-carrito">
            <td class="celda-header-tabla-carrito">Nombre del producto</td>
            <td class="celda-header-tabla-carrito">cantidad producto</td>
           
            <td class="celda-header-tabla-carrito">Precio unitario</td>
        </tr>
    `;

    // 2. Recorremos el carrito y vamos SUMANDO filas abajo
    carrito.forEach(producto => {
        let cantidadCorrecta = producto.cantidad || 1;

        totalCarrito += producto.precio * cantidadCorrecta;
        
        
        // Clonamos la estructura usando += y etiquetas TR y TD válidas
        tabla.innerHTML += `
            <tr class="fila-producto-carrito">
                <td class="celda-producto-carrito">${producto.nombre}</td>
                <td class = "celda-producto-carrito">${producto.cantidad}</td>
                
                <td class="celda-producto-carrito">$${producto.precio}</td>
            </tr>
        `;
    });
    let precioht = document.getElementById("valor-final")
        precioht.innerHTML = `$ ${totalCarrito}`
}

function limpiarCarrito() 
{
    carrito = [];
    localStorage.removeItem("carro");
    cargarProductosCarrito();
}

// Ejecutamos al cargar la página
cargarProductosCarrito();


function imprimirticket() {
    let botondinalizar = document.querySelector(".boton-finalizar");
    if (!botondinalizar) return;

    botondinalizar.addEventListener("click", (event) => {
        
        
        const nombreIngresado = sessionStorage.getItem("nombreCliente");

        // Si por alguna razón no pasó por el formulario, le pedimos el nombre acá
        if (!nombreIngresado) {
            alert("Por favor, primero ingresá tu nombre en la pantalla de bienvenida.");
            window.location.href = "from.html";
            return;
        }

        if (carrito.length === 0) {
            alert("No hay productos en el carrito para generar un ticket.");
            return;
        }

        console.log("Procesando compra para:", nombreIngresado);

       
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let y = 40;

        doc.setFontSize(28);
        doc.text("Ticket de compra - GameXtreme", 30, y); 

        y += 20;
        doc.setFontSize(14);
        doc.text(`Cliente: ${nombreIngresado}`, 30, y);
        y += 10;
        doc.text("--------------------------------------------------", 30, y);
        y += 15;
        
        carrito.forEach(producto => {
            doc.text(`${producto.nombre}`, 30, y);
            doc.text(`$${producto.precio}`, 150, y); 
            y += 15; 
        });

        const precioTotal = carrito.reduce((total, prod) => total + parseFloat(prod.precio), 0);
        y += 10;
        doc.setFontSize(18);
        doc.text(`Total a pagar: $${precioTotal}`, 30, y);

        let fecha = new Date();
        let formatoFecha = fecha.toISOString().split('T')[0];
        let nombreTicket = `ticket-${nombreIngresado}-${formatoFecha}.pdf`;

        doc.save(nombreTicket);

      
        const datosCompra = {
            nombre: nombreIngresado, // MANDAMOS 'nombre' PARA QUE CONFECCIONE BIEN EN EL BACK
            productos: carrito,
            pago_total : precioTotal
        };

        fetch("http://localhost:3000/clientes/compras", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosCompra)
        })
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            alert("¡Compra procesada con éxito y guardada en la base de datos!");
            
            sessionStorage.removeItem("nombreCliente");
            limpiarCarrito();
        })
        .catch(error => {
            console.error("Error al guardar la compra:", error);
            alert("Hubo un problema al conectar con el servidor.");
        });
    });
}
imprimirticket()