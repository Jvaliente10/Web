document.addEventListener('DOMContentLoaded', obtenerClasificacion);

async function obtenerClasificacion() {
    const role = localStorage.getItem("user");
    if (role == "ADMIN") {
        let token = localStorage.getItem("token");
        let respuesta = await fetch('http://localhost:8081/equipos/puntos',
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
        if (respuesta.ok) {
            let datos = await respuesta.json();
            if (datos.length > 0) {
                let tabla = document.querySelector("#tablaClasificación");

                // Eliminamos las filas anteriores
                while (tabla.firstChild) {
                    tabla.removeChild(tabla.firstChild);
                }

                // Crear el elemento thead y la fila del encabezado
                let thead = document.createElement("thead");
                let filaEncabezado = document.createElement("tr");

                // Crear los elementos de encabezado y agregarles el texto
                let thNombreEquipo = document.createElement("th");
                thNombreEquipo.textContent = "Nombre";
                let thPuntosEquipo = document.createElement("th");
                thPuntosEquipo.textContent = "Puntos";
                let thAcciones = document.createElement("th");
                thAcciones.textContent = "Edición";




                // Agregar cada elemento de encabezado a la fila del encabezado
                filaEncabezado.appendChild(thNombreEquipo);
                filaEncabezado.appendChild(thPuntosEquipo);
                filaEncabezado.appendChild(thAcciones);

                // Agregar la fila del encabezado al thead
                thead.appendChild(filaEncabezado);

                // Agregar el thead al principio de la tabla
                tabla.insertBefore(thead, tabla.firstChild);
                let tbody = document.createElement("thead");
                // Recorrer los datos de la respuesta
                for (let clasificacion of datos) {
                    let fila = tabla.insertRow();
                    let celdaNombre = fila.insertCell(0);
                    let celdaPuntos = fila.insertCell(1);
                    let celdaAcciones = fila.insertCell(2); // Celda para los botones de acciones



                    celdaNombre.innerHTML = clasificacion.nombreEquipo;
                    celdaPuntos.innerHTML = clasificacion.puntosEquipo;
                    // // Crear los botones de editar y borrar
                    let botonEditar = document.createElement("button");
                    botonEditar.textContent = "Editar";
                    botonEditar.classList.add("btn", "btn-sm", "btn-primary", "mr-1");
                    botonEditar.addEventListener("click", () => {
                        crearFormularioEdicionEquipo(clasificacion.idEquipo);

                    });

                    let botonBorrar = document.createElement("button");
                    botonBorrar.textContent = "Borrar";
                    botonBorrar.classList.add("btn", "btn-sm", "btn-danger");
                    botonBorrar.addEventListener("click", () => {
                        eliminarEquipo(clasificacion.idEquipo);
                    });

                    // Agregar los botones a la celda de acciones
                    celdaAcciones.appendChild(botonEditar);
                    celdaAcciones.appendChild(botonBorrar);
                    tbody.appendChild(fila);
                }
                tabla.appendChild(tbody);
                tabla.parentNode.classList.add("table-responsive");
                // Crear el botón "Añadir" dentro de la función
                let btnAddPartido = document.createElement("button");
                btnAddPartido.id = "btnAddPartido";
                btnAddPartido.classList.add("btn", "btn-primary", "btn-block", "mb-2");
                btnAddPartido.style.width = "100%";
                btnAddPartido.textContent = "Añadir";
                btnAddPartido.addEventListener("click", () => {
                    let tablaEquipos = document.getElementById("divTablaClasificacion");
                    tablaEquipos.style.display = "none";

                    addEquipo();

                });

                // Agregar el botón al div
                let divBtnAdd = document.getElementById("divTablaClasificacion");
                divBtnAdd.appendChild(btnAddPartido);
            }
            else {
                alert("No se han recuperado registros de la base de datos");
            }

        }
        else {
            alert("Acceso denegado");
        }



    }
    else {
        let respuesta = await fetch('http://localhost:8081/equipos/puntos');
        if (respuesta.ok) {
            let datos = await respuesta.json();
            if (datos.length > 0) {
                let tabla = document.querySelector("#tablaClasificación");

                // Eliminamos las filas anteriores
                while (tabla.firstChild) {
                    tabla.removeChild(tabla.firstChild);
                }

                // Crear el elemento thead y la fila del encabezado
                let thead = document.createElement("thead");
                let filaEncabezado = document.createElement("tr");

                // Crear los elementos de encabezado y agregarles el texto
                let thNombreEquipo = document.createElement("th");
                thNombreEquipo.textContent = "Nombre";
                let thPuntosEquipo = document.createElement("th");
                thPuntosEquipo.textContent = "Puntos";



                // Agregar cada elemento de encabezado a la fila del encabezado
                filaEncabezado.appendChild(thNombreEquipo);
                filaEncabezado.appendChild(thPuntosEquipo);

                // Agregar la fila del encabezado al thead
                thead.appendChild(filaEncabezado);

                // Agregar el thead al principio de la tabla
                tabla.insertBefore(thead, tabla.firstChild);
                let tbody = document.createElement("thead");
                // Recorrer los datos de la respuesta
                for (let clasificacion of datos) {
                    let fila = tabla.insertRow();
                    let celdaNombre = fila.insertCell(0);
                    let celdaPuntos = fila.insertCell(1);



                    celdaNombre.innerHTML = clasificacion.nombreEquipo;
                    celdaPuntos.innerHTML = clasificacion.puntosEquipo;
                    tbody.appendChild(fila);
                }
                tabla.appendChild(tbody);
                tabla.parentNode.classList.add("table-responsive");
            }
            else {
                alert("No se han recuperado registros de la base de datos");
            }

        }
        else {
            alert("Acceso denegado");
        }
    }
}

// Función para eliminar el equipo cuyo botón eliminar haya sido pulsado
async function eliminarEquipo(id) {

    let token = localStorage.getItem("token");
    let respuesta = await fetch(`http://localhost:8081/equipos/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if (respuesta.ok) {
        // El partido se eliminó correctamente
        alert("Equipo eliminado correctamente");
        location.href = "clasificacion.html";
        // Realizar las acciones necesarias (por ejemplo, eliminar el elemento del DOM)
    } else {
        // Ocurrió un error al eliminar el partido
        alert("Error al eliminar el Equipo:", respuesta.status);
    }
}

function crearFormularioEdicionEquipo(idEquipo) {
    // Ocultar la tabla de partidos
    let tablaEquipos = document.getElementById("tablaClasificación");
    tablaEquipos.style.display = "none";

    // Mostrar el formulario de edición
    let editarPartidosDiv = document.getElementById("editarEquipos");
    editarPartidosDiv.style.display = "block";

    // Realizar la llamada al backend para obtener los datos del partido
    let token = localStorage.getItem("token");
    let url = `http://localhost:8081/equipos/${idEquipo}`;

    fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener los datos del partido");
            }
        })
        .then((equipo) => {
            // Crear el formulario de edición
            let formulario = document.createElement("form");
            formulario.classList.add("needs-validation");

            // Campo: Nombre
            let nomEquipoFormGroup = document.createElement("div");
            nomEquipoFormGroup.classList.add("form-group", "row", "mt-2", "mb-2");

            let nomEquipoLabel = document.createElement("label");
            nomEquipoLabel.textContent = "Fecha";
            nomEquipoLabel.classList.add("col-sm-2", "col-form-label");
            nomEquipoFormGroup.appendChild(nomEquipoLabel);

            let nomEquipoInputContainer = document.createElement("div");
            nomEquipoInputContainer.classList.add("col-sm-10");

            let nomEquipoInput = document.createElement("input");
            nomEquipoInput.setAttribute("type", "text");
            nomEquipoInput.setAttribute("placeholder", "Fecha");
            nomEquipoInput.classList.add("form-control");
            nomEquipoInput.id = "nomEquipoInput";
            nomEquipoInput.value = equipo.nombreEquipo; // Establecer el valor del partido
            nomEquipoInputContainer.appendChild(nomEquipoInput);

            nomEquipoFormGroup.appendChild(nomEquipoInputContainer);

            formulario.appendChild(nomEquipoFormGroup);

            // Campo: Puntos
            let puntosFormGroup = document.createElement("div");
            puntosFormGroup.classList.add("form-group", "row", "mt-2", "mb-2");

            let puntosLabel = document.createElement("label");
            puntosLabel.textContent = "Puntos";
            puntosLabel.classList.add("col-sm-2", "col-form-label");
            puntosFormGroup.appendChild(puntosLabel);

            let puntosInputContainer = document.createElement("div");
            puntosInputContainer.classList.add("col-sm-10");

            let puntosInput = document.createElement("input");
            puntosInput.setAttribute("type", "number");
            puntosInput.setAttribute("placeholder", "Puntos");
            puntosInput.classList.add("form-control");
            puntosInput.id = "puntosInput";
            puntosInput.value = equipo.puntosEquipo; // Establecer el valor del partido
            puntosInputContainer.appendChild(puntosInput);

            puntosFormGroup.appendChild(puntosInputContainer);

            formulario.appendChild(puntosFormGroup);

            // Agregar el formulario al contenedor de edición de partidos
            editarPartidosDiv.appendChild(formulario);

            // Crear el botón de guardar cambios
            let guardarCambiosButton = document.createElement("button");
            guardarCambiosButton.textContent = "Guardar Cambios";
            guardarCambiosButton.classList.add("btn", "btn-primary", "mb-3");
            guardarCambiosButton.addEventListener("click", function () {

                // Realizar las acciones para guardar los cambios en el backend
                guardarCambiosEquipo(equipo.idEquipo);

                // Mostrar la tabla de partidos y ocultar el formulario de edición
                tablaEquipos.style.display = "block";
                editarPartidosDiv.style.display = "none";
            });

            // Agregar el botón de guardar cambios al formulario
            formulario.appendChild(guardarCambiosButton);
        })
        .catch((error) => {
            alert(error.message);
        });
}

function guardarCambiosEquipo(idEquipo) {
    let nombre = document.getElementById("nomEquipoInput").value;
    let puntos = document.getElementById("puntosInput").value;

    let nuevoEquipo = {
        nombreEquipo: nombre,
        puntosEquipo: puntos,
        partidosLocal: [],
        partidosVisitante: []
    };

    let token = localStorage.getItem("token");
    let url = `http://localhost:8081/equipos/${idEquipo}`;

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoEquipo),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al guardar los cambios del equipo");
            }
        })
        .then((equipoModificado) => {
            console.log("Cambios guardados:", equipoModificado);
            location.href = "clasificacion.html";
        })
        .catch(() => {
            alert("Cambios guardados correctamente");
            location.href = "clasificacion.html";
        });
}

function addEquipo() {
    let tablaEquipos = document.getElementById("tablaClasificación");
    tablaEquipos.style.display = "none";
    let addEquiposDiv = document.getElementById("addEquipos");
    let formulario = document.createElement("form");
    formulario.classList.add("needs-validation");



    // Campo: Nombre
    let nomEquipoFormGroup = document.createElement("div");
    nomEquipoFormGroup.classList.add("form-group", "row", "mt-2", "mb-2");

    let nomEquipoLabel = document.createElement("label");
    nomEquipoLabel.textContent = "Nombre";
    nomEquipoLabel.classList.add("col-sm-2", "col-form-label");
    nomEquipoFormGroup.appendChild(nomEquipoLabel);

    let nomEquipoInputContainer = document.createElement("div");
    nomEquipoInputContainer.classList.add("col-sm-10");

    let nomEquipoInput = document.createElement("input");
    nomEquipoInput.setAttribute("type", "text");
    nomEquipoInput.setAttribute("placeholder", "Nombre");
    nomEquipoInput.classList.add("form-control");
    nomEquipoInput.id = "nomEquipoInput";
    nomEquipoInputContainer.appendChild(nomEquipoInput);

    nomEquipoFormGroup.appendChild(nomEquipoInputContainer);

    formulario.appendChild(nomEquipoFormGroup);

    // Campo: Puntos
    let puntosFormGroup = document.createElement("div");
    puntosFormGroup.classList.add("form-group", "row", "mt-2", "mb-2");

    let puntosLabel = document.createElement("label");
    puntosLabel.textContent = "Puntos";
    puntosLabel.classList.add("col-sm-2", "col-form-label");
    puntosFormGroup.appendChild(puntosLabel);

    let puntosInputContainer = document.createElement("div");
    puntosInputContainer.classList.add("col-sm-10");

    let puntosInput = document.createElement("input");
    puntosInput.setAttribute("type", "number");
    puntosInput.setAttribute("placeholder", "Puntos");
    puntosInput.classList.add("form-control");
    puntosInput.id = "puntosInput";
    puntosInputContainer.appendChild(puntosInput);

    puntosFormGroup.appendChild(puntosInputContainer);

    formulario.appendChild(puntosFormGroup);

    // Agregar el formulario al contenedor de edición de partidos
    addEquiposDiv.appendChild(formulario);

    // Crear el botón de guardar cambios
    let guardarCambiosButton = document.createElement("button");
    guardarCambiosButton.textContent = "Guardar Cambios";
    guardarCambiosButton.classList.add("btn", "btn-primary", "mb-3");
    guardarCambiosButton.addEventListener("click", function () {

        // Realizar las acciones para guardar los cambios en el backend
        guardarEquipo();

        // Mostrar la tabla de partidos y ocultar el formulario de edición
    
    });

    // Agregar el botón de guardar cambios al formulario
    formulario.appendChild(guardarCambiosButton);

    // Agregar el botón de guardar cambios al formulario
    formulario.appendChild(guardarCambiosButton);
}

function guardarEquipo(){
    let nombre = document.getElementById("nomEquipoInput").value;
    let puntos = document.getElementById("puntosInput").value;

    let nuevoEquipo = {
        nombreEquipo: nombre,
        puntosEquipo: puntos,
        partidosLocal: [],
        partidosVisitante: []
    };

    let token = localStorage.getItem("token");
    let url = `http://localhost:8081/equipos`;

    fetch(url, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoEquipo),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al guardar los cambios del equipo");
            }
        })
        .then((equipoModificado) => {
            console.log("Cambios guardados:", equipoModificado);
            location.href = "clasificacion.html";
        })
        .catch(() => {
            alert("Cambios guardados correctamente");
            location.href = "clasificacion.html";
        });
}
