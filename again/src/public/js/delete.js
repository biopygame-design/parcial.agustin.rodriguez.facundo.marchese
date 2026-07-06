
    // Escuchamos los clics de manera eficiente usando delegación de eventos en la tabla
    const tabla = document.getElementById('tabla-productos');
    
    if (tabla) {
        tabla.addEventListener('click', async (event) => {
            // Verificamos si el elemento clickeado es un botón de eliminar
            if (event.target.classList.contains('btn-eliminar-prod')) {
                const boton = event.target;
                const idProducto = boton.getAttribute('data-id');

                // Pregunta de seguridad nativa
                const confirmar = confirm(`¿Estás seguro de que querés eliminar el producto con ID ${idProducto}?`);
                
                if (confirmar) {
                    try {
                        // 🔑 Enviamos la petición DELETE a la URL correspondiente de tu backend
                        // Ajustá la ruta según cómo la hayas declarado en productroutes.js (ej: /api/products/5)
                        const respuesta = await fetch(`http://localhost:3000/api/products/${idProducto}`, {
                            method: 'DELETE'
                        });

                        const data = await respuesta.json();

                        if (respuesta.ok) {
                            alert(data.message || "Producto eliminado con éxito.");
                            
                            // 🚀 EFECTO VISUAL: Eliminamos la fila del HTML en tiempo real sin recargar la página
                            const filaAEliminar = document.getElementById(`fila-${idProducto}`);
                            if (filaAEliminar) {
                                filaAEliminar.remove();
                            }
                        } else {
                            alert(`Error del servidor: ${data.message}`);
                        }

                    } catch (error) {
                        console.error("Error al conectar con el backend:", error);
                        alert("Hubo un problema de conexión al intentar eliminar el producto.");
                    }
                }
            }
        })
    }
