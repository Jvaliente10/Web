document.addEventListener('DOMContentLoaded', obtenerClasificacion);

async function obtenerClasificacion(){
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
        alert("Error al conectar con la API");
    } 
}

document.addEventListener('DOMContentLoaded', obtenerJugadores);

async function obtenerJugadores() {
  const token = localStorage.getItem("token");

  let respuesta = await fetch('http://localhost:8081/jugadores', {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (respuesta.ok) {
    let datos = await respuesta.json();
    if (datos.length > 0) {
      let contenedor = document.querySelector("#tarjetasJugadores");

      // Eliminar las tarjetas anteriores
      while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
      }

      // Recorrer los datos de la respuesta
      for (let jugador of datos) {
        // Crear la tarjeta para el jugador
        let cardJugador = document.createElement("div");
        cardJugador.classList.add("col-md-4", "col-sm-6", "mb-3"); // Establecer el tamaño de la columna según el tamaño de la pantalla

        // Crear el contenido de la tarjeta
        let contenidoTarjeta = `
              <div class="card">
                <img src="images/logo1.png" class="card-img-top" alt="Imagen del jugador">
                <div class="card-body">
                  <h5 class="card-title">${jugador.nomJugador}</h5>
                  <p class="card-text">Dorsal: ${jugador.dorsalJugador}</p>
                  <p class="card-text">Posición: ${jugador.posicionJugador}</p>
                </div>
              </div>
            `;
        cardJugador.innerHTML = contenidoTarjeta;

        // Agregar la tarjeta al contenedor
        contenedor.appendChild(cardJugador);
        

        // Asignar el evento de clic a la tarjeta
        cardJugador.addEventListener("click", () => {
          obtenerOtrosDatos(jugador.nomJugador);
          contenedor.style.display = "none";

        });
      }
    } else {
      alert("No se han recuperado registros de la base de datos");
    }
  } else {
    alert("Error al conectar con la API");
  }
}


async function obtenerOtrosDatos(nombreJugador) {
  let respuesta = await fetch(`http://localhost:8081/convocados/${nombreJugador}`);
  if (respuesta.ok) {
    let datos = await respuesta.json();
    if (datos) {
      let tabla = document.querySelector("#tablaConvocados");

      // Eliminamos las filas anteriores
      while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
      }

      // Crear el elemento thead y la fila del encabezado
      let thead = document.createElement("thead");
      let filaEncabezado = document.createElement("tr");

      // Crear los elementos de encabezado y agregarles el texto
      let thIdPartido = document.createElement("th");
      thIdPartido.textContent = "ID Partido";
      let thPuntos = document.createElement("th");
      thPuntos.textContent = "Puntos";
      let thAsistencias = document.createElement("th");
      thAsistencias.textContent = "Asistencias";
      let threbotes = document.createElement("th");
      threbotes.textContent = "Rebotes";
      let thRobos = document.createElement("th");
      thRobos.textContent = "Robos";
      let thBloqueos = document.createElement("th");
      thBloqueos.textContent = "Bloqueos";
      let thFaltas = document.createElement("th");
      thFaltas.textContent = "Faltas";
      let thMinutos = document.createElement("th");
      thMinutos.textContent = "Minutos";

      // Agregar cada elemento de encabezado a la fila del encabezado
      filaEncabezado.appendChild(thIdPartido);
      filaEncabezado.appendChild(thPuntos);
      filaEncabezado.appendChild(thAsistencias);
      filaEncabezado.appendChild(threbotes);
      filaEncabezado.appendChild(thRobos);
      filaEncabezado.appendChild(thBloqueos);
      filaEncabezado.appendChild(thFaltas);
      filaEncabezado.appendChild(thMinutos);

      // Agregar la fila del encabezado al thead
      thead.appendChild(filaEncabezado);

      // Agregar el thead al principio de la tabla
      tabla.insertBefore(thead, tabla.firstChild);

      // Crear el elemento tbody
      let tbody = document.createElement("tbody");

      // Recorrer los datos de la respuesta
      for (let convocado of datos) {
        let fila = tabla.insertRow();
        let celdaidPartido = fila.insertCell(0);
        let celdaPuntos = fila.insertCell(1);
        let celdaAsistencias = fila.insertCell(2);
        let celdaRebotes = fila.insertCell(3);
        let celdaRobos = fila.insertCell(4);
        let celdabloqueos = fila.insertCell(5);
        let celdafaltas = fila.insertCell(6);
        let celdaMinutos = fila.insertCell(7);

        celdaidPartido.innerHTML = convocado.idPartido;
        celdaPuntos.innerHTML = convocado.puntos;
        celdaAsistencias.innerHTML = convocado.asistencias;
        celdaRebotes.innerHTML = convocado.rebotes;
        celdaRobos.innerHTML = convocado.robos;
        celdabloqueos.innerHTML = convocado.bloqueos;
        celdafaltas.innerHTML = convocado.faltas;
        celdaMinutos.innerHTML = convocado.minutos;
        
        tbody.appendChild(fila);
      }

      // Agregar el tbody a la tabla
      tabla.appendChild(tbody);
      tabla.parentNode.classList.add("table-responsive");
      // Crear el elemento de botón Volver
      let botonVolver = document.createElement("button");
      botonVolver.textContent = "Volver";
      botonVolver.classList.add("btn", "btn-secondary", "mx-2", "mb-2");
      botonVolver.addEventListener("click", () => {
        // Redireccionar a la página HTML deseada
        window.location.href = "jugadores.html";
      });

      // Agregar el botón Volver después de la tabla
      tabla.parentNode.appendChild(botonVolver);
    } else {
      alert("No se han recuperado registros de la base de datos");
    }
  } else {
    alert("Error al conectar con la API");
  }
}
document.querySelector("#login").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    login();
  });
  
  
  
  async function login() {
    try {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
  
      let response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        let data = await response.json();
        // Guardar el token en el almacenamiento local
        localStorage.setItem("token", data.token);
        console.log(data)
        // Redireccionar al index.html
       window.location.href = "index.html";
      } else {
        // Manejar el error de la solicitud aquí
        console.log("Error en la solicitud:", response.status);
      }
    } catch (error) {
      // Manejar errores de red u otros errores aquí
      console.error("Ha ocurrido un error en la solicitud:", error);
    }
  }
  
  document.querySelector("#register").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    register();
  });
  
  
  async function register() {
    try {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      const response = await fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        // Redireccionar al archivo "login.html" después del registro exitoso
        window.location.href = "login.html";
      } else {
        console.log("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Ha ocurrido un error en la solicitud:", error);
    }
  }
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
  

  document.addEventListener('DOMContentLoaded', obtenerPartidos);

