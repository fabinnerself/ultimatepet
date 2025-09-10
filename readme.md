**Este archivo corresponde a la versión en español de la documentación del proyecto.  
Para la versión en inglés, consulta el archivo [`readme_en.md`](readme_en.md).**

# 📌 UltimatePetsBE - API DE GESTIÓN DE MASCOTAS CON QR

Backend para la gestión de mascotas, desarrollado con las siguientes tecnologías:

- Node.js
- Express
- dotenv
- MongoDB (Mongoose)
- Postman (pruebas)

##  🔗 Rutas disponibles

| Recurso | URL Base |
|---------|----------|
| Mascotas  | [https://ultimatepet.vercel.app/api/v1/pets/](https://ultimatepet.vercel.app/api/v1/pets/) |



## 🌟 Características

- Operaciones **CRUD** completas para la entidad **Mascotas**.
- Generación automática de un **código QR único** para cada mascota registrada.
- **Gestión detallada de errores** y respuestas claras ante situaciones como:
  - Falta de información o identificadores inválidos.
  - Errores internos del servidor (500).
  - Solicitudes incorrectas o mal formadas (400).

## 🛠️ Instalación

1. **Clonar el proyecto:**
   ```bash
   git clone https://github.com/fabinnerself/ultimatePetsBE.git    
   cd ultimatePetsBE
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar la base de datos:**
   - Asegúrate de tener una instancia de MongoDB en funcionamiento, ya sea de forma local (`mongodb://localhost:27017`) o utilizando un servidor en la nube como MongoDB Atlas (por ejemplo:  
     `mongodb+srv://{usuario}:{contraseña}@mymongodb.aofqgrl.mongodb.net/?retryWrites=true&w=majority&appName=mymongodb`).
   - Verifica que exista la base de datos llamada `mymongodb` y que contenga datos o esté vacía, según tus necesidades.

4. **Configurar variables de entorno:**
   - Copia el archivo `.env.template` a `.env` y verifica que la configuración de la base de datos MongoDB sea correcta.

5. **Ejecutar en modo desarrollo:**
   ```bash
   node index.js
   ```

6. **Probar los endpoints:**
   - Utiliza Postman u otra herramienta para consumir los endpoints de la API.

7. **Pruebas automatizadas en Postman:**
   - Las pruebas de la API se han realizado en Postman, utilizando variables globales para facilitar la reutilización y automatización de los tests.
   - Variables principales:
     - `BaseURl_petsP`: Define la URL base del recurso de mascotas, permitiendo adaptar los endpoints a diferentes entornos.
     - `Pet_Id`: Almacena el identificador único de una mascota creada durante las pruebas, permitiendo encadenar operaciones (consultar, modificar, eliminar).
   - Ejemplo de uso en las peticiones:
     ```
     {{BaseURl_petsP}}/api/v1/pets/{{Pet_Id}}
     ```
   - Flujo típico de pruebas:
     1. **Listar Mascotas:** Este endpoint lista todos los registros de mascotas sin utilizar la variable global `Pet_Id`. Durante las pruebas, se valida que la respuesta de la API tenga un código de estado HTTP 200, que el mensaje sea el esperado y que la respuesta sea un objeto que contenga exactamente las claves 'msg', 'data', 'totalItems', 'totalPages', 'limit' y 'currentPage', asegurando así que la estructura del resultado sea la adecuada.
     2. **Crear una mascota:** Se realiza una petición POST y se guarda el ID en la variable global.     
     3. **Obtener mascota por ID:** Se consulta la mascota recién creada.
     4. **Modificar mascota:** Se actualiza la mascota usando el mismo ID.
     5. **Eliminar mascota:** Se elimina la mascota y se comprueba que ya no existe.
   - Este enfoque garantiza que las pruebas sean dinámicas, repetibles y no dependan de datos estáticos, mejorando la robustez y confiabilidad del testing.
   - En el directorio `./test/` se incluyen los archivos:
     - `be_p_res_sumary.png`: Resumen de resultados de las pruebas.

