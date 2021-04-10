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



------------------------ SECCION USUARIO ------------------------


--/* USUARIO */--

//////////////////////////////////////////////////////////////////////////////////////////////////

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
    
    - CLICK "BOTON" SEND                  

//////////////////////////////////////////////////////////////////////////////////////////////////

- LOGIN USUARIO:

---- SELECCIONAR REQUEST "LOGIN USER"

- SELECCIONAR METODO "POST":
    - Agregar direccion url: "http://localhost:3000/user/login"
    - Seleccionar "Body" luego "x-www-form-urlencoded"
        - Agregar "key" = email  //  "value" = user@mail.com (reemplazar por mail registrado)
        - Agregar "key" = password  //  "value" = password (reemplazar por password registrado)
    
    - CLICK "BOTON" SEND

- Una vez realizado el login se devolvera un token - COPIAR TOKEN RECIBIDO Y GUARDARLO -

//////////////////////////////////////////////////////////////////////////////////////////////////


--/* ORDEN */--

//////////////////////////////////////////////////////////////////////////////////////////////////

- NUEVA ORDEN

---- SELECCIONAR REQUEST "POST ORDER"

- SELECCIONAR METODO "POST":
    - Agregar direccion url: "http://localhost:3000/order/newOrder"
    - Seleccionar "Authorization" - Type: "Bearer Token"
        - Pegar el token copiado anteriormente en el login de usuario
        ( sin el token no podemos realizar la accion )

    - Seleccionar "Body" luego "raw" y por ultimo JSON
        - Agregar estructura para realizar la orden:
            - JSON Structure: 
                - {
                    "order": {
                    "payment_method": "cash",
                    "menu": [{ "id": 1 }]
                    }        
                  }

    - CLICK "BOTON" SEND

    - Datos a completar:
        - payment_method: (metodo de pago: puede ser "cash" o "card")  
        - menu: (en caso de querer agregar mas menus se debera respetar la siguiente estructura:
            [{ "id": 1 }, { "id": 2 }, { "id": 3 }]
        )

//////////////////////////////////////////////////////////////////////////////////////////////////        


--/* MENU */--

//////////////////////////////////////////////////////////////////////////////////////////////////

- VER MENUS DISPONIBLES

---- SELECCIONAR REQUEST "GET MENU"

- SELECCIONAR METHODO "GET"
    - Agregar direccion url: "http://localhost:3000/menu"
    
    - CLICK "BOTON" SEND

//////////////////////////////////////////////////////////////////////////////////////////////////


------------------------ SECCION ADMIN ------------------------

//////////////////////////////////////////////////////////////////////////////////////////////////

- LOGIN ADMIN:

---- SELECCIONAR REQUEST "LOGIN USER"

- SELECCIONAR METODO "POST":
    - Agregar direccion url: "http://localhost:3000/user/login"
    - Seleccionar "Body" luego "x-www-form-urlencoded"
        - Agregar "key" = email  //  "value" = admin@gmail.com
        - Agregar "key" = password  //  "value" = admin12345678 
    
    - CLICK "BOTON" SEND

- Una vez realizado el login se devolvera un token - COPIAR TOKEN RECIBIDO Y GUARDARLO -
- Este usuario ya fue creado en la base de datos por default.

//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////

- VER TODOS LOS USUARIOS:

---- SELECCIONAR REQUEST "GET USER"

- SELECCIONAR METODO "GET":
    - Agregar direccion url: "localhost:3000/user"
    - Seleccionar "Authorization" - Type: "Bearer Token"
        - Pegar el token copiado anteriormente en el login de admin
        ( sin el token no podemos realizar la accion )

//////////////////////////////////////////////////////////////////////////////////////////////////



--/* ORDEN */--

//////////////////////////////////////////////////////////////////////////////////////////////////

- NUEVA ORDEN

---- SELECCIONAR REQUEST "POST ORDER"

- SELECCIONAR METODO "POST":
    - Agregar direccion url: "http://localhost:3000/order/newOrder"
    - Seleccionar "Authorization" - Type: "Bearer Token"
        - Pegar el token copiado anteriormente en el login de usuario
        ( sin el token no podemos realizar la accion )

    - Seleccionar "Body" luego "raw" y por ultimo JSON
        - Agregar estructura para realizar la orden:
            - JSON Structure: 
                - {
                    "order": {
                    "payment_method": "cash",
                    "menu": [{ "id": 1 }]
                    }        
                  }

    - CLICK "BOTON" SEND

    - Datos a completar:
        - payment_method: (metodo de pago: puede ser "cash" o "card")  
        - menu: (en caso de querer agregar mas menus se debera respetar la siguiente estructura:
            [{ "id": 1 }, { "id": 2 }, { "id": 3 }]
        )

//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////

- EDITAR ORDEN

---- SELECCIONAR REQUEST "POST ORDER"

- SELECCIONAR METODO "PUT":
    - Agregar direccion url: "http://localhost:3000/order/id"
    - Reemplazar "/id" por el numero de orden a editar
    - Seleccionar "Authorization" - Type: "Bearer Token"
        - Pegar el token copiado anteriormente en el login de admin
        ( sin el token no podemos realizar la accion )

    - Seleccionar "Body" luego "x-www-form-urlencoded" y por ultimo JSON
        - Agregar estructura para realizar la orden:
            - Agregar "key" = state  //  "value" = Puede ser: 'new','confirm', 'cancel', 'delivered'. 
            - Agregar "key" = payment_method  //  "value" = cash o card 

    - CLICK "BOTON" SEND

//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////

- ELIMINAR ORDEN

- SELECCIONAR METODO "DELETE"
    - Agregar direccion url: "http://localhost:3000/order/id"
    - Reemplazar "/id" por el numero de orden a eliminar
    - Seleccionar "Authorization" - Type: "Bearer Token"
        - Pegar el token copiado anteriormente en el login de admin
        ( sin el token no podemos realizar la accion )

    - CLICK "BOTON" SEND

//////////////////////////////////////////////////////////////////////////////////////////////////

--/* MENU */--

//////////////////////////////////////////////////////////////////////////////////////////////////

- VER MENUS DISPONIBLES

---- SELECCIONAR REQUEST "GET MENU"

- SELECCIONAR METHODO "GET"
    - Agregar direccion url: "http://localhost:3000/menu"
    
    - CLICK "BOTON" SEND

//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////

- EDITAR MENU

- SELECCIONAR METODO "PUT":
    - Agregar direccion url: "http://localhost:3000/menu/id"
    - Reemplazar "/id" por el numero de orden a editar
    - Seleccionar "Authorization" - Type: "Bearer Token"
        - Pegar el token copiado anteriormente en el login de admin
        ( sin el token no podemos realizar la accion )

    - Seleccionar "Body" luego "x-www-form-urlencoded" y por ultimo JSON
        - Agregar estructura para realizar la orden:
            - Agregar "key" = name  //  "value" = nombre de menu. 
            - Agregar "key" = price  //  "value" = nuevo precio. (ej: 700) 

    - CLICK "BOTON" SEND

//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////

- ELIMINAR MENU

- SELECCIONAR METODO "DELETE":
    - Agregar direccion url: "http://localhost:3000/menu/id"
    - Reemplazar "/id" por el numero de orden a eliminar
    - Seleccionar "Authorization" - Type: "Bearer Token"
        - Pegar el token copiado anteriormente en el login de admin
        ( sin el token no podemos realizar la accion )

    - CLICK "BOTON" SEND

//////////////////////////////////////////////////////////////////////////////////////////////////
