# Actualizar imagenes desde APIs

Este script busca imagenes reales desde:

- NarutoDB: `https://narutodb.xyz`
- Dragon Ball API: `https://dragonball-api.com/api/characters`

Luego actualiza:

- Supabase/PostgreSQL, tabla `personajes`, columna `imagen_url`.
- MongoDB Atlas, coleccion `guerreros`, campo `imagen_url`.

## Ejecutar

Desde la raiz del proyecto:

```powershell
npm init -y
npm install pg mongodb
node scripts/update-image-links-from-apis.js
```

Despues recarga el frontend con `Ctrl+F5`.

Si alguna imagen no llega desde la API o se rompe despues, el frontend ya tiene fallback: muestra iniciales del personaje en vez de imagen rota.
