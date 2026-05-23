# Actividad Final - carpeta limpia de entrega

Esta carpeta contiene solo lo necesario para cumplir la actividad:

- `pokemon-service`: microservicio Node.js + MySQL.
- `naruto-service`: microservicio Java/Spring Boot + PostgreSQL.
- `dragonball-service`: microservicio Python/Flask + MongoDB.
- `frontend`: frontend web.
- `database-scripts`: codigo para crear e insertar datos en las bases.
- `docker-compose.yml`: contenedores para prueba local.
- `sonar-project.properties`: configuracion base para SonarQube.
- `PASO_A_PASO_FUNCIONAR.md`: instrucciones completas.

No uses la carpeta anterior con archivos duplicados. Esta es la carpeta organizada para trabajar y entregar.

## Orden recomendado

1. Crear las 3 bases de datos en la nube.
2. Ejecutar los scripts de `database-scripts`.
3. Copiar `.env.example` como `.env` y llenar credenciales.
4. Probar local con `docker-compose up --build -d`.
5. Revisar Swagger y frontend.
6. Ejecutar SonarQube.
7. Subir microservicios y frontend a la nube.
