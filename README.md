-- Delilah Resto V1.0 --

-- Repo Git: https://github.com/fdhammond/delilah_resto.git

( En caso de clonar el repo en vez de utilizar los archivos enviados en rar
se debera agregar el archivo .env, sino no funcionara )


/** INSTRUCCIONES **/

-- Pasos a seguir para la instalacion:


--- /** DATABASE **/ ---

- Instalar XAMMP

- Iniciar Apache y MySQL

- Abrir PHPmyAdmin

- Importar archivo delilah_resto.sql 


--- /** SERVER **/ ---

- Abrir archivos en vscode

- Abrir terminal:
    - Ingresar comando: npm install node

- Iniciar Server:
    - Ingresar comando: node server.js


--- /** POSTMAN **/ ---

- Descargar POSTMAN

- Importar collection: (delilah_resto.postman_collection) - Archivo adjunto


--/* LOGIN USUARIO */--

- REGISTRAR USUARIO:

---- SELECCIONAR REQUEST "REGISTER USER" ----

- SELECCIONAR METODO "POST":
    - Agregar direccion url: "localhost:3000/user/register"
    - Seleccionar "Body" luego "raw" y por ultimo "JSON":
        - Agregar estructura para registrar usuario:
            - JSON Structure: 
                - {
                    "name": "nombre",
                    "email": "nombre@mail.com",
                    "phone": 12345678,
                    "address": "User adress",
                    "password": "user12345678"                     
                  }

- LOGIN USUARIO:

---- SELECCIONAR REQUEST "LOGIN USER"

- SELECCIONAR METODO "POST":
    - Agregar direccion url: "http://localhost:3000/user/login"
    - Seleccionar "Body" luego "x-www-form-urlencoded"
        - Agregar "key" = email  //  "value" = user@mail.com (reemplazar por mail registrado)
        - Agregar "key" = password  //  "value" = password (reemplazar por password registrado)

- Una vez realizado el login se devolvera un token - COPIAR TOKEN RECIBIDO Y GUARDARLO -

