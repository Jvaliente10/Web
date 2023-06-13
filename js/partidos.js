document.addEventListener('DOMContentLoaded', obtenerPartidos);


async function obtenerPartidos() {
  const role = localStorage.getItem("user");

  if (role == "ADMIN") {
    let token = localStorage.getItem("token");
    let respuesta = await fetch('https://clubbaloncestobollullos.eu-west-1.elasticbeanstalk.com/partidos',
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
        let thAcciones = document.createElement("th");
        thAcciones.textContent = "Edición";


        // Agregar cada elemento de encabezado a la fila del encabezado
        filaEncabezado.appendChild(thFecha);
        filaEncabezado.appendChild(thEquipoL);
        filaEncabezado.appendChild(thEquipoV);
        filaEncabezado.appendChild(thGanador);
        filaEncabezado.appendChild(thAcciones);

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
          let celdaAcciones = fila.insertCell(4); // Celda para los botones de acciones

          celdaFecha.innerHTML = partido.fecha;
          celdaEquipoL.innerHTML = partido.nomEquipoLocal;
          celdaEquipoV.innerHTML = partido.nomEquipoVisitante;
          celdaGanador.innerHTML = partido.ganador;

          // // Crear los botones de editar y borrar
          let botonEditar = document.createElement("button");
          botonEditar.textContent = "Editar";
          botonEditar.classList.add("btn", "btn-sm", "btn-primary", "mr-1");
          botonEditar.addEventListener("click", () => {
            crearFormularioEdicionPartido(partido.idPartido);

          });

          let botonBorrar = document.createElement("button");
          botonBorrar.textContent = "Borrar";
          botonBorrar.classList.add("btn", "btn-sm", "btn-danger");
          botonBorrar.addEventListener("click", () => {
            eliminarPartido(partido.idPartido);
          });

          // Agregar los botones a la celda de acciones
          celdaAcciones.appendChild(botonEditar);
          celdaAcciones.appendChild(botonBorrar);

          tbody.appendChild(fila);

          // Agregar el evento click a la celda de fecha
          celdaFecha.addEventListener("click", () => {
            obtenerOtrosDatos(partido.idPartido);
            tabla.style.display = "none";
          });

        }

        // Agregar el tbody a la tabla
        tabla.appendChild(tbody);
        tabla.parentNode.classList.add("table-responsive");

        // Crear el botón "Añadir" dentro de la función
        let btnAddPartido = document.createElement("button");
        btnAddPartido.id = "btnAddPartido";
        btnAddPartido.classList.add("btn", "btn-primary", "btn-block");
        btnAddPartido.style.width = "100%";
        btnAddPartido.textContent = "Añadir";
        btnAddPartido.addEventListener("click", () => {
          let tablaPartidos = document.getElementById("tablaPartidosDiv");
          tablaPartidos.style.display = "none";

          addPartido();

        });

        // Agregar el botón al div
        let divBtnAdd = document.getElementById("tablaPartidosDiv");
        divBtnAdd.appendChild(btnAddPartido);

      } else {
        alert("No se han recuperado registros de la base de datos");
      }
    } else {
      alert("Error al conectar con la API");
    }
  } else {
    let token = localStorage.getItem("token");
    let respuesta = await fetch('http://localhost:8081/partidos',
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
          celdaEquipoL.innerHTML = partido.nomEquipoLocal;
          celdaEquipoV.innerHTML = partido.nomEquipoVisitante;
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
}


async function obtenerOtrosDatos(idPartido) {
  try {
    let token = localStorage.getItem("token");
    let respuesta = await fetch(`http://localhost:8081/convocados/partido/${idPartido}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    if (respuesta.ok) {
      let datos = await respuesta.json();
      if (datos) {
        let tabla = document.querySelector("#tablaConvocados");

        // Eliminar filas anteriores
        let tablaPartidos = document.getElementById("tablaPartidosDiv");
        tablaPartidos.style.display = "none";

        // Crear el elemento thead y la fila del encabezado
        let thead = document.createElement("thead");
        let filaEncabezado = document.createElement("tr");

        // Crear los elementos de encabezado y agregarles el texto
        let thNombreJugador = document.createElement("th");
        thNombreJugador.textContent = "Nombre jugador";
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

// Función para eliminar el partido cuyo botón eliminar haya sido pulsado
async function eliminarPartido(id) {

  let token = localStorage.getItem("token");
  let respuesta = await fetch(`http://localhost:8081/partidos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (respuesta.ok) {
    // El partido se eliminó correctamente
    alert("Partido eliminado correctamente");
    location.href = "partidos.html";
    // Realizar las acciones necesarias (por ejemplo, eliminar el elemento del DOM)
  } else {
    // Ocurrió un error al eliminar el partido
    alert("Error al eliminar el Partido:", respuesta.status);
  }
}

function crearFormularioEdicionPartido(idPartido) {
  // Ocultar la tabla de partidos
  let tablaPartidos = document.getElementById("tablaPartidosDiv");
  tablaPartidos.style.display = "none";

  // Mostrar el formulario de edición
  let editarPartidosDiv = document.getElementById("editarPartidos");
  editarPartidosDiv.style.display = "block";

  // Realizar la llamada al backend para obtener los datos del partido
  let token = localStorage.getItem("token");
  let url = `http://localhost:8081/partidos/${idPartido}`;

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
    .then((partido) => {
      // Crear el formulario de edición
      let formulario = document.createElement("form");
      formulario.classList.add("needs-validation");

      // Campo: Fecha
      let fechaFormGroup = document.createElement("div");
      fechaFormGroup.classList.add("form-group", "row", "mt-2", "mb-2");

      let fechaLabel = document.createElement("label");
      fechaLabel.textContent = "Fecha";
      fechaLabel.classList.add("col-sm-2", "col-form-label");
      fechaFormGroup.appendChild(fechaLabel);

      let fechaInputContainer = document.createElement("div");
      fechaInputContainer.classList.add("col-sm-10");

      let fechaInput = document.createElement("input");
      fechaInput.setAttribute("type", "date");
      fechaInput.setAttribute("placeholder", "Fecha");
      fechaInput.classList.add("form-control");
      fechaInput.id = "fechaInput";
      fechaInput.value = partido.fecha; // Establecer el valor del partido
      fechaInputContainer.appendChild(fechaInput);

      fechaFormGroup.appendChild(fechaInputContainer);

      formulario.appendChild(fechaFormGroup);

      // Campo: Local
      let eLocalFormGroup = document.createElement("div");
      eLocalFormGroup.classList.add("form-group", "row", "mt-2", "mb-2");

      let eLocalLabel = document.createElement("label");
      eLocalLabel.textContent = "Equipo Local";
      eLocalLabel.classList.add("col-sm-2", "col-form-label");
      eLocalFormGroup.appendChild(eLocalLabel);

      let eLocalInputContainer = document.createElement("div");
      eLocalInputContainer.classList.add("col-sm-10");

      let eLocalInput = document.createElement("input");
      eLocalInput.setAttribute("type", "text");
      eLocalInput.setAttribute("placeholder", "Equipo Local");
      eLocalInput.classList.add("form-control");
      eLocalInput.id = "eLocalInput";
      eLocalInput.value = partido.nomEquipoLocal; // Establecer el valor del partido
      eLocalInputContainer.appendChild(eLocalInput);

      eLocalFormGroup.appendChild(eLocalInputContainer);

      formulario.appendChild(eLocalFormGroup);

      // Campo: Visitante
      let eVisitanteFormGroup = document.createElement("div");
      eVisitanteFormGroup.classList.add("form-group", "row", "mt-2", "mb-2");

      let eVisitanteLabel = document.createElement("label");
      eVisitanteLabel.textContent = "Equipo Visitante";
      eVisitanteLabel.classList.add("col-sm-2", "col-form-label");
      eVisitanteFormGroup.appendChild(eVisitanteLabel);

      let eVisitanteInputContainer = document.createElement("div");
      eVisitanteInputContainer.classList.add("col-sm-10");

      let eVisitanteInput = document.createElement("input");
      eVisitanteInput.setAttribute("type", "text");
      eVisitanteInput.setAttribute("placeholder", "EquipoVisitante");
      eVisitanteInput.classList.add("form-control");
      eVisitanteInput.id = "eVisitanteInput";
      eVisitanteInput.value = partido.nomEquipoVisitante; // Establecer el valor del partido
      eVisitanteInputContainer.appendChild(eVisitanteInput);

      eVisitanteFormGroup.appendChild(eVisitanteInputContainer);

      formulario.appendChild(eVisitanteFormGroup);

      // Campo: Ganador
      let ganadorFormGroup = document.createElement("div");
      ganadorFormGroup.classList.add("form-group", "row", "mt-2", "mb-2");

      let ganadorLabel = document.createElement("label");
      ganadorLabel.textContent = "Ganador";
      ganadorLabel.classList.add("col-sm-2", "col-form-label");
      ganadorFormGroup.appendChild(ganadorLabel);

      let ganadorInputContainer = document.createElement("div");
      ganadorInputContainer.classList.add("col-sm-10");

      let ganadorInput = document.createElement("input");
      ganadorInput.setAttribute("type", "text");
      ganadorInput.setAttribute("placeholder", "Ganador");
      ganadorInput.classList.add("form-control");
      ganadorInput.id = "ganadorInput";
      ganadorInput.value = partido.ganador; // Establecer el valor del partido
      ganadorInputContainer.appendChild(ganadorInput);

      ganadorFormGroup.appendChild(ganadorInputContainer);

      formulario.appendChild(ganadorFormGroup);

      // Agregar el formulario al contenedor de edición de partidos
      editarPartidosDiv.appendChild(formulario);

      // Crear el botón de guardar cambios
      let guardarCambiosButton = document.createElement("button");
      guardarCambiosButton.textContent = "Guardar Cambios";
      guardarCambiosButton.classList.add("btn", "btn-primary", "mb-3");
      guardarCambiosButton.addEventListener("click", function () {

        // Realizar las acciones para guardar los cambios en el backend
        guardarCambiosPartido(partido.idPartido);

        // Mostrar la tabla de partidos y ocultar el formulario de edición
        tablaPartidos.style.display = "block";
        editarPartidosDiv.style.display = "none";
      });

      // Agregar el botón de guardar cambios al formulario
      formulario.appendChild(guardarCambiosButton);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function guardarCambiosPartido(idPartido) {
  let fecha = document.getElementById("fechaInput").value;
  let ganador = document.getElementById("ganadorInput").value;
  let equipoLocal = document.getElementById("eLocalInput").value;
  let equipoVisitante = document.getElementById("eVisitanteInput").value;

  let nuevoPartido = {
    fecha: fecha,
    ganador: ganador,
    nomEquipoVisitante: equipoVisitante,
    nomEquipoLocal: equipoLocal
  };

  let token = localStorage.getItem("token");
  let url = `http://localhost:8081/partidos/${idPartido}`;

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoPartido),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error al guardar los cambios del partido");
      }
    })
    .then((modifiedPartido) => {
      console.log("Cambios guardados:", modifiedPartido);
      location.href = "partidos.html";
    })
    .catch(() => {
      alert("Cambios guardados correctamente");
      location.href = "partidos.html";
    });
}


function addPartido() {
  let addPartidosDiv = document.getElementById("addPartidos");
  let formulario = document.createElement("form");
  formulario.classList.add("needs-validation");

  // Campo: Fecha
  let fechaFormGroup = document.createElement("div");
  fechaFormGroup.classList.add("form-group", "row", "mt-2", "mb-2");

  let fechaLabel = document.createElement("label");
  fechaLabel.textContent = "Fecha";
  fechaLabel.classList.add("col-sm-2", "col-form-label");
  fechaFormGroup.appendChild(fechaLabel);

  let fechaInputContainer = document.createElement("div");
  fechaInputContainer.classList.add("col-sm-10");

  let fechaInput = document.createElement("input");
  fechaInput.setAttribute("type", "date");
  fechaInput.setAttribute("placeholder", "Fecha");
  fechaInput.classList.add("form-control");
  fechaInput.id = "fechaInput";
  fechaInputContainer.appendChild(fechaInput);

  fechaFormGroup.appendChild(fechaInputContainer);

  formulario.appendChild(fechaFormGroup);

  // Campo: Local
  let eLocalFormGroup = document.createElement("div");
  eLocalFormGroup.classList.add("form-group", "row", "mt-2", "mb-2");

  let eLocalLabel = document.createElement("label");
  eLocalLabel.textContent = "Equipo Local";
  eLocalLabel.classList.add("col-sm-2", "col-form-label");
  eLocalFormGroup.appendChild(eLocalLabel);

  let eLocalInputContainer = document.createElement("div");
  eLocalInputContainer.classList.add("col-sm-10");

  let eLocalInput = document.createElement("input");
  eLocalInput.setAttribute("type", "text");
  eLocalInput.setAttribute("placeholder", "Equipo Local");
  eLocalInput.classList.add("form-control");
  eLocalInput.id = "eLocalInput";
  eLocalInputContainer.appendChild(eLocalInput);

  eLocalFormGroup.appendChild(eLocalInputContainer);

  formulario.appendChild(eLocalFormGroup);

  // Campo: Visitante
  let eVisitanteFormGroup = document.createElement("div");
  eVisitanteFormGroup.classList.add("form-group", "row", "mt-2", "mb-2");

  let eVisitanteLabel = document.createElement("label");
  eVisitanteLabel.textContent = "Equipo Visitante";
  eVisitanteLabel.classList.add("col-sm-2", "col-form-label");
  eVisitanteFormGroup.appendChild(eVisitanteLabel);

  let eVisitanteInputContainer = document.createElement("div");
  eVisitanteInputContainer.classList.add("col-sm-10");

  let eVisitanteInput = document.createElement("input");
  eVisitanteInput.setAttribute("type", "text");
  eVisitanteInput.setAttribute("placeholder", "EquipoVisitante");
  eVisitanteInput.classList.add("form-control");
  eVisitanteInput.id = "eVisitanteInput";
  eVisitanteInputContainer.appendChild(eVisitanteInput);

  eVisitanteFormGroup.appendChild(eVisitanteInputContainer);

  formulario.appendChild(eVisitanteFormGroup);

  // Campo: Ganador
  let ganadorFormGroup = document.createElement("div");
  ganadorFormGroup.classList.add("form-group", "row", "mt-2", "mb-2");

  let ganadorLabel = document.createElement("label");
  ganadorLabel.textContent = "Ganador";
  ganadorLabel.classList.add("col-sm-2", "col-form-label");
  ganadorFormGroup.appendChild(ganadorLabel);

  let ganadorInputContainer = document.createElement("div");
  ganadorInputContainer.classList.add("col-sm-10");

  let ganadorInput = document.createElement("input");
  ganadorInput.setAttribute("type", "text");
  ganadorInput.setAttribute("placeholder", "Ganador");
  ganadorInput.classList.add("form-control");
  ganadorInput.id = "ganadorInput";
  ganadorInputContainer.appendChild(ganadorInput);

  ganadorFormGroup.appendChild(ganadorInputContainer);

  formulario.appendChild(ganadorFormGroup);

  // Agregar el formulario al contenedor de edición de partidos
  addPartidosDiv.appendChild(formulario);

  // Crear el botón de guardar cambios
  let guardarCambiosButton = document.createElement("button");
  guardarCambiosButton.textContent = "Guardar partido";
  guardarCambiosButton.classList.add("btn", "btn-primary", "mb-3");
  guardarCambiosButton.addEventListener("click", function () {

    // Realizar las acciones para guardar los cambios en el backend
    guardarPartido();

    let tablaPartidos = document.getElementById("tablaPartidosDiv");
    tablaPartidos.style.display = "none";
  });

  // Agregar el botón de guardar cambios al formulario
  formulario.appendChild(guardarCambiosButton);
}


function guardarPartido() {
  // Obtener los valores del formulario
  const fecha = document.getElementById("fechaInput").value;
  const equipoLocal = document.getElementById("eLocalInput").value;
  const equipoVisitante = document.getElementById("eVisitanteInput").value;
  const ganador = document.getElementById("ganadorInput").value;

  // Crear el objeto partido con los datos del formulario
  const partido = {
    fecha: fecha,
    ganador: ganador,
    nomEquipoLocal: equipoLocal,
    nomEquipoVisitante: equipoVisitante,
    convocados: []

  };

  // Realizar la llamada a la API para agregar el partido
  const token = localStorage.getItem('token');
  fetch('https://clubbaloncestobollullos.eu-west-1.elasticbeanstalk.com/partidos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Agregar el token desde el localStorage
    },
    body: JSON.stringify(partido)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al agregar el partido');
      }
    })
    .then(data => {
      console.log('Partido agregado:', data);
      // Realizar las acciones adicionales necesarias después de agregar el partido
    })
    .catch(() => {
      alert("Partido guardado correctamente");
      location.href = "partidos.html";
    });
}



