const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/pokemonController");

/**
 * @swagger
 * tags:
 *   name: Pokemon
 *   description: API de Pokemones con MySQL
 */

/**
 * @swagger
 * /api/pokemons:
 *   get:
 *     summary: Obtener todos los pokemones
 *     tags: [Pokemon]
 *     responses:
 *       200:
 *         description: Lista de pokemones
 */
router.get("/", ctrl.getAll);

/**
 * @swagger
 * /api/pokemons/{id}:
 *   get:
 *     summary: Obtener un pokemon por ID
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pokemon encontrado
 *       404:
 *         description: No encontrado
 */
router.get("/:id", ctrl.getById);

/**
 * @swagger
 * /api/pokemons:
 *   post:
 *     summary: Crear un nuevo pokemon
 *     tags: [Pokemon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, tipo]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Pikachu
 *               tipo:
 *                 type: string
 *                 example: Eléctrico
 *               nivel:
 *                 type: integer
 *                 example: 35
 *               habilidad:
 *                 type: string
 *                 example: Impactrueno
 *               imagen_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pokemon creado
 */
router.post("/", ctrl.create);

/**
 * @swagger
 * /api/pokemons/{id}:
 *   put:
 *     summary: Actualizar un pokemon
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo:
 *                 type: string
 *               nivel:
 *                 type: integer
 *               habilidad:
 *                 type: string
 *               imagen_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Actualizado
 */
router.put("/:id", ctrl.update);

/**
 * @swagger
 * /api/pokemons/{id}:
 *   delete:
 *     summary: Eliminar un pokemon
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eliminado
 */
router.delete("/:id", ctrl.remove);

/**
 * @swagger
 * /api/pokemons/seed/data:
 *   post:
 *     summary: Insertar 12 pokemones de ejemplo
 *     tags: [Pokemon]
 *     responses:
 *       200:
 *         description: Datos insertados
 */
router.post("/seed/data", ctrl.seed);

module.exports = router;
