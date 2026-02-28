import { app } from "./firebase-config.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const auth = getAuth(app);

// Manejo del formulario de login
const form = document.getElementById('loginForm');
const errEl = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errEl.textContent = '';
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirigir al panel protegido
    window.location.href = 'estadistica.html';
  } catch (err) {
    console.error(err);
    
    // Mensajes de error personalizados
    let mensaje = 'Error al iniciar sesión';
    if (err.code === 'auth/user-not-found') {
      mensaje = 'Usuario no encontrado';
    } else if (err.code === 'auth/wrong-password') {
      mensaje = 'Contraseña incorrecta';
    } else if (err.code === 'auth/invalid-email') {
      mensaje = 'Correo electrónico inválido';
    }
    
    errEl.textContent = mensaje;
  }
});
