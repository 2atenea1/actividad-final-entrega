from flask_swagger_ui import get_swaggerui_blueprint
import json

SWAGGER_URL = "/api-docs"
API_URL = "/swagger.json"

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={"app_name": "Dragon Ball API"}
)

swagger_spec = {
    "openapi": "3.0.0",
    "info": {
        "title": "Dragon Ball API - MongoDB",
        "version": "1.0.0",
        "description": "Microservicio de guerreros Dragon Ball con Python y MongoDB"
    },
    "paths": {
        "/api/guerreros": {
            "get": {"summary": "Obtener todos los guerreros", "tags": ["Dragon Ball"],
                    "responses": {"200": {"description": "Lista de guerreros"}}},
            "post": {"summary": "Crear un guerrero", "tags": ["Dragon Ball"],
                     "requestBody": {"required": True, "content": {"application/json": {"schema": {
                         "type": "object", "required": ["nombre", "raza"],
                         "properties": {"nombre": {"type": "string", "example": "Goku"},
                                        "raza": {"type": "string", "example": "Saiyajin"},
                                        "transformacion": {"type": "string"},
                                        "poder": {"type": "integer"}}}}}},
                     "responses": {"201": {"description": "Guerrero creado"}}}
        },
        "/api/guerreros/{id}": {
            "get": {"summary": "Obtener guerrero por ID", "tags": ["Dragon Ball"],
                    "parameters": [{"in": "path", "name": "id", "required": True, "schema": {"type": "string"}}],
                    "responses": {"200": {"description": "Guerrero encontrado"}, "404": {"description": "No encontrado"}}},
            "put": {"summary": "Actualizar guerrero", "tags": ["Dragon Ball"],
                    "parameters": [{"in": "path", "name": "id", "required": True, "schema": {"type": "string"}}],
                    "responses": {"200": {"description": "Actualizado"}}},
            "delete": {"summary": "Eliminar guerrero", "tags": ["Dragon Ball"],
                       "parameters": [{"in": "path", "name": "id", "required": True, "schema": {"type": "string"}}],
                       "responses": {"200": {"description": "Eliminado"}}}
        },
        "/api/guerreros/seed/data": {
            "post": {"summary": "Insertar 12 guerreros de ejemplo", "tags": ["Dragon Ball"],
                     "responses": {"200": {"description": "Datos insertados"}}}
        }
    }
}
