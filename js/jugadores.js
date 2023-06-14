document.addEventListener('DOMContentLoaded', obtenerJugadores);


//Función para obtener jugadores y datos dependiendo del tipo de usuario, si no está logueado manda a la página de login
async function obtenerJugadores() {
  const role = localStorage.getItem("user");

  if (role == "REGISTEDUSER") {

    const token = localStorage.getItem("token");

    let respuesta = await fetch('http://192.168.1.122:8081/jugadores', {
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
  } else if (role == "ADMIN") {

    const token = localStorage.getItem("token");

    let respuesta = await fetch('http://192.168.1.122:8081/jugadores', {
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
                      <button class="btn btn-primary btn-editar" data-id="${jugador.idJugador}">Editar</button>
                      <button class="btn btn-danger btn-eliminar" data-id="${jugador.idJugador}">Eliminar</button>
                  </div>
              </div>
              `;
          cardJugador.innerHTML = contenidoTarjeta;



          // Agregar la tarjeta al contenedor
          contenedor.appendChild(cardJugador);

          // Asignar el evento de clic al botón de edición
          let btnsEditar = document.querySelectorAll(".btn-editar");
          btnsEditar.forEach((btnEditar) => {
            btnEditar.addEventListener("click", editarJugador);
          });

          // Asignar el evento de clic al botón de eliminar
          let btnEliminar = cardJugador.querySelector(".btn-eliminar");
          btnEliminar.addEventListener("click", () => {
            // Evitar que el clic se propague al contenedor padre

            // Lógica para eliminar el jugador con el nombre "nombreJugador"
            eliminarJugador(jugador.idJugador);
          });


          // Asignar el evento de clic a la tarjeta
          cardJugador.addEventListener("click", () => {
            obtenerOtrosDatos(jugador.nomJugador);
            contenedor.style.display = "none";
          });

        }
        // Crear el botón "Añadir"
        let editarJugadoresDiv = document.getElementById("tarjetasJugadores");
        let btnAdd = document.createElement("button");
        btnAdd.id = "btnAdd";
        btnAdd.classList.add("btn", "btn-primary");
        btnAdd.textContent = "Añadir";
        btnAdd.addEventListener("click", () => {
          addJugador();
        });

        editarJugadoresDiv.appendChild(btnAdd);

      } else {
        alert("No se han recuperado registros de la base de datos");
      }
    } else {
      alert("Error al conectar con la API");
    }

  } else {
    window.location.href = "login.html";
  }
}

//Función para obtener los datos del convocado según el nombre del jugador pulsado
async function obtenerOtrosDatos(nombreJugador) {
  let respuesta = await fetch(`http://192.168.1.122:8081/convocados/${nombreJugador}`);
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
      // let thAcciones = document.createElement("th");
      // thAcciones.textContent = "Edición";

      // Agregar cada elemento de encabezado a la fila del encabezado
      filaEncabezado.appendChild(thIdPartido);
      filaEncabezado.appendChild(thPuntos);
      filaEncabezado.appendChild(thAsistencias);
      filaEncabezado.appendChild(threbotes);
      filaEncabezado.appendChild(thRobos);
      filaEncabezado.appendChild(thBloqueos);
      filaEncabezado.appendChild(thFaltas);
      filaEncabezado.appendChild(thMinutos);
      // filaEncabezado.appendChild(thAcciones);

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
        // let celdaAcciones = fila.insertCell(8); // Celda para los botones de acciones

        celdaidPartido.innerHTML = convocado.idPartido;
        celdaPuntos.innerHTML = convocado.puntos;
        celdaAsistencias.innerHTML = convocado.asistencias;
        celdaRebotes.innerHTML = convocado.rebotes;
        celdaRobos.innerHTML = convocado.robos;
        celdabloqueos.innerHTML = convocado.bloqueos;
        celdafaltas.innerHTML = convocado.faltas;
        celdaMinutos.innerHTML = convocado.minutos;

        // let botonBorrar = document.createElement("button");
        // botonBorrar.textContent = "Borrar";
        // botonBorrar.classList.add("btn", "btn-sm", "btn-danger");
        // botonBorrar.addEventListener("click", () => {
        //   eliminarConvocado(convocado.idPartido, convocado.nomJugador, convocado.idJugador);
        // });

        // // Agregar los botones a la celda de acciones
        // celdaAcciones.appendChild(botonEditar);
        // celdaAcciones.appendChild(botonBorrar);

        tbody.appendChild(fila);
      }

      // Agregar el tbody a la tabla
      tabla.appendChild(tbody);
      tabla.parentNode.classList.add("table-responsive");
      const role = localStorage.getItem("user");
      if (role == "ADMIN") {
        // Crear el botón "Añadir" dentro de la función
        let btnAddConvocado = document.createElement("button");
        btnAddConvocado.id = "btnAddConvocado";
        btnAddConvocado.classList.add("btn", "btn-primary", "btn-block", "mb-2");
        btnAddConvocado.style.width = "100%";
        btnAddConvocado.textContent = "Añadir";
        btnAddConvocado.addEventListener("click", () => {
          let tablaConvocados = document.getElementById("divTablaConvocados");
          tablaConvocados.style.display = "none";

          addConvocado();

        });

        // Agregar el botón al div
        let divBtnAdd = document.getElementById("divTablaConvocados");
        divBtnAdd.appendChild(btnAddConvocado);
      }
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

// Función para eliminar el jugador cuyo botón eliminar haya sido pulsado
async function eliminarJugador(id) {

  let token = localStorage.getItem("token");
  let respuesta = await fetch(`http://192.168.1.122:8081/jugadores/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (respuesta.ok) {
    // El jugador se eliminó correctamente
    alert("Jugador eliminado correctamente");
    // Realizar las acciones necesarias (por ejemplo, eliminar el elemento del DOM)
  } else {
    // Ocurrió un error al eliminar el jugador
    alert("Error al eliminar el jugador:", respuesta.status);
  }
}

//Funcion para editar el jugador cuyo botón editar haya sido pulsado
function editarJugador(event) {
  let contenedor = document.querySelector("#tarjetasJugadores");
  event.stopPropagation();
  let jugadorId = event.target.getAttribute("data-id");
  contenedor.style.display = "none";
  let editarJugadoresDiv = document.querySelector("#editarJugadores");
  let token = localStorage.getItem("token");
  fetch(`http://192.168.1.122:8081/jugadores/${jugadorId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else {
        throw new Error("Error al obtener los datos del jugador");
      }
    })
    .then((jugador) => {
      let formularioEditar = document.createElement("form");
      formularioEditar.classList.add("container", "my-4");
      let nombreFormGroup = document.createElement("div");
      nombreFormGroup.classList.add("form-group");
      let nombreLabel = document.createElement("label");
      nombreLabel.textContent = "Nombre";
      let nombreInput = document.createElement("input");
      nombreInput.type = "text";
      nombreInput.classList.add("form-control", "form-control-sm");
      nombreInput.id = "nombreInput";
      nombreInput.value = jugador.nomJugador;
      nombreFormGroup.appendChild(nombreLabel);
      nombreFormGroup.appendChild(nombreInput);
      let dorsalFormGroup = document.createElement("div");
      dorsalFormGroup.classList.add("form-group");
      let dorsalLabel = document.createElement("label");
      dorsalLabel.textContent = "Dorsal";
      let dorsalInput = document.createElement("input");
      dorsalInput.type = "text";
      dorsalInput.classList.add("form-control", "form-control-sm");
      dorsalInput.id = "dorsalInput";
      dorsalInput.value = jugador.dorsalJugador;
      dorsalFormGroup.appendChild(dorsalLabel);
      dorsalFormGroup.appendChild(dorsalInput);
      let posicionFormGroup = document.createElement("div");
      posicionFormGroup.classList.add("form-group");
      let posicionLabel = document.createElement("label");
      posicionLabel.textContent = "Posición";
      let posicionInput = document.createElement("input");
      posicionInput.type = "text";
      posicionInput.classList.add("form-control", "form-control-sm");
      posicionInput.id = "posicionInput";
      posicionInput.value = jugador.posicionJugador;
      posicionFormGroup.appendChild(posicionLabel);
      posicionFormGroup.appendChild(posicionInput);
      formularioEditar.appendChild(nombreFormGroup);
      formularioEditar.appendChild(dorsalFormGroup);
      formularioEditar.appendChild(posicionFormGroup);
      editarJugadoresDiv.innerHTML = "";
      editarJugadoresDiv.appendChild(formularioEditar);
      let botonAceptar = document.createElement("button");
      botonAceptar.type = "button";
      botonAceptar.classList.add("btn", "btn-primary", "me-2");
      botonAceptar.textContent = "Aceptar";
      botonAceptar.addEventListener("click", () => {
        guardarCambios(jugadorId);
      });
      let botonesDiv = document.createElement("div");
      botonesDiv.classList.add("mt-3");
      botonesDiv.appendChild(botonAceptar);
      formularioEditar.appendChild(botonesDiv);
    })
    .catch((error) => {
      alert(error.message);
      contenedor.style.display = "block";
    });
}

//Función para guardar los cambios de la edición
function guardarCambios(jugadorId) {
  let nombreInput = document.querySelector("#nombreInput").value;
  let dorsalInput = document.querySelector("#dorsalInput").value;
  let posicionInput = document.querySelector("#posicionInput").value;
  let token = localStorage.getItem("token");
  let datosJugador = {
    nomJugador: nombreInput,
    dorsalJugador: dorsalInput,
    posicionJugador: posicionInput,
  };
  fetch(`http://192.168.1.122:8081/jugadores/${jugadorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datosJugador),
  })
    .then((respuesta) => {
      if (respuesta.ok) {
        alert("Jugador actualizado exitosamente");
        window.location.href = "jugadores.html";

      } else {
        throw new Error("Error al actualizar el jugador");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}

//Función para abrir la interfaz de añadir jugador
function addJugador() {

  // Agregar el evento de clic al botón "Añadir"

  // Ocultar las tarjetas
  let contenedor = document.querySelector("#tarjetasJugadores");
  contenedor.style.display = "none";

  // Crear el formulario para dar de alta un jugador
  let formularioDiv = document.createElement("div");
  formularioDiv.classList.add("col-auto", "align-items-center");

  let formulario = document.createElement("form");
  formulario.innerHTML = `
      <div class="form-group row mt-2 mb-2">
        <label for="nombre" class="col-sm-2 col-form-label">Nombre:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="nombre" placeholder="Nombre del jugador">
        </div>
      </div>
      <div class="form-group row mt-2 mb-2">
        <label for="dorsal" class="col-sm-2 col-form-label">Dorsal:</label>
        <div class="col-sm-10">
          <input type="number" class="form-control" id="dorsal" placeholder="Dorsal del jugador">
        </div>
      </div>
      <div class="form-group row mt-2 mb-2">
        <label for="posicion" class="col-sm-2 col-form-label">Posición:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="posicion" placeholder="Posición del jugador">
        </div>
      </div>
      <div class="mt-2 mb-2">
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    `;

  // Agregar el formulario al div contenedor
  formularioDiv.appendChild(formulario);

  // Obtener el div contenedor de edición
  let editarJugadores = document.getElementById("editarJugadores");

  // Vaciar el contenido anterior si lo hay
  editarJugadores.innerHTML = "";

  // Agregar el formulario al contenedor de edición
  editarJugadores.appendChild(formularioDiv);

  // Evitar que se envíe el formulario automáticamente
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    guardarJugador();

  });

}

function guardarJugador() {
  // Obtener los valores de los campos del formulario
  let nombre = document.getElementById("nombre").value;
  let dorsal = document.getElementById("dorsal").value;
  let posicion = document.getElementById("posicion").value;

  // Crear el objeto jugador con los valores obtenidos
  let jugador = {
    nomJugador: nombre,
    dorsalJugador: dorsal,
    posicionJugador: posicion,
  };

  // Realizar la llamada POST al endpoint /jugadores con el objeto jugador en formato JSON
  let token = localStorage.getItem("token");
  fetch("http://192.168.1.122:8081/jugadores", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jugador)
  })
    .then((respuesta) => {
      if (respuesta.ok) {
        alert("Jugador Añadido exitosamente");
        location.href = "jugadores.html";
      } else {
        throw new Error("Error al añadir el jugador");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}
// //Función para eliminar el convocado según el jugador en el que pincho
// async function eliminarConvocado(idPartido, nomJugador, idJugador) {
//   try {
//     let token = localStorage.getItem("token");
//     let respuesta = await fetch(`http://localhost:8081/convocados/${idPartido}/${nomJugador}/${idJugador}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (respuesta.status === 200) {
//       // El jugador se eliminó correctamente
//       alert("Jugador eliminado correctamente");
//       // Realizar las acciones necesarias (por ejemplo, eliminar el elemento del DOM)
//     } else {
//       // Ocurrió un error al eliminar el jugador
//       alert("Error al eliminar el jugador: " + respuesta.status);
//     }
//   } catch (error) {
//     alert("Error al eliminar el jugador: " + error);
//   }
// }

function addConvocado() {
  // Obtener los elementos por su ID
  let convocadosTable = document.getElementById("tablaConvocados");
  let addForm = document.getElementById("addForm");

  // Ocultar la tabla de convocados
  convocadosTable.style.display = "none";

  // Mostrar el formulario de edición
  addForm.style.display = "block";

  // Crear el formulario de edición
  let formulario = document.createElement("form");
  formulario.setAttribute("id", "formularioEdicion");
  formulario.classList.add("needs-validation");

  // Campo: Id Partido
  let idPartidoInput = document.createElement("input");
  idPartidoInput.setAttribute("type", "number");
  idPartidoInput.setAttribute("placeholder", "Id Partido");
  idPartidoInput.setAttribute("id", "idPartidoInput");
  idPartidoInput.classList.add("form-control", "mb-3");
  formulario.appendChild(idPartidoInput);

  // Campo: Nombre Jugador
  let nomJugadorInput = document.createElement("input");
  nomJugadorInput.setAttribute("type", "text");
  nomJugadorInput.setAttribute("placeholder", "Nombre del Jugador");
  nomJugadorInput.setAttribute("id", "nomJugador");
  nomJugadorInput.classList.add("form-control", "mb-3");
  formulario.appendChild(nomJugadorInput);

  // Campo: Id Jugador
  let idJugadorInput = document.createElement("input");
  idJugadorInput.setAttribute("type", "number");
  idJugadorInput.setAttribute("placeholder", "Id Jugador");
  idJugadorInput.setAttribute("id", "idJugadorInput");
  idJugadorInput.classList.add("form-control", "mb-3");
  formulario.appendChild(idJugadorInput);


  // Campo: Puntos
  let puntosInput = document.createElement("input");
  puntosInput.setAttribute("type", "number");
  puntosInput.setAttribute("placeholder", "Puntos");
  puntosInput.setAttribute("id", "puntosInput");
  puntosInput.classList.add("form-control", "mb-3");
  formulario.appendChild(puntosInput);


  // Campo: Asistencias
  let asistenciasInput = document.createElement("input");
  asistenciasInput.setAttribute("type", "number");
  asistenciasInput.setAttribute("placeholder", "Asistencias");
  asistenciasInput.setAttribute("id", "asistenciasInput");
  asistenciasInput.classList.add("form-control", "mb-3");
  formulario.appendChild(asistenciasInput);

  // Campo: Rebotes
  let rebotesInput = document.createElement("input");
  rebotesInput.setAttribute("type", "number");
  rebotesInput.setAttribute("placeholder", "Rebotes");
  rebotesInput.setAttribute("id", "rebotesInput");
  rebotesInput.classList.add("form-control", "mb-3");
  formulario.appendChild(rebotesInput);

  // Campo: Robos
  let robosInput = document.createElement("input");
  robosInput.setAttribute("type", "number");
  robosInput.setAttribute("placeholder", "Robos");
  robosInput.setAttribute("id", "robosInput");
  robosInput.classList.add("form-control", "mb-3");
  formulario.appendChild(robosInput);

  // Campo: Bloqueos
  let bloqueosInput = document.createElement("input");
  bloqueosInput.setAttribute("type", "number");
  bloqueosInput.setAttribute("placeholder", "Bloqueos");
  bloqueosInput.setAttribute("id", "bloqueosInput");
  bloqueosInput.classList.add("form-control", "mb-3");
  formulario.appendChild(bloqueosInput);

  // Campo: Faltas
  let faltasInput = document.createElement("input");
  faltasInput.setAttribute("type", "number");
  faltasInput.setAttribute("placeholder", "Faltas");
  faltasInput.setAttribute("id", "faltasInput");
  faltasInput.classList.add("form-control", "mb-3");
  formulario.appendChild(faltasInput);

  // Campo: Minutos
  let minutosInput = document.createElement("input");
  minutosInput.setAttribute("type", "number");
  minutosInput.setAttribute("placeholder", "Minutos");
  minutosInput.setAttribute("id", "minutosInput");
  minutosInput.classList.add("form-control", "mb-3");
  formulario.appendChild(minutosInput);

  // Agregar el formulario al contenedor del formulario de edición
  addForm.appendChild(formulario);

  // Crear el botón de guardar cambios
  let guardarCambiosButton = document.createElement("button");
  guardarCambiosButton.textContent = "Guardar Cambios";
  guardarCambiosButton.classList.add("btn", "btn-primary", "mb-3");
  guardarCambiosButton.addEventListener("click", function () {


    // Llamar a la función para actualizar el convocado
    guardarConvocado();

    // Mostrar la tabla de convocados y ocultar el formulario de edición
    convocadosTable.style.display = "block";
    addForm.style.display = "none";
  });

  // Agregar el botón de guardar cambios al formulario
  formulario.appendChild(guardarCambiosButton);
}

function guardarConvocado() {
  let puntos = document.getElementById("puntosInput").value;
  let asistencias = document.getElementById("asistenciasInput").value;
  let rebotes = document.getElementById("rebotesInput").value;
  let robos = document.getElementById("robosInput").value;
  let bloqueos = document.getElementById("bloqueosInput").value;
  let faltas = document.getElementById("faltasInput").value;
  let minutos = document.getElementById("minutosInput").value;
  let idPartido = document.getElementById("idPartidoInput").value;
  let idJugador = document.getElementById("idJugadorInput").value;
  let nombreJugador = document.getElementById("nomJugador").value;


  // Crear un objeto con los datos del convocado
  let convocado = {
    idPartido: idPartido,
    nomJugador: nombreJugador,
    idJugador: idJugador,
    puntos: puntos,
    asistencias: asistencias,
    rebotes: rebotes,
    robos: robos,
    bloqueos: bloqueos,
    faltas: faltas,
    minutos: minutos
  };
  let token = localStorage.getItem("token");
  // Realizar la llamada a la API con el método PÔST
  fetch(`http://192.168.1.122:8081/convocados/add`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(convocado),
  })
    .then(response => response.json())
    .then(updatedConvocado => {
      // Manejar la respuesta de la API
      alert("Convocado guardado:", updatedConvocado);
      // Aquí puedes realizar las acciones necesarias después de actualizar el convocado
    })
    .catch(error => {
      // Manejar errores en la llamada a la API
      alert("Error al guardar el convocado:", error);
    });
}





















