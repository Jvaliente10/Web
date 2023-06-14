document.querySelector("#loginUser").addEventListener("click", function (event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto
  login();
});

async function login() {
  try {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let response = await fetch("http://clubbaloncestobollullos.eu-west-1.elasticbeanstalk.com/auth/login", {
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
      localStorage.setItem("user" , data.role);
      
      console.log(data)
      // Redireccionar al index.html
       window.location.href = "index.html";
    } else {
      // Manejar el error de la solicitud aquí
      console.log("Error en la solicitud:", response.status);
    }
  } catch (error) {
    console.error("Ha ocurrido un error en la solicitud:", error);
  }
}