![resumen](./test/be_p_res_sumary.png)

     - `be_p_test_res_det.png`: Detalle de los resultados de las pruebas.

 ![detalle](./test/be_p_test_res_det.png)

     - `Backend Pets.postman_test_run.json`: Archivo exportado de Postman con el detalle completo de la ejecución de las pruebas.
     
  [Detalle JSON](./test/Backend%20Pets.postman_test_run.json)

   - Para más detalles sobre la estructura y ejecución de las pruebas, consulta el archivo JSON incluido, que puede ser importado directamente en Postman para replicar el proceso.

   - A continuación se muestra un fragmento del script en JavaScript utilizado en Postman para automatizar y validar las respuestas de la API durante las pruebas. Este script se ejecuta automáticamente después de realizar una petición, permitiendo verificar tanto el estado de la respuesta como el contenido recibido, y gestionar variables globales para encadenar pruebas.

     ```javascript
     pm.test("Response status code is 200", function () {
         pm.expect(pm.response.code).to.equal(200);
     });

     const response = pm.response.json();
     console.log(response.msg);
     console.log(`Mensaje: ${response.msg}`);

     pm.test("Message should be 'OK'", () => {
         pm.expect(response.msg).to.eql('Ok');
         console.log("id val: ",response.data._id)
         pm.globals.set("Pet_Id",response.data._id)
     });

     pm.test("Ensure Response should have saved correctly", () => {
         const petId = pm.globals.get("Pet_Id");
         pm.expect(petId).to.exist; 
         pm.expect(petId).to.not.be.empty; 
     });
     ```
     Este script automatiza la validación de respuestas y el manejo de variables globales para encadenar pruebas.

---

## 📘 Documentación de la API

Este backend está diseñado para gestionar operaciones esenciales relacionadas con mascotas, permitiendo el manejo eficiente de su catálogo.

La entidad **Mascota** permite el control del catálogo, incluyendo nombre, raza, especie, fecha de nacimiento y observaciones. El sistema asegura integridad y consistencia en cada transacción, facilitando operaciones como el registro, modificación, consulta y eliminación de registros.

### 🔗 Rutas disponibles

| Recurso | URL Base |
|---------|----------|
| Mascotas  | [https://tmp-seven-azure.vercel.app/api/v1/pets/](https://tmp-seven-azure.vercel.app/api/v1/pets/) |

La documentación completa de los endpoints, ejemplos de uso y respuestas esperadas está disponible en Postman: [Postman Documentation](https://documenter.getpostman.com/view/22674808/2sB34mjdwu).

---

## 🧾 Descripción de la Entidad

### 🐶 Mascota

Representa a una mascota con nombre, raza, especie, fecha de nacimiento, observaciones y un código QR único. Contiene información detallada como su nombre, raza, especie y estado actual (activo o eliminado). Además, registra las fechas de creación, eliminación y última actualización.

**Operaciones soportadas:**

- `GET /api/v1/pets` - Listar todas las mascotas
- `GET /api/v1/pets/:id` - Obtener mascota por ID
- `POST /api/v1/pets` - Crear nueva mascota
- `PUT /api/v1/pets/:id` - Actualizar mascota
- `DELETE /api/v1/pets/:id` - Eliminar mascota

---

## 🧪 Ejemplos de uso

### Crear Mascota
```json
POST /api/v1/pets
{
  "codigo": "2",
  "nombre": "Neron",
  "raza": "Colie",
  "especie": "perro",
  "Fecha_de_Nacimiento": "08/08/2015",
  "Observaciones": "Juguetón"
}
```

### Obtener Mascota por ID
```bash
GET /api/v1/pets/:id
```

### Actualizar Mascota
```json
PUT /api/v1/pets/:id
{
  "nombre": "Neron",
  "raza": "Colie",
  "especie": "perro",
  "Fecha_de_Nacimiento": "08/08/2015",
  "Observaciones": "Juguetón y amigable"
}
```

### Eliminar Mascota
```bash
DELETE /api/v1/pets/:id
```

---

## 🤝 Contribución y agradecimientos

¡Las contribuciones son bienvenidas! Por favor, envía un pull request, haz un fork o abre un issue para reportar errores o sugerir nuevas características.

---

## 📜 Licencia

Este proyecto está bajo la licencia MIT. Para más detalles sobre los términos de la licencia, visita [MIT License](https://choosealicense.com/licenses/mit/).

---

## 🚀 Autor

👤 Favian Medina Gemio

| Recurso      | Dirección                                                                 |
|--------------|---------------------------------------------------------------------------|
| 📧 Email     | [favian.medina.gemio@gmail.com](mailto:favian.medina.gemio@gmail.com)     |
| 💻 GitHub    | [https://github.com/fabinnerself](https://github.com/fabinnerself)        |
| 🧠 LinkedIn  | [https://www.linkedin.com/in/favian-medina-gemio/](https://www.linkedin.com/in/favian-medina-gemio/) |
| 💼 Portafolio| [https://favian-medina-cv.vercel.app/](https://favian-medina-cv.vercel.app/) |

(c) 2025
