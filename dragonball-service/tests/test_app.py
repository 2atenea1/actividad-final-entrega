import pytest
import json
from unittest.mock import patch, MagicMock
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_health(client):
    res = client.get("/health")
    data = json.loads(res.data)
    assert res.status_code == 200
    assert data["status"] == "OK"
    assert data["service"] == "dragonball-service"

@patch("app.col")
def test_get_all(mock_col, client):
    mock_col.find.return_value = [
        {"_id": MagicMock(spec=["__str__"], **{"__str__": lambda s: "abc123"}), "nombre": "Goku", "raza": "Saiyajin"}
    ]
    res = client.get("/api/guerreros")
    assert res.status_code == 200

@patch("app.col")
def test_create_guerrero(mock_col, client):
    mock_col.insert_one.return_value = MagicMock(inserted_id="abc123")
    res = client.post("/api/guerreros",
        data=json.dumps({"nombre": "Goku", "raza": "Saiyajin"}),
        content_type="application/json")
    assert res.status_code == 201

@patch("app.col")
def test_create_guerrero_sin_nombre(mock_col, client):
    res = client.post("/api/guerreros",
        data=json.dumps({"raza": "Saiyajin"}),
        content_type="application/json")
    assert res.status_code == 400
