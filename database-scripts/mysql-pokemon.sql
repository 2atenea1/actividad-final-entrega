-- Pokemon -> Node.js -> MySQL
-- Ejecutar en Railway MySQL, DBeaver, MySQL Workbench o consola mysql.

CREATE DATABASE IF NOT EXISTS pokemon_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

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

TRUNCATE TABLE pokemons;

INSERT INTO pokemons (nombre, tipo, nivel, habilidad, imagen_url) VALUES
('Pikachu', 'Electrico', 35, 'Impactrueno', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'),
('Charizard', 'Fuego/Volador', 55, 'Lanzallamas', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'),
('Bulbasaur', 'Planta/Veneno', 10, 'Latigo Cepa', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'),
('Squirtle', 'Agua', 10, 'Pistola Agua', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'),
('Mewtwo', 'Psiquico', 70, 'Psicoonda', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png'),
('Gengar', 'Fantasma/Veneno', 45, 'Bola Sombra', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png'),
('Eevee', 'Normal', 20, 'Adaptabilidad', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png'),
('Snorlax', 'Normal', 40, 'Descanso', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png'),
('Machamp', 'Lucha', 55, 'Puno Dinamico', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png'),
('Dragonite', 'Dragon/Volador', 60, 'Hiperrayo', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png'),
('Lapras', 'Agua/Hielo', 45, 'Surf', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png'),
('Alakazam', 'Psiquico', 50, 'Confusion', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png');

SELECT * FROM pokemons ORDER BY id;
