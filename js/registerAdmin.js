document.querySelector("#registerAdmin").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    registerAdmin();
  });
  
  
  async function registerAdmin() {
    try {
      const username = document.getElementById("usernameAdmin").value;
      const password = document.getElementById("passwordAdmin").value;
  
      const response = await fetch("http://192.168.1.122:8081/auth/register/admin", {
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
