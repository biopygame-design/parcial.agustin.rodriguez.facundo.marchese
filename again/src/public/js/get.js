const contenedorProductos = document.getElementById("contenedor-productos");
        const getProductForm = document.getElementById("getProduct-form");
        const urlBase = "http://localhost:3000/api/products";

        // Optimizacion 1: Mostramos el mensaje de error visualmente
        function mostrarError(message) {
            contenedorProductos.innerHTML = `
                <p class="mensaje mensaje-error">${message}</p>
            `;
        }

        getProductForm.addEventListener("submit", async event => {
            event.preventDefault(); // Evitamos el envio por defecto

            // Optimizacion 2: Extraemos directo el valor sin FormData
            const idProd = event.target.idProd.value.trim();

            if (!idProd) {
                mostrarError("Ingresá un ID válido");
                return;
            }

            try {
                // Hacemos el fetch a la URL base pasando el ID
                const response = await fetch(`${urlBase}/${idProd}`);
                const data = await response.json();

                // Optimizacion 4: Evaluamos si el servidor no respondio un ok
                if (!response.ok) {
                    mostrarError(data.message || "Error al buscar el producto");
                    return;
                }

                // Guardamos el objeto extraído del array payload
                const producto = data.payload[0];
                
                if (!producto) {
                    mostrarError("Producto no encontrado");
                    return;
                }
                
                mostrarProducto(producto);

            } catch (error) {
                console.error("Error al obtener el producto: ", error);
                // Corregido: Pasamos un solo parámetro string a mostrarError
                mostrarError("Error de conexión con el servidor");
            }
        });

        // Función corregida para manejar el objeto individual con propiedades en español
        function mostrarProducto(producto) {
            console.table(producto); 

            // Construimos directamente el HTML mapeando las propiedades reales de tu backend
            let htmlProducto = `
                <ul>
                    <li class="lista-producto">
                        <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 200px;">
                        <p>
                            <strong>ID:</strong> ${producto.id} / 
                            <strong>Nombre:</strong> ${producto.nombre} / 
                            <strong>Precio:</strong> $${producto.precio}
                        </p>
                    </li>
                </ul>
            `;

            // Insertamos el resultado en el DOM de forma segura
            contenedorProductos.innerHTML = htmlProducto;
        }
       