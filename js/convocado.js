document.addEventListener('DOMContentLoaded', obtenerPuntos);
document.addEventListener('DOMContentLoaded', obtenerAsistencias);
document.addEventListener('DOMContentLoaded', obtenerRebotes);
document.addEventListener('DOMContentLoaded', obtenerBloqueos);
document.addEventListener('DOMContentLoaded', obtenerRobos);
document.addEventListener('DOMContentLoaded', obtenerMinutos);

async function obtenerPuntos() {
    let respuesta = await fetch('http://localhost:8081/convocados/puntos');
    if (respuesta.ok) {
        let datos = await respuesta.json();
        if (datos) {
            let tabla = document.querySelector("#tablaMasPuntos");

            // Eliminamos las filas anteriores
            while (tabla.firstChild) {
                tabla.removeChild(tabla.firstChild);
            }

            // Crear el elemento thead y la fila del encabezado
            let thead = document.createElement("thead");
            let filaEncabezado = document.createElement("tr");

            // Crear los elementos de encabezado y agregarles el texto
            let thNombreJugador = document.createElement("th");
            thNombreJugador.textContent = "Nombre";
            let thPuntosJugador = document.createElement("th");
            thPuntosJugador.textContent = "Puntos";

            // Agregar cada elemento de encabezado a la fila del encabezado
            filaEncabezado.appendChild(thNombreJugador);
            filaEncabezado.appendChild(thPuntosJugador);

            // Agregar la fila del encabezado al thead
            thead.appendChild(filaEncabezado);

            // Agregar el thead al principio de la tabla
            tabla.insertBefore(thead, tabla.firstChild);
            let tbody = document.createElement("thead");

            // Crear una fila para mostrar los datos
            let fila = tabla.insertRow();
            let celdaNombre = fila.insertCell(0);
            let celdaPuntos = fila.insertCell(1);

            celdaNombre.innerHTML = datos.nomJugador;
            celdaPuntos.innerHTML = datos.puntos;

            tbody.appendChild(fila);

            // Agregar el tbody a la tabla
            tabla.appendChild(tbody);
        } else {
            alert("No se han recuperado registros de la base de datos");
        }

    } else {
        alert("Error al conectar con la API");
    }
}

async function obtenerAsistencias() {
    let respuesta = await fetch('http://localhost:8081/convocados/asistencias');
    if (respuesta.ok) {
        let datos = await respuesta.json();
        if (datos) {
            let tabla = document.querySelector("#tablaMasAsistencias");

            // Eliminamos las filas anteriores
            while (tabla.firstChild) {
                tabla.removeChild(tabla.firstChild);
            }

            // Crear el elemento thead y la fila del encabezado
            let thead = document.createElement("thead");
            let filaEncabezado = document.createElement("tr");

            // Crear los elementos de encabezado y agregarles el texto
            let thNombreJugador = document.createElement("th");
            thNombreJugador.textContent = "Nombre";
            let thAsistenciasJugador = document.createElement("th");
            thAsistenciasJugador.textContent = "Asistencias";

            // Agregar cada elemento de encabezado a la fila del encabezado
            filaEncabezado.appendChild(thNombreJugador);
            filaEncabezado.appendChild(thAsistenciasJugador);

            // Agregar la fila del encabezado al thead
            thead.appendChild(filaEncabezado);

            // Agregar el thead al principio de la tabla
            tabla.insertBefore(thead, tabla.firstChild);
            let tbody = document.createElement("thead");

            // Crear una fila para mostrar los datos
            let fila = tabla.insertRow();
            let celdaNombre = fila.insertCell(0);
            let celdaAsistencias = fila.insertCell(1);

            celdaNombre.innerHTML = datos.nomJugador;
            celdaAsistencias.innerHTML = datos.asistencias;

            tbody.appendChild(fila);

            // Agregar el tbody a la tabla
            tabla.appendChild(tbody);
        } else {
            alert("No se han recuperado registros de la base de datos");
        }

    } else {
        alert("Error al conectar con la API");
    }
}

async function obtenerRebotes() {
    let respuesta = await fetch('http://localhost:8081/convocados/rebotes');
    if (respuesta.ok) {
        let datos = await respuesta.json();
        if (datos) {
            let tabla = document.querySelector("#tablaMasRebotes");

            // Eliminamos las filas anteriores
            while (tabla.firstChild) {
                tabla.removeChild(tabla.firstChild);
            }

            // Crear el elemento thead y la fila del encabezado
            let thead = document.createElement("thead");
            let filaEncabezado = document.createElement("tr");

            // Crear los elementos de encabezado y agregarles el texto
            let thNombreJugador = document.createElement("th");
            thNombreJugador.textContent = "Nombre";
            let thRebotesJugador = document.createElement("th");
            thRebotesJugador.textContent = "Rebotes";

            // Agregar cada elemento de encabezado a la fila del encabezado
            filaEncabezado.appendChild(thNombreJugador);
            filaEncabezado.appendChild(thRebotesJugador);

            // Agregar la fila del encabezado al thead
            thead.appendChild(filaEncabezado);

            // Agregar el thead al principio de la tabla
            tabla.insertBefore(thead, tabla.firstChild);
            let tbody = document.createElement("thead");

            // Crear una fila para mostrar los datos
            let fila = tabla.insertRow();
            let celdaNombre = fila.insertCell(0);
            let celdaRebotes = fila.insertCell(1);

            celdaNombre.innerHTML = datos.nomJugador;
            celdaRebotes.innerHTML = datos.rebotes;

            tbody.appendChild(fila);

            // Agregar el tbody a la tabla
            tabla.appendChild(tbody);
        } else {
            alert("No se han recuperado registros de la base de datos");
        }

    } else {
        alert("Error al conectar con la API");
    }
}

