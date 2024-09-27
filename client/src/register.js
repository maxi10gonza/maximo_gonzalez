// ! REALIZAR LA LÓGICA DE REGISTRO DE USUARIOS AQUÍ
import "./style.css";

// Obtener el formulario de registro
const $form = document.getElementById("register-form");

// Añadir un evento de submit al formulario
$form.addEventListener("submit", async (e) => {
  // Evitar que el formulario recargue la página
  e.preventDefault();

  // Crear un objeto FormData con los datos del formulario
  const formData = new FormData($form);

  // Convertir el objeto FormData a un objeto plano
  const entries = Object.fromEntries(formData.entries());

  // Realizar una solicitud POST a la API de registro
  fetch("http://localhost:4321/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entries),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((error) => {
          alert(error.message);
        });
      }
    })
    .then((data) => {
      if (data) {
        alert("Registro exitoso");
        window.location.href = "/pages/login.html"; // Redirigir al login
      }
    })
    .catch((error) => console.error("Error:", error));
});



