const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
const { MongoClient } = require("mongodb");

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    process.env[key] = value;
  }
}

function parseJdbcPostgres(jdbcUrl) {
  const normalized = jdbcUrl.replace(/^jdbc:/, "");
  const url = new URL(normalized);
  return {
    host: url.hostname,
    port: Number(url.port || 5432),
    database: url.pathname.replace(/^\//, ""),
    user: url.searchParams.get("user") || decodeURIComponent(url.username),
    password: url.searchParams.get("password") || decodeURIComponent(url.password),
    ssl: { rejectUnauthorized: false }
  };
}

function normalize(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function firstImageFromNarutoResponse(json, expectedName) {
  const possibleLists = [
    json.characters,
    json.data,
    json.results,
    Array.isArray(json) ? json : null,
    json.name ? [json] : null
  ].filter(Boolean);

  const list = possibleLists.find(Array.isArray) || [];
  const expected = normalize(expectedName);
  const character = list.find(item => normalize(item.name) === expected) || list[0];
  if (!character) return "";

  if (Array.isArray(character.images) && character.images.length > 0) return character.images[0];
  return character.image || character.img || character.avatar || "";
}

let narutoCharactersCache = null;

async function getAllNarutoCharacters() {
  if (narutoCharactersCache) return narutoCharactersCache;
  const response = await fetch("https://api.narutodb.xyz/character");
  const contentType = response.headers.get("content-type") || "";
  if (!response.ok) throw new Error(`NarutoDB ${response.status}`);
  if (!contentType.includes("application/json")) {
    const preview = (await response.text()).slice(0, 80);
    throw new Error(`NarutoDB no devolvio JSON: ${preview}`);
  }
  const json = await response.json();
  narutoCharactersCache = json.characters || json.data || json.results || [];
  return narutoCharactersCache;
}

async function getNarutoImage(name) {
  const characters = await getAllNarutoCharacters();
  return firstImageFromNarutoResponse({ characters }, name);
}

async function getNarutoImageFromSearch(name) {
  const url = `https://api.narutodb.xyz/character/search?name=${encodeURIComponent(name)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`NarutoDB ${response.status} para ${name}`);
  const json = await response.json();
  return firstImageFromNarutoResponse(json, name);
}

async function updateNarutoImages() {
  const personajes = [
    "Naruto Uzumaki",
    "Sasuke Uchiha",
    "Sakura Haruno",
    "Kakashi Hatake",
    "Rock Lee",
    "Neji Hyuga",
    "Gaara",
    "Itachi Uchiha",
    "Jiraiya",
    "Tsunade",
    "Orochimaru",
    "Minato Namikaze"
  ];

  const client = new Client(parseJdbcPostgres(process.env.NARUTO_DATABASE_URL));
  await client.connect();

  for (const nombre of personajes) {
    try {
      const imagen = await getNarutoImage(nombre);
      if (!imagen) {
        console.log(`[Naruto] Sin imagen para ${nombre}`);
        continue;
      }
      await client.query("UPDATE personajes SET imagen_url = $1 WHERE nombre = $2", [imagen, nombre]);
      console.log(`[Naruto] ${nombre} -> ${imagen}`);
    } catch (error) {
      console.log(`[Naruto] Error con ${nombre}: ${error.message}`);
    }
  }

  await client.end();
}

async function getDragonBallImages() {
  const response = await fetch("https://dragonball-api.com/api/characters?limit=100");
  if (!response.ok) throw new Error(`Dragon Ball API ${response.status}`);
  const json = await response.json();
  return json.items || [];
}

function findDragonBallImage(apiCharacters, localName) {
  const aliases = {
    "Freezer": ["Freezer", "Frieza"],
    "Cell": ["Cell", "Celula"],
    "Majin Buu": ["Majin Buu", "Majin Boo", "Buu"],
    "Trunks": ["Trunks"],
    "Krilin": ["Krilin", "Krillin"],
    "Beerus": ["Beerus", "Bills"],
    "Whis": ["Whis"],
    "Broly": ["Broly"]
  };

  const candidates = aliases[localName] || [localName];
  const normalizedCandidates = candidates.map(normalize);

  const character = apiCharacters.find(item =>
    normalizedCandidates.includes(normalize(item.name))
  ) || apiCharacters.find(item =>
    normalizedCandidates.some(candidate => normalize(item.name).includes(candidate))
  );

  return character?.image || "";
}

async function updateDragonBallImages() {
  const apiCharacters = await getDragonBallImages();
  const mongo = new MongoClient(process.env.DRAGONBALL_MONGODB_URI);
  await mongo.connect();

  const db = mongo.db(process.env.DRAGONBALL_MONGODB_DB || "dragonball_db");
  const collection = db.collection("guerreros");
  const guerreros = await collection.find({}, { projection: { nombre: 1 } }).toArray();

  for (const guerrero of guerreros) {
    const imagen = findDragonBallImage(apiCharacters, guerrero.nombre);
    if (!imagen) {
      console.log(`[Dragon Ball] Sin imagen para ${guerrero.nombre}`);
      continue;
    }
    await collection.updateOne({ _id: guerrero._id }, { $set: { imagen_url: imagen } });
    console.log(`[Dragon Ball] ${guerrero.nombre} -> ${imagen}`);
  }

  await mongo.close();
}

async function main() {
  loadEnv();
  await updateNarutoImages();
  await updateDragonBallImages();
  console.log("Listo. Revisa el frontend y recarga con Ctrl+F5.");
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
