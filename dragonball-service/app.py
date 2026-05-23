from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv
from swagger_config import swagger_spec, swagger_ui_blueprint

load_dotenv()

app = Flask(__name__)
CORS(app)
app.register_blueprint(swagger_ui_blueprint, url_prefix="/api-docs")

# Conexión MongoDB Atlas
client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("MONGODB_DB", "dragonball_db")]
col = db["guerreros"]

def serializar(doc):
    doc["_id"] = str(doc["_id"])
    return doc

# ── RUTAS ──────────────────────────────────────────────────

@app.route("/health")
def health():
    return jsonify({"status": "OK", "service": "dragonball-service", "db": "MongoDB"})

@app.route("/swagger.json")
def swagger_json():
    return jsonify(swagger_spec)

@app.route("/api/guerreros", methods=["GET"])
def get_all():
    guerreros = [serializar(g) for g in col.find()]
    return jsonify({"success": True, "data": guerreros, "total": len(guerreros)})

@app.route("/api/guerreros/<id>", methods=["GET"])
def get_by_id(id):
    try:
        g = col.find_one({"_id": ObjectId(id)})
        if not g:
            return jsonify({"success": False, "message": "Guerrero no encontrado"}), 404
        return jsonify({"success": True, "data": serializar(g)})
    except Exception:
        return jsonify({"success": False, "message": "ID inválido"}), 400

@app.route("/api/guerreros", methods=["POST"])
def create():
    data = request.json
    if not data or not data.get("nombre") or not data.get("raza"):
        return jsonify({"success": False, "message": "nombre y raza son requeridos"}), 400
    result = col.insert_one(data)
    return jsonify({"success": True, "message": "Guerrero creado", "id": str(result.inserted_id)}), 201

@app.route("/api/guerreros/<id>", methods=["PUT"])
def update(id):
    try:
        data = request.json
        result = col.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Guerrero no encontrado"}), 404
        return jsonify({"success": True, "message": "Guerrero actualizado"})
    except Exception:
        return jsonify({"success": False, "message": "ID inválido"}), 400

@app.route("/api/guerreros/<id>", methods=["DELETE"])
def delete(id):
    try:
        result = col.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({"success": False, "message": "Guerrero no encontrado"}), 404
        return jsonify({"success": True, "message": "Guerrero eliminado"})
    except Exception:
        return jsonify({"success": False, "message": "ID inválido"}), 400

@app.route("/api/guerreros/seed/data", methods=["POST"])
def seed():
    col.delete_many({})
    guerreros = [
        {"nombre": "Goku", "raza": "Saiyajin", "transformacion": "Ultra Instinto", "poder": 9000000, "imagen_url": ""},
        {"nombre": "Vegeta", "raza": "Saiyajin", "transformacion": "Super Saiyajin Blue", "poder": 8500000, "imagen_url": ""},
        {"nombre": "Gohan", "raza": "Saiyajin", "transformacion": "Místico", "poder": 7000000, "imagen_url": ""},
        {"nombre": "Piccolo", "raza": "Namekiano", "transformacion": "Naranja", "poder": 5000000, "imagen_url": ""},
        {"nombre": "Freezer", "raza": "Mutante", "transformacion": "Black", "poder": 8000000, "imagen_url": ""},
        {"nombre": "Cell", "raza": "Androide", "transformacion": "Perfecto", "poder": 6000000, "imagen_url": ""},
        {"nombre": "Majin Buu", "raza": "Majin", "transformacion": "Delgado", "poder": 7500000, "imagen_url": ""},
        {"nombre": "Trunks", "raza": "Saiyajin", "transformacion": "Super Saiyajin Rage", "poder": 5500000, "imagen_url": ""},
        {"nombre": "Krilin", "raza": "Humano", "transformacion": "Ninguna", "poder": 1500000, "imagen_url": ""},
        {"nombre": "Beerus", "raza": "Dios", "transformacion": "Hakaishin", "poder": 99999999, "imagen_url": ""},
        {"nombre": "Whis", "raza": "Ángel", "transformacion": "Guía", "poder": 999999999, "imagen_url": ""},
        {"nombre": "Broly", "raza": "Saiyajin", "transformacion": "Legendario", "poder": 9500000, "imagen_url": ""}
    ]
    col.insert_many(guerreros)
    return jsonify({"success": True, "message": f"{len(guerreros)} guerreros insertados"})

if __name__ == "__main__":
    port = int(os.getenv("PORT", 3003))
    app.run(host="0.0.0.0", port=port, debug=False)
