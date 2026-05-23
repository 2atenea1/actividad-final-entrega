const pool = require("../config/database");

const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pokemons ORDER BY id");
    res.json({ success: true, data: rows, total: rows.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pokemons WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: "Pokemon no encontrado" });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { nombre, tipo, nivel, habilidad, imagen_url } = req.body;
    if (!nombre || !tipo) return res.status(400).json({ success: false, message: "nombre y tipo son requeridos" });
    const [result] = await pool.query(
      "INSERT INTO pokemons (nombre, tipo, nivel, habilidad, imagen_url) VALUES (?, ?, ?, ?, ?)",
      [nombre, tipo, nivel || 1, habilidad || "", imagen_url || ""]
    );
    res.status(201).json({ success: true, message: "Pokemon creado", id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { nombre, tipo, nivel, habilidad, imagen_url } = req.body;
    const [result] = await pool.query(
      "UPDATE pokemons SET nombre=?, tipo=?, nivel=?, habilidad=?, imagen_url=? WHERE id=?",
      [nombre, tipo, nivel, habilidad, imagen_url, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Pokemon no encontrado" });
    res.json({ success: true, message: "Pokemon actualizado" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM pokemons WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Pokemon no encontrado" });
    res.json({ success: true, message: "Pokemon eliminado" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const seed = async (req, res) => {
  try {
    await pool.query("DELETE FROM pokemons");
    const pokemons = [
      ["Pikachu", "Eléctrico", 35, "Impactrueno", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"],
      ["Charizard", "Fuego/Volador", 55, "Lanzallamas", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"],
      ["Bulbasaur", "Planta/Veneno", 10, "Látigo Cepa", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"],
      ["Squirtle", "Agua", 10, "Pistola Agua", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"],
      ["Mewtwo", "Psíquico", 70, "Psíquico", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"],
      ["Gengar", "Fantasma/Veneno", 45, "Bola Sombra", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"],
      ["Eevee", "Normal", 20, "Placaje", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"],
      ["Snorlax", "Normal", 40, "Amnesia", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png"],
      ["Machamp", "Lucha", 55, "Puño Dinámico", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png"],
      ["Dragonite", "Dragón/Volador", 60, "Hiperrayo", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png"],
      ["Lapras", "Agua/Hielo", 45, "Surf", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png"],
      ["Alakazam", "Psíquico", 50, "Psíquico", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png"]
    ];
    for (const p of pokemons) {
      await pool.query("INSERT INTO pokemons (nombre, tipo, nivel, habilidad, imagen_url) VALUES (?, ?, ?, ?, ?)", p);
    }
    res.json({ success: true, message: `${pokemons.length} pokemons insertados` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove, seed };
