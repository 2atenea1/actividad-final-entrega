require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pokemon API - MySQL",
      version: "1.0.0",
      description: "Microservicio de Pokemones con Node.js y MySQL en la nube"
    },
    servers: [{ url: process.env.API_URL || `http://localhost:${PORT}` }]
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/pokemons", require("./routes/pokemon"));

// Health
app.get("/health", (req, res) => res.json({ status: "OK", service: "pokemon-service", db: "MySQL" }));

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Pokemon Service corriendo en puerto ${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
