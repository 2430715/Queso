import { app } from "./firebase-config.js";
import { getAuth, onIdTokenChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// protect.js (módulo) - incluir como: <script type="module" src="./protect.js"></script>

const auth = getAuth(app);

// Redirige a login si no hay usuario autenticado o token expira
onIdTokenChanged(auth, (user) => {
  if (!user) {
    if (!location.pathname.endsWith('login.html')) {
      location.href = 'login.html';
    }
  }
});

// Función global para cerrar sesión
window.signOutUser = function() {
  signOut(auth)
    .then(() => {
      location.href = 'login.html';
    })
    .catch((err) => {
      console.error('Error cerrando sesión:', err);
      alert('Error al cerrar sesión. Intenta de nuevo.');
    });
};
