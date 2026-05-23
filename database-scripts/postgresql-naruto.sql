-- Naruto -> Java/Spring Boot -> PostgreSQL
-- Ejecutar en Supabase SQL Editor o psql.

CREATE TABLE IF NOT EXISTS personajes (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  aldea VARCHAR(100) NOT NULL,
  rango VARCHAR(100),
  jutsu VARCHAR(150),
  imagen_url TEXT
);

TRUNCATE TABLE personajes RESTART IDENTITY;

INSERT INTO personajes (nombre, aldea, rango, jutsu, imagen_url) VALUES
('Naruto Uzumaki', 'Konoha', 'Hokage', 'Rasengan', 'https://cdn.myanimelist.net/images/characters/2/284121.jpg?s=3ebac88ad166bf105d8f04894f3fb469'),
('Sasuke Uchiha', 'Konoha', 'Jonin', 'Chidori', 'https://cdn.myanimelist.net/images/characters/9/131317.jpg?s=9705c17dba36c2edebded3a72dc1a46e'),
('Sakura Haruno', 'Konoha', 'Jonin', 'Fuerza Sobrehumana', 'https://cdn.myanimelist.net/images/characters/9/69275.jpg?s=36c4ad9f4440d77918c34c49870e719c'),
('Kakashi Hatake', 'Konoha', 'Hokage', 'Raikiri', 'https://cdn.myanimelist.net/images/characters/7/284129.jpg?s=b0a6b941fd427cbfd85657f316c0e309'),
('Rock Lee', 'Konoha', 'Jonin', 'Loto Primario', 'https://cdn.myanimelist.net/images/characters/13/433353.jpg?s=c2099a6532ecf14f4cf233c4cbd6532f'),
('Neji Hyuga', 'Konoha', 'Jonin', 'Palma Suave', 'https://cdn.myanimelist.net/images/characters/2/105538.jpg?s=7603e3986722997b66259d9fea83a3b2'),
('Gaara', 'Arena', 'Kazekage', 'Ataud de Arena', 'https://cdn.myanimelist.net/images/characters/10/293375.jpg?s=ceeb8ed1578737104c8e347ab7a52101'),
('Itachi Uchiha', 'Konoha', 'ANBU', 'Tsukuyomi', 'https://cdn.myanimelist.net/images/characters/9/284122.jpg?s=11eac9672b208175831a0da62f188622'),
('Jiraiya', 'Konoha', 'Sannin', 'Modo Sabio', 'https://cdn.myanimelist.net/images/characters/15/68618.jpg?s=ec35c8f49aa4cd7389bfc36d30cda3d7'),
('Tsunade', 'Konoha', 'Hokage', 'Creacion Renacimiento', 'https://cdn.myanimelist.net/images/characters/12/523646.jpg?s=6e76b1e4adef34cd1698c91947542cc5'),
('Orochimaru', 'Sonido', 'Sannin', 'Serpiente Gigante', 'https://cdn.myanimelist.net/images/characters/3/162089.jpg?s=77b65c6a4dfa133ef211d805af39d986'),
('Minato Namikaze', 'Konoha', 'Hokage', 'Hiraishin', 'https://cdn.myanimelist.net/images/characters/14/128074.jpg?s=3c25d6b03a654401141036f32b6e9b8b');

SELECT * FROM personajes ORDER BY id;
