-- Ejecutar en Supabase SQL Editor.
-- Actualiza Naruto con imagenes reales desde Jikan/MyAnimeList.

UPDATE personajes
SET imagen_url = CASE nombre
  WHEN 'Naruto Uzumaki' THEN 'https://cdn.myanimelist.net/images/characters/2/284121.jpg?s=3ebac88ad166bf105d8f04894f3fb469'
  WHEN 'Sasuke Uchiha' THEN 'https://cdn.myanimelist.net/images/characters/9/131317.jpg?s=9705c17dba36c2edebded3a72dc1a46e'
  WHEN 'Sakura Haruno' THEN 'https://cdn.myanimelist.net/images/characters/9/69275.jpg?s=36c4ad9f4440d77918c34c49870e719c'
  WHEN 'Kakashi Hatake' THEN 'https://cdn.myanimelist.net/images/characters/7/284129.jpg?s=b0a6b941fd427cbfd85657f316c0e309'
  WHEN 'Rock Lee' THEN 'https://cdn.myanimelist.net/images/characters/13/433353.jpg?s=c2099a6532ecf14f4cf233c4cbd6532f'
  WHEN 'Neji Hyuga' THEN 'https://cdn.myanimelist.net/images/characters/2/105538.jpg?s=7603e3986722997b66259d9fea83a3b2'
  WHEN 'Gaara' THEN 'https://cdn.myanimelist.net/images/characters/10/293375.jpg?s=ceeb8ed1578737104c8e347ab7a52101'
  WHEN 'Itachi Uchiha' THEN 'https://cdn.myanimelist.net/images/characters/9/284122.jpg?s=11eac9672b208175831a0da62f188622'
  WHEN 'Jiraiya' THEN 'https://cdn.myanimelist.net/images/characters/15/68618.jpg?s=ec35c8f49aa4cd7389bfc36d30cda3d7'
  WHEN 'Tsunade' THEN 'https://cdn.myanimelist.net/images/characters/12/523646.jpg?s=6e76b1e4adef34cd1698c91947542cc5'
  WHEN 'Orochimaru' THEN 'https://cdn.myanimelist.net/images/characters/3/162089.jpg?s=77b65c6a4dfa133ef211d805af39d986'
  WHEN 'Minato Namikaze' THEN 'https://cdn.myanimelist.net/images/characters/14/128074.jpg?s=3c25d6b03a654401141036f32b6e9b8b'
  ELSE imagen_url
END
WHERE nombre IN (
  'Naruto Uzumaki',
  'Sasuke Uchiha',
  'Sakura Haruno',
  'Kakashi Hatake',
  'Rock Lee',
  'Neji Hyuga',
  'Gaara',
  'Itachi Uchiha',
  'Jiraiya',
  'Tsunade',
  'Orochimaru',
  'Minato Namikaze'
);

SELECT id, nombre, imagen_url
FROM personajes
ORDER BY id;
