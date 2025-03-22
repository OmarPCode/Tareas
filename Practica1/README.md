# **API de Publicaciones**

Este proyecto es una API desarrollada con Node.js, Express, MongoDB y TypeScript. Permite la gestión de usuarios, autenticación y la creación de publicaciones.

---

## **Requisitos**
- Node.js 
- MongoDB 
- TypeScript 

---

## **Instalación**
---

1. Clona el repositorio: git clone https://github.com/OmarPCode/Tareas.git
2.	Navega al directorio del proyecto:
cd Practica1
3.	Instala las dependencias:
npm install
---


## **Endpoints**
Autenticación
•	Registro de usuario: POST /api/users/registro
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
•	Inicio de sesión: POST /api/users/login
{
  "email": "juan@example.com",
  "password": "password123"
}
•	Perfil del usuario: GET /api/users/perfil
o	Requiere autenticación (header x-auth-token).
Administración de Usuarios (Solo Admin)
•	Crear usuario: POST /api/users/usuarios
•	Listar usuarios: GET /api/users/usuarios
•	Obtener usuario por ID: GET /api/users/usuarios/:id
•	Actualizar usuario: PUT /api/users/usuarios/:id
•	Eliminar usuario: DELETE /api/users/usuarios/:id
Publicaciones
•	Crear publicación: POST /api/publicaciones
{
  "titulo": "Mi primera publicación",
  "contenido": "Este es el contenido del post."
}
•	Listar publicaciones: GET /api/publicaciones
---
## **Ejecución**
Modo Desarrollo
1.	Ejecuta el servidor en modo desarrollo:
npm run dev
2.	El servidor estará disponible en: http://localhost:8000.
Modo Producción
1.	Compila el proyecto:

npm run build
2.	Ejecuta el servidor:
npm run dev
---

---

## **Tecnologías Utilizadas**
•	Node.js: Entorno de ejecución de JavaScript.
•	Express: Framework para construir APIs.
•	MongoDB: Base de datos NoSQL.
•	Mongoose: ODM para MongoDB.
•	TypeScript: Superset de JavaScript con tipado estático.
•	JWT: Autenticación basada en tokens.
•	Bcrypt: Encriptación de contraseñas.
---
