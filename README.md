# Proyecto Vrma3

Esta es la aplicación de administración de la Fábrica de Quesos. Contiene páginas HTML/JS que interactúan con Firebase (Auth + Realtime Database).

## Publicación en GitHub Pages

1. Crea un repositorio público y sube todo el contenido excepto los archivos de configuración privada.
2. Para mantener tus credenciales fuera del repositorio puedes usar un archivo de entorno `.env` o el módulo `firebase-config.js`.
   - El proyecto incluye un ejemplo `.env.example` con las variables necesarias. Copia ese archivo a `.env` y rellena tus valores reales. Este archivo **no se usa automáticamente en el navegador**; sirve como referencia para desarrolladores o para un sistema de construcción (Webpack, Vite, etc.).
   - En un entorno sin bundler puedes simplemente copiar/pegar esos valores en `firebase-config.js`. Ese archivo está incluido en `.gitignore` para que no se suba.
   - `.env` se añade automáticamente a `.gitignore` para que no lo subas.
   ```
   /firebase-config.js
   /.env
   ```
3. Llena `firebase-config.js` localmente con algo como:
   ```js
   import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

   const firebaseConfig = {
     apiKey: "<TU_API_KEY>",
     authDomain: "<TU_AUTH_DOMAIN>",
     projectId: "<TU_PROJECT_ID>",
     storageBucket: "<TU_BUCKET>",
     messagingSenderId: "<TU_SENDER_ID>",
     appId: "<TU_APP_ID>",
     databaseURL: "https://<TU_DB>.firebaseio.com"
   };

   export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
   ```
4. En la configuración del repositorio, activa **GitHub Pages** apuntando a la rama que contenga tu HTML (`main`, `docs/`, etc.).

## Seguridad

- Las credenciales de Firebase (apiKey, authDomain, etc.) no son sensibles; son necesarias para inicializar el SDK en el cliente y Firebase las considera públicas.
- La seguridad real viene de las reglas en Realtime Database y de la configuración de authentication. Asegúrate de tener reglas como:
  ```json
  {
    "rules": {
      "catalogo": {
        "$uid": {
          ".read":  "auth != null && auth.uid === $uid",
          ".write": "auth != null && auth.uid === $uid"
        }
      }
      // ... demás ramas ...
    }
  }
  ```
- No incluyas en el repo ningún token de administrador ni claves de servidor.

## Cómo clonar y ejecutar localmente

```bash
git clone https://github.com/<tu-usuario>/<tu-repo>.git
cd <tu-repo>
# duplica .env.example a .env y completa con tus credenciales
# (o crea firebase-config.js si prefieres el módulo)
# abre los archivos HTML en un navegador o usa un servidor estático
```

Las páginas se encargan de cargar los scripts y conectar con Firebase, por lo que no necesitas un backend. Si vas a desarrollar funciones de servidor, considera usar el Firebase CLI y Cloud Functions.