async function obtenerBloqueos() {
    let respuesta = await fetch('http://localhost:8081/convocados/bloqueos');
    if (respuesta.ok) {
        let datos = await respuesta.json();
        if (datos) {
            let tabla = document.querySelector("#tablaMasBloqueos");

            // Eliminamos las filas anteriores
            while (tabla.firstChild) {
                tabla.removeChild(tabla.firstChild);
            }

            // Crear el elemento thead y la fila del encabezado
            let thead = document.createElement("thead");
            let filaEncabezado = document.createElement("tr");

            // Crear los elementos de encabezado y agregarles el texto
            let thNombreJugador = document.createElement("th");
            thNombreJugador.textContent = "Nombre";
            let thBloqueosJugador = document.createElement("th");
            thBloqueosJugador.textContent = "Bloqueos";

            // Agregar cada elemento de encabezado a la fila del encabezado
            filaEncabezado.appendChild(thNombreJugador);
            filaEncabezado.appendChild(thBloqueosJugador);

            // Agregar la fila del encabezado al thead
            thead.appendChild(filaEncabezado);

            // Agregar el thead al principio de la tabla
            tabla.insertBefore(thead, tabla.firstChild);
            let tbody = document.createElement("thead");

            // Crear una fila para mostrar los datos
            let fila = tabla.insertRow();
            let celdaNombre = fila.insertCell(0);
            let celdaBloqueos = fila.insertCell(1);

            celdaNombre.innerHTML = datos.nomJugador;
            celdaBloqueos.innerHTML = datos.bloqueos;

            tbody.appendChild(fila);

            // Agregar el tbody a la tabla
            tabla.appendChild(tbody);
        } else {
            alert("No se han recuperado registros de la base de datos");
        }

    } else {
        alert("Error al conectar con la API");
    }
}

async function obtenerRobos() {
    let respuesta = await fetch('http://localhost:8081/convocados/robos');
    if (respuesta.ok) {
        let datos = await respuesta.json();
        if (datos) {
            let tabla = document.querySelector("#tablaMasRobos");

            // Eliminamos las filas anteriores
            while (tabla.firstChild) {
                tabla.removeChild(tabla.firstChild);
            }

            // Crear el elemento thead y la fila del encabezado
            let thead = document.createElement("thead");
            let filaEncabezado = document.createElement("tr");

            // Crear los elementos de encabezado y agregarles el texto
            let thNombreJugador = document.createElement("th");
            thNombreJugador.textContent = "Nombre";
            let thRobosJugador = document.createElement("th");
            thRobosJugador.textContent = "Robos";

            // Agregar cada elemento de encabezado a la fila del encabezado
            filaEncabezado.appendChild(thNombreJugador);
            filaEncabezado.appendChild(thRobosJugador);

            // Agregar la fila del encabezado al thead
            thead.appendChild(filaEncabezado);

            // Agregar el thead al principio de la tabla
            tabla.insertBefore(thead, tabla.firstChild);
            let tbody = document.createElement("thead");

            // Crear una fila para mostrar los datos
            let fila = tabla.insertRow();
            let celdaNombre = fila.insertCell(0);
            let celdaRobos = fila.insertCell(1);

            celdaNombre.innerHTML = datos.nomJugador;
            celdaRobos.innerHTML = datos.robos;

            tbody.appendChild(fila);

            // Agregar el tbody a la tabla
            tabla.appendChild(tbody);
        } else {
            alert("No se han recuperado registros de la base de datos");
        }

    } else {
        alert("Error al conectar con la API");
    }
}

async function obtenerMinutos() {
    let respuesta = await fetch('http://localhost:8081/convocados/minutos');
    if (respuesta.ok) {
        let datos = await respuesta.json();
        if (datos) {
            let tabla = document.querySelector("#tablaMasMinutos");

            // Eliminamos las filas anteriores
            while (tabla.firstChild) {
                tabla.removeChild(tabla.firstChild);
            }

            // Crear el elemento thead y la fila del encabezado
            let thead = document.createElement("thead");
            let filaEncabezado = document.createElement("tr");

            // Crear los elementos de encabezado y agregarles el texto
            let thNombreJugador = document.createElement("th");
            thNombreJugador.textContent = "Nombre";
            let thMinutosJugador = document.createElement("th");
            thMinutosJugador.textContent = "Minutos";

            // Agregar cada elemento de encabezado a la fila del encabezado
            filaEncabezado.appendChild(thNombreJugador);
            filaEncabezado.appendChild(thMinutosJugador);

            // Agregar la fila del encabezado al thead
            thead.appendChild(filaEncabezado);

            // Agregar el thead al principio de la tabla
            tabla.insertBefore(thead, tabla.firstChild);
            let tbody = document.createElement("thead");

            // Crear una fila para mostrar los datos
            let fila = tabla.insertRow();
            let celdaNombre = fila.insertCell(0);

            let celdaMinutos = fila.insertCell(1);

            celdaNombre.innerHTML = datos.nomJugador;
            celdaMinutos.innerHTML = datos.minutos;

            tbody.appendChild(fila);

            // Agregar el tbody a la tabla
            tabla.appendChild(tbody);
        } else {
            alert("No se han recuperado registros de la base de datos");
        }

    } else {
        alert("Error al conectar con la API");
    }
}






