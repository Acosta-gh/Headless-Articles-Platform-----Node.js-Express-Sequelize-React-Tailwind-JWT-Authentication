# Headless Articles Website

**Versión 1.0.0**


### 1. 🇪🇸 Readme versión en Español

---

Este es un sitio web de artículos con arquitectura headless. Permite crear y administrar artículos en Markdown, subir imágenes, gestionar usuarios y mucho más. Es ideal como base para un blog moderno o una plataforma de contenido editorial.

---

## Características principales

- **Editor Markdown con imágenes:** Crea artículos fácilmente, sube imágenes y edítalos en cualquier momento.
- **Gestión de usuarios:** Panel de administración dividido para manejar artículos y usuarios.
- **Verificación por email:** Los usuarios deben verificar su email para completar el registro.
- **Newsletter:** Los lectores pueden suscribirse para recibir novedades.
- **Likes y comentarios:** Los artículos pueden recibir likes y comentarios.
- **Respuestas y likes en comentarios:** Los comentarios pueden recibir respuestas, y tanto los comentarios como las respuestas pueden recibir likes.
- **Limpieza automática de imágenes huérfanas:** Cada mes se eliminan imágenes subidas al editor que nunca se asociaron a un artículo publicado.
- **Búsqueda y ordenamiento:** Busca artículos y ordénalos por recientes o populares.
- **Animaciones y buen diseño:** Interfaz moderna, fluida y fácil de usar.
- **Funcionalidades esenciales:** Todo lo que esperás de un sitio de artículos: destacados, migraciones, gestión de imágenes, etc.

---

## Instalación rápida

1. **Instala las dependencias del cliente y el servidor:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

2. **Configura las variables de entorno:**  
   Copia el archivo `.env.example` y renómbralo como `.env` en ambos (client y server). Ajusta los valores según tu entorno.

3. **Ejecuta las migraciones de Sequelize:**
   ```bash
   cd server
   npx sequelize db:migrate
   ```

4. **Levanta el cliente:**
   ```bash
   cd client
   npm run dev
   ```

5. **Levanta el servidor:**
   ```bash
   cd server
   node server.js  # O usa nodemon si lo preferís
   ```

---

# Licencias y créditos del proyecto

Este proyecto utiliza diversas herramientas, librerías y recursos, cada uno con su respectiva licencia. Además, en algunos archivos se utilizaron modelos de lenguaje (LLM) de manera parcial o total, lo cual está claramente indicado en dichos archivos.

---

## Librerías y frameworks utilizados

| Herramienta                                   | Licencia  |
|-----------------------------------------------|-----------|
| [Tailwind CSS](https://tailwindcss.com/)      | MIT       |
| [shadcn/ui](https://ui.shadcn.com/)           | MIT       |
| [shadcn blocks](https://www.shadcnblocks.com/)| MIT       |
| [React](https://react.dev/)                   | MIT       |
| [react-awesome-reveal](https://github.com/dennismorello/react-awesome-reveal) | MIT |
| [node-cron](https://www.npmjs.com/package/node-cron) | ISC  |
| [Sequelize](https://sequelize.org/)           | MIT       |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | MIT |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | MIT |
| [axios](https://github.com/axios/axios)       | MIT       |
| [Express](https://expressjs.com/)             | MIT       |

---

## Créditos de imágenes

- Imagen de [Raphael Silva](https://pixabay.com/es/users/raphaelsilva-4702998/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2160320) en [Pixabay](https://pixabay.com/es//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2160320).

---

## Uso de LLM

En algunos archivos del repositorio se utilizó un modelo de lenguaje (LLM) para la generación parcial o total del código.  
Estos archivos están **claramente identificados** con un bloque al inicio como el siguiente:

```js
/*
* ========================================================================================
* ⚠️ This file's code was generated partially or completely by a Large Language Model (LLM).
* ========================================================================================
*/
```

Revisa dichos archivos para más detalles sobre el alcance del uso de LLM en cada caso.

---

## Notas adicionales

- Todos los recursos y librerías de terceros respetan sus respectivas licencias.
- Si utilizas este proyecto, asegúrate de respetar la licencia de cada dependencia.
---


### 2. 🇬🇧 English Readme

---

This is a headless articles website. It allows you to create and manage articles in Markdown, upload images, manage users, and much more. It's ideal as a base for a modern blog or an editorial content platform.

---

## Main Features

- **Markdown editor with images:** Easily create articles, upload images, and edit them at any time.
- **User management:** Admin panel split to manage articles and users.
- **Email verification:** Users must verify their email to complete the registration.
- **Newsletter:** Readers can subscribe to receive updates.
- **Likes and comments:** Articles can receive likes and comments.
- **Replies and likes on comments:** Comments can receive replies, and both comments and replies can receive likes.
- **Automatic orphan image cleanup:** Every month, images uploaded in the editor that were never associated with a published article are deleted.
- **Search and sorting:** Search for articles and sort by recent or popular.
- **Animations and clean design:** Modern, smooth, and user-friendly interface.
- **Essential features:** Everything you expect from an articles site: featured posts, migrations, image management, and more.

---

## Quick Setup

1. **Install client and server dependencies:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

2. **Set up environment variables:**  
   Copy the `.env.example` file and rename it to `.env` in both the client and server directories. Set the values according to your environment.

3. **Run Sequelize migrations:**
   ```bash
   cd server
   npx sequelize db:migrate
   ```

4. **Start the client:**
   ```bash
   cd client
   npm run dev
   ```

5. **Start the server:**
   ```bash
   cd server
   node server.js  # Or use nodemon if you prefer
   ```

---

# Project Licenses & Credits

This project uses several tools, libraries, and resources, each with its respective license. Some files were partially or fully generated using a Large Language Model (LLM), which is clearly indicated in those files.

---

## Libraries and Frameworks Used

| Tool                                         | License   |
|-----------------------------------------------|-----------|
| [Tailwind CSS](https://tailwindcss.com/)      | MIT       |
| [shadcn/ui](https://ui.shadcn.com/)           | MIT       |
| [shadcn blocks](https://www.shadcnblocks.com/)| MIT       |
| [React](https://react.dev/)                   | MIT       |
| [react-awesome-reveal](https://github.com/dennismorello/react-awesome-reveal) | MIT |
| [node-cron](https://www.npmjs.com/package/node-cron) | ISC  |
| [Sequelize](https://sequelize.org/)           | MIT       |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | MIT |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | MIT |
| [axios](https://github.com/axios/axios)       | MIT       |
| [Express](https://expressjs.com/)             | MIT       |

---

## Image Credits

- Image by [Raphael Silva](https://pixabay.com/users/raphaelsilva-4702998/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2160320) on [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2160320).

---

## LLM Usage

Some files in the repository were partially or fully generated using a Large Language Model (LLM).  
These files are **clearly marked** with a block at the top like the following:

```js
/*
* ========================================================================================
* ⚠️ This file's code was generated partially or completely by a Large Language Model (LLM).
* ========================================================================================
*/
```

Check these files for more details on the extent of LLM usage in each case.

---

## Additional Notes

- All third-party resources and libraries respect their respective licenses.
- If you use this project, please ensure you comply with the license of each dependency.
---