-- Script de inicialización para MySQL (Railway)
CREATE DATABASE IF NOT EXISTS pokemon_db;
USE pokemon_db;

CREATE TABLE IF NOT EXISTS pokemons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  tipo VARCHAR(100) NOT NULL,
  nivel INT DEFAULT 1,
  habilidad VARCHAR(100),
  imagen_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