document.addEventListener('DOMContentLoaded', obtenerPartidos);

async function obtenerPartidos() {
  let respuesta = await fetch('http://localhost:8081/partidos');
  if (respuesta.ok) {
    let datos = await respuesta.json();
    if (datos.length > 0) {
      let tabla = document.querySelector("#tablaPartidos");

      // Eliminamos las filas anteriores
      while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
      }

      // Crear el elemento thead y la fila del encabezado
      let thead = document.createElement("thead");
      let filaEncabezado = document.createElement("tr");

      // Crear los elementos de encabezado y agregarles el texto
      let thFecha = document.createElement("th");
      thFecha.textContent = "Fecha";
      let thEquipoL = document.createElement("th");
      thEquipoL.textContent = "Equipo Local";
      let thEquipoV = document.createElement("th");
      thEquipoV.textContent = "Equipo Visitante";
      let thGanador = document.createElement("th");
      thGanador.textContent = "Ganador";

      // Agregar cada elemento de encabezado a la fila del encabezado
      filaEncabezado.appendChild(thFecha);
      filaEncabezado.appendChild(thEquipoL);
      filaEncabezado.appendChild(thEquipoV);
      filaEncabezado.appendChild(thGanador);

      // Agregar la fila del encabezado al thead
      thead.appendChild(filaEncabezado);

      // Agregar el thead al principio de la tabla
      tabla.insertBefore(thead, tabla.firstChild);

      // Crear el elemento tbody
      let tbody = document.createElement("tbody");

      // Recorrer los datos de la respuesta
      for (let partido of datos) {
        let fila = tabla.insertRow();
        let celdaFecha = fila.insertCell(0);
        let celdaEquipoL = fila.insertCell(1);
        let celdaEquipoV = fila.insertCell(2);
        let celdaGanador = fila.insertCell(3);

        celdaFecha.innerHTML = partido.fecha;
        celdaEquipoL.innerHTML = partido.equipoLocaNombre;
        celdaEquipoV.innerHTML = partido.equipoVisitanteNombre;
        celdaGanador.innerHTML = partido.ganador;

        tbody.appendChild(fila);

        // Asignar el evento de clic a cada fila
        fila.addEventListener("click", () => {
          obtenerOtrosDatos(partido.idPartido);
          tabla.style.display = "none";
        });
      }

      // Agregar el tbody a la tabla
      tabla.appendChild(tbody);
      tabla.parentNode.classList.add("table-responsive");
    } else {
      alert("No se han recuperado registros de la base de datos");
    }
  } else {
    alert("Error al conectar con la API");
  }
}


