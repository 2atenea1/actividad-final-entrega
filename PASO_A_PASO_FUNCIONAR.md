# Paso a paso para que funcione la actividad

## 1. Abrir esta carpeta

Trabaja desde:

```text
C:\Users\dayan\OneDrive\Documents\New project\actividad-final-entrega
```

## 2. Crear las bases de datos en la nube

### Pokemon - MySQL

1. En Railway crea una base de datos MySQL.
2. Copia host, puerto, usuario, password y nombre de base.
3. Ejecuta este archivo en Railway, DBeaver o MySQL Workbench:

```text
database-scripts/mysql-pokemon.sql
```

Debe crear la tabla `pokemons` con 12 registros.

### Naruto - PostgreSQL

1. En Supabase crea un proyecto.
2. Abre SQL Editor.
3. Ejecuta:

```text
database-scripts/postgresql-naruto.sql
```

Debe crear la tabla `personajes` con 12 registros.

Para el servicio Java necesitas una URL tipo JDBC:

```env
NARUTO_DATABASE_URL=jdbc:postgresql://HOST:PORT/postgres?user=USUARIO&password=PASSWORD&sslmode=require
```

### Dragon Ball - MongoDB

1. En MongoDB Atlas crea un cluster.
2. Crea usuario y password en Database Access.
3. En Network Access permite tu IP, o `0.0.0.0/0` solo para pruebas.
4. Crea la base `dragonball_db` y la coleccion `guerreros`.
5. Si usas Atlas Data Explorer, pega el contenido de:

```text
database-scripts/mongodb-dragonball-documents.json
```

6. Si usas MongoDB Shell o Compass Shell, ejecuta:

```text
database-scripts/mongodb-dragonball.js
```

Debe crear 12 documentos en `guerreros`.

## 3. Configurar variables locales

En PowerShell, dentro de esta carpeta:

```powershell
Copy-Item .env.example .env
```

Abre `.env` y llena tus datos reales:

```env
POKEMON_DB_HOST=tu_host_mysql
POKEMON_DB_PORT=3306
POKEMON_DB_USER=tu_usuario
POKEMON_DB_PASSWORD=tu_password
POKEMON_DB_NAME=pokemon_db

NARUTO_DATABASE_URL=jdbc:postgresql://HOST:PORT/postgres?user=USUARIO&password=PASSWORD&sslmode=require

DRAGONBALL_MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@CLUSTER.mongodb.net/?retryWrites=true&w=majority
DRAGONBALL_MONGODB_DB=dragonball_db
```

## 4. Probar local con Docker

Ejecuta:

```powershell
docker-compose up --build -d
docker-compose ps
```

Abre:

- Frontend: `http://localhost:8080`
- Pokemon Swagger: `http://localhost:3001/api-docs`
- Naruto Swagger: `http://localhost:3002/api-docs/swagger-ui`
- Dragon Ball Swagger: `http://localhost:3003/api-docs`

Si el frontend no carga datos, revisa `.env` y confirma que las bases de datos tengan datos insertados.

## 5. Probar endpoints basicos

Puedes abrir estas URLs en navegador:

```text
http://localhost:3001/health
http://localhost:3002/api/personajes/health
http://localhost:3003/health
```

Tambien revisa:

```text
http://localhost:3001/api/pokemons
http://localhost:3002/api/personajes
http://localhost:3003/api/guerreros
```

## 6. Ejecutar SonarQube

Levanta SonarQube:

```powershell
docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:community
```

Abre:

```text
http://localhost:9000
```

Usuario inicial normalmente:

```text
admin / admin
```

Crea un proyecto local y genera token.

### Pokemon tests

```powershell
cd pokemon-service
npm install
npm run test:coverage
cd ..
```

### Analisis Sonar desde la raiz

```powershell
npx sonar-scanner -Dsonar.host.url=http://localhost:9000 -Dsonar.token=TU_TOKEN
```

Si `npx sonar-scanner` no esta disponible, usa el comando que te muestre SonarQube al crear el proyecto.

## 7. Subir microservicios a la nube

Sube esta carpeta a GitHub.

En Railway crea 3 servicios desde el mismo repositorio:

- Servicio Pokemon: Root Directory `pokemon-service`.
- Servicio Naruto: Root Directory `naruto-service`.
- Servicio Dragon Ball: Root Directory `dragonball-service`.

Variables para Pokemon:

```env
DB_HOST=...
DB_PORT=3306
DB_USER=...
DB_PASSWORD=...
DB_NAME=pokemon_db
DB_SSL=true
PORT=3001
```

Variables para Naruto:

```env
DATABASE_URL=jdbc:postgresql://HOST:PORT/postgres?user=USUARIO&password=PASSWORD&sslmode=require
PORT=3002
```

Variables para Dragon Ball:

```env
MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@CLUSTER.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=dragonball_db
PORT=3003
```

Cuando Railway te entregue las URLs publicas, guarda:

```text
https://tu-pokemon.up.railway.app/api-docs
https://tu-naruto.up.railway.app/api-docs/swagger-ui
https://tu-dragonball.up.railway.app/api-docs
```

## 8. Subir frontend a la nube

Antes de subir el frontend, abre:

```text
frontend/config.js
```

Cambia localhost por las URLs publicas:

```javascript
window.POKEMON_API = "https://tu-pokemon.up.railway.app";
window.NARUTO_API = "https://tu-naruto.up.railway.app";
window.DRAGONBALL_API = "https://tu-dragonball.up.railway.app";
```

Luego sube la carpeta `frontend` a Netlify o Vercel.

## 9. Capturas para entregar

Toma capturas de:

- `docker-compose ps` con servicios corriendo.
- Frontend local con datos.
- Swagger de Pokemon.
- Swagger de Naruto.
- Swagger de Dragon Ball.
- MySQL con tabla `pokemons`.
- PostgreSQL con tabla `personajes`.
- MongoDB con coleccion `guerreros`.
- SonarQube con resultado del analisis.
- Frontend publicado en la nube.
- Swagger de los 3 servicios publicados.

## 10. Checklist final

- Pokemon tiene minimo 10 registros: si, trae 12.
- Naruto tiene minimo 10 registros: si, trae 12.
- Dragon Ball tiene minimo 10 registros: si, trae 12.
- Swagger en cada microservicio: si.
- Docker para prueba local: si.
- Bases en la nube: debes crearlas y ejecutar scripts.
- Microservicios en la nube: debes subirlos a Railway.
- Frontend en la nube: debes subirlo a Netlify o Vercel.
- SonarQube: configuracion incluida.
