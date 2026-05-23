const request = require("supertest");

// Mock de la base de datos
jest.mock("../src/config/database", () => ({
  query: jest.fn()
}));

const pool = require("../src/config/database");
const app = require("../src/index");

describe("Pokemon API", () => {
  beforeEach(() => jest.clearAllMocks());

  test("GET /health retorna OK", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
    expect(res.body.service).toBe("pokemon-service");
  });

  test("GET /api/pokemons retorna lista", async () => {
    pool.query.mockResolvedValue([[
      { id: 1, nombre: "Pikachu", tipo: "Eléctrico", nivel: 35 }
    ]]);
    const res = await request(app).get("/api/pokemons");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
  });

  test("GET /api/pokemons/:id retorna un pokemon", async () => {
    pool.query.mockResolvedValue([[{ id: 1, nombre: "Pikachu", tipo: "Eléctrico" }]]);
    const res = await request(app).get("/api/pokemons/1");
    expect(res.status).toBe(200);
    expect(res.body.data.nombre).toBe("Pikachu");
  });

  test("GET /api/pokemons/:id retorna 404 si no existe", async () => {
    pool.query.mockResolvedValue([[]]);
    const res = await request(app).get("/api/pokemons/999");
    expect(res.status).toBe(404);
  });

  test("POST /api/pokemons crea un pokemon", async () => {
    pool.query.mockResolvedValue([{ insertId: 5 }]);
    const res = await request(app).post("/api/pokemons")
      .send({ nombre: "Bulbasaur", tipo: "Planta", nivel: 10 });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test("POST /api/pokemons falla sin nombre", async () => {
    const res = await request(app).post("/api/pokemons").send({ tipo: "Fuego" });
    expect(res.status).toBe(400);
  });

  test("PUT /api/pokemons/:id actualiza un pokemon", async () => {
    pool.query.mockResolvedValue([{ affectedRows: 1 }]);
    const res = await request(app).put("/api/pokemons/1")
      .send({ nombre: "Pikachu", tipo: "Eléctrico", nivel: 36, habilidad: "Trueno", imagen_url: "" });
    expect(res.status).toBe(200);
  });

  test("PUT /api/pokemons/:id retorna 404 si no existe", async () => {
    pool.query.mockResolvedValue([{ affectedRows: 0 }]);
    const res = await request(app).put("/api/pokemons/999")
      .send({ nombre: "X", tipo: "Y", nivel: 1, habilidad: "", imagen_url: "" });
    expect(res.status).toBe(404);
  });

  test("DELETE /api/pokemons/:id elimina un pokemon", async () => {
    pool.query.mockResolvedValue([{ affectedRows: 1 }]);
    const res = await request(app).delete("/api/pokemons/1");
    expect(res.status).toBe(200);
  });

  test("DELETE /api/pokemons/:id retorna 404 si no existe", async () => {
    pool.query.mockResolvedValue([{ affectedRows: 0 }]);
    const res = await request(app).delete("/api/pokemons/999");
    expect(res.status).toBe(404);
  });

  test("POST /api/pokemons/seed/data inserta datos", async () => {
    pool.query.mockResolvedValue([{}]);
    const res = await request(app).post("/api/pokemons/seed/data");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