async function obtenerOtrosDatos(idPartido) {
  try {
    let respuesta = await fetch(`http://localhost:8081/convocados/partido/${idPartido}`);
    if (respuesta.ok) {
      let datos = await respuesta.json();
      if (datos) {
        let tabla = document.querySelector("#tablaConvocados");

        // Eliminar filas anteriores
        while (tabla.firstChild) {
          tabla.removeChild(tabla.firstChild);
        }

        // Crear el elemento thead y la fila del encabezado
        let thead = document.createElement("thead");
        let filaEncabezado = document.createElement("tr");

        // Crear los elementos de encabezado y agregarles el texto
        let thNombreJugador = document.createElement("th");
        thNombreJugador.textContent = "Nombre Jugador";
        let thPuntos = document.createElement("th");
        thPuntos.textContent = "Puntos";
        let thAsistencias = document.createElement("th");
        thAsistencias.textContent = "Asistencias";
        let thRebotes = document.createElement("th");
        thRebotes.textContent = "Rebotes";
        let thRobos = document.createElement("th");
        thRobos.textContent = "Robos";
        let thBloqueos = document.createElement("th");
        thBloqueos.textContent = "Bloqueos";
        let thFaltas = document.createElement("th");
        thFaltas.textContent = "Faltas";
        let thMinutos = document.createElement("th");
        thMinutos.textContent = "Minutos";

        // Agregar cada elemento de encabezado a la fila del encabezado
        filaEncabezado.appendChild(thNombreJugador);
        filaEncabezado.appendChild(thPuntos);
        filaEncabezado.appendChild(thAsistencias);
        filaEncabezado.appendChild(thRebotes);
        filaEncabezado.appendChild(thRobos);
        filaEncabezado.appendChild(thBloqueos);
        filaEncabezado.appendChild(thFaltas);
        filaEncabezado.appendChild(thMinutos);

        // Agregar la fila del encabezado al thead
        thead.appendChild(filaEncabezado);

        // Agregar el thead al principio de la tabla
        tabla.insertBefore(thead, tabla.firstChild);

        // Crear el elemento tbody
        let tbody = document.createElement("tbody");

        // Recorrer los datos de la respuesta
        for (let convocado of datos) {
          let fila = tabla.insertRow();
          let celdaNombreJugador = fila.insertCell(0);
          let celdaPuntos = fila.insertCell(1);
          let celdaAsistencias = fila.insertCell(2);
          let celdaRebotes = fila.insertCell(3);
          let celdaRobos = fila.insertCell(4);
          let celdaBloqueos = fila.insertCell(5);
          let celdaFaltas = fila.insertCell(6);
          let celdaMinutos = fila.insertCell(7);

          celdaNombreJugador.textContent = convocado.nomJugador;
          celdaPuntos.textContent = convocado.puntos;
          celdaAsistencias.textContent = convocado.asistencias;
          celdaRebotes.textContent = convocado.rebotes;
          celdaRobos.textContent = convocado.robos;
          celdaBloqueos.textContent = convocado.bloqueos;
          celdaFaltas.textContent = convocado.faltas;
          celdaMinutos.textContent = convocado.minutos;

          tbody.appendChild(fila);
        }

        // Agregar el tbody a la tabla
        tabla.appendChild(tbody);
        tabla.parentNode.classList.add("table-responsive");
        // Crear el elemento de botón Volver
        let botonVolver = document.createElement("button");
        botonVolver.textContent = "Volver";
        botonVolver.classList.add("btn", "btn-secondary", "mx-2", "mb-2");
        botonVolver.addEventListener("click", () => {
          // Redireccionar a la página HTML deseada
          window.location.href = "partidos.html";
        });

        // Agregar el botón Volver después de la tabla
        tabla.parentNode.appendChild(botonVolver);

      } else {
        alert("No se han recuperado registros de la base de datos");
      }
    } else {
      alert("Error al conectar con la API");
    }
  } catch (error) {
    console.error(error);
    alert("Ha ocurrido un error en la solicitud");
  }
}

  
  
  
  
  
    