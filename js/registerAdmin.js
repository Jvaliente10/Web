document.querySelector("#registerAdmin").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    registerAdmin();
  });
  
  
  async function registerAdmin() {
    try {
      const username = document.getElementById("usernameAdmin").value;
      const password = document.getElementById("passwordAdmin").value;
  
      const response = await fetch("http://clubbaloncestobollullos.eu-west-1.elasticbeanstalk.com/auth/register/admin", {
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
        alert("No tienes los permisos necesarios");
      }
    } catch (error) {
      alert("Ha ocurrido un error en la solicitud:", error);
    }
  }
