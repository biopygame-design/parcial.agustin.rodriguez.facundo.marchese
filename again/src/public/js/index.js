const contenedorProductos = document.getElementById("contenedor-productos");

        const urlBase = "http://localhost:3000/juegos";

        // Optimizacion 1: Mostramos el mensaje de error visualmente
        function mostrarError(message) {
            contenedorProductos.innerHTML = `
                <p class="mensaje mensaje-error">${message}</p>
            `;
        }

        async function obtenerProductos() {
            try {
                // Gracias a la API fetch, realizo una peticion HTTP GET a mi propia api rest, al endpoint GET /api/products
                const response = await fetch(urlBase);
                console.log(response); // Aca podemos chequear el booleano que vamos a usar en el if abajo

                // Una vez que recibo todo el choclo JSON, lo parseo con response.json()
                const data = await response.json();

                // Los codigos 200 llevan un booleano ok: true (200 OK)
                if (!response.ok) {
                    mostrarError(data.message);
                    return;
                }
                
                // Extraigo los productos que vienen en la clave payload
                const productos = data.payload;
                console.log(productos);
                
                renderizarProductos(productos);

            } catch (error) {
                console.error(error);
                mostrarError("Error de conexion con el servidor");
            }

        }

        function renderizarProductos(array) {
            let htmlProductos = "";

            array.forEach(producto => {
                htmlProductos += `
                    <div class="card-producto">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <h4>${producto.nombre}</h4>
                        <p>Id: ${producto.id}</p>
                        <p>$${producto.precio}</p>
                    </div>
                `;
            });

            contenedorProductos.innerHTML = htmlProductos;
        }

        obtenerProductos();