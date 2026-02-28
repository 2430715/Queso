import { app } from "./firebase-config.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const auth = getAuth(app);
const db = getDatabase(app);

// Manejo del formulario
const form = document.getElementById('registerForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const factory_name = document.getElementById('factory_name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const street = document.getElementById('street').value.trim();
  const city = document.getElementById('city').value.trim();
  const postal = document.getElementById('postal').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm_password').value;

  if (password !== confirm) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guarda datos adicionales en Realtime Database
    await set(ref(db, 'admins/' + user.uid), {
      name,
      factory_name,
      phone,
      address: {
        street,
        city,
        postal
      },
      email,
      createdAt: new Date().toISOString()
    });

    alert('¡Cuenta creada exitosamente!');
    // Redirige a estadistica.html
    window.location.href = 'estadistica.html';
  } catch (err) {
    console.error(err);
    alert('Error: ' + err.message);
  }
});
