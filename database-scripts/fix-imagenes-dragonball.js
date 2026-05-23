// Ejecutar en MongoDB Atlas Shell o Compass Shell.
// Limpia URLs externas que pueden romperse. El frontend mostrara imagenes locales generadas.

use("dragonball_db");

db.guerreros.updateMany({}, { $set: { imagen_url: "" } });

db.guerreros.find({}, { nombre: 1, imagen_url: 1 }).sort({ nombre: 1 });
