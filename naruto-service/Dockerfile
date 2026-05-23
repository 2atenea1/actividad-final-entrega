FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 3002
HEALTHCHECK --interval=30s --timeout=10s CMD wget -qO- http://localhost:3002/api/personajes/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]
