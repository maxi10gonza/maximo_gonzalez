import "./style.css";

// Obtener el formulario de inicio de sesión
const $form = document.getElementById("login-form");

// Añadir un evento de submit al formulario
$form.addEventListener("submit", async (e) => {
  // Evitar que el formulario recargue la página
  e.preventDefault();

  // Crear un objeto FormData con los datos del formulario
  const formData = new FormData($form);

  // Convertir el objeto FormData a un objeto plano
  const entries = Object.fromEntries(formData.entries());

  // Realizar una solicitud POST a la API de inicio de sesión
  const response = await fetch("http://localhost:4321/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entries),
  }).then((response) => {
    if (response.ok) {
      // Redirigir a una página después de un inicio de sesión exitoso
      window.location.pathname = "/dashboard"; // Cambia "/dashboard" por la ruta que necesites
    } else {
      return response.json().then((error) => {
        alert(error.message);
      });
    }
  });
});

