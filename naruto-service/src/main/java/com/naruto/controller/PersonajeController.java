package com.naruto.controller;

import com.naruto.model.Personaje;
import com.naruto.repository.PersonajeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/personajes")
@CrossOrigin(origins = "*")
@Tag(name = "Naruto", description = "API de personajes de Naruto con PostgreSQL")
public class PersonajeController {

    @Autowired
    private PersonajeRepository repo;

    @GetMapping
    @Operation(summary = "Obtener todos los personajes")
    public ResponseEntity<Map<String, Object>> getAll() {
        List<Personaje> lista = repo.findAll();
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("data", lista);
        res.put("total", lista.size());
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener personaje por ID")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long id) {
        Map<String, Object> res = new HashMap<>();
        return repo.findById(id).map(p -> {
            res.put("success", true);
            res.put("data", p);
            return ResponseEntity.ok(res);
        }).orElseGet(() -> {
            res.put("success", false);
            res.put("message", "Personaje no encontrado");
            return ResponseEntity.status(404).body(res);
        });
    }

    @PostMapping
    @Operation(summary = "Crear un personaje")
    public ResponseEntity<Map<String, Object>> create(@RequestBody Personaje p) {
        Map<String, Object> res = new HashMap<>();
        if (p.getNombre() == null || p.getAldea() == null) {
            res.put("success", false);
            res.put("message", "nombre y aldea son requeridos");
            return ResponseEntity.badRequest().body(res);
        }
        Personaje saved = repo.save(p);
        res.put("success", true);
        res.put("message", "Personaje creado");
        res.put("id", saved.getId());
        return ResponseEntity.status(201).body(res);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un personaje")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @RequestBody Personaje datos) {
        Map<String, Object> res = new HashMap<>();
        return repo.findById(id).map(p -> {
            p.setNombre(datos.getNombre());
            p.setAldea(datos.getAldea());
            p.setRango(datos.getRango());
            p.setJutsu(datos.getJutsu());
            p.setImagen_url(datos.getImagen_url());
            repo.save(p);
            res.put("success", true);
            res.put("message", "Personaje actualizado");
            return ResponseEntity.ok(res);
        }).orElseGet(() -> {
            res.put("success", false);
            res.put("message", "Personaje no encontrado");
            return ResponseEntity.status(404).body(res);
        });
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un personaje")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        Map<String, Object> res = new HashMap<>();
        if (!repo.existsById(id)) {
            res.put("success", false);
            res.put("message", "Personaje no encontrado");
            return ResponseEntity.status(404).body(res);
        }
        repo.deleteById(id);
        res.put("success", true);
        res.put("message", "Personaje eliminado");
        return ResponseEntity.ok(res);
    }

    @PostMapping("/seed/data")
    @Operation(summary = "Insertar 12 personajes de Naruto de ejemplo")
    public ResponseEntity<Map<String, Object>> seed() {
        repo.deleteAll();
        List<Personaje> personajes = Arrays.asList(
            new Personaje("Naruto Uzumaki", "Konoha", "Hokage", "Rasengan", "https://i.imgur.com/naruto.png"),
            new Personaje("Sasuke Uchiha", "Konoha", "Jōnin", "Chidori", "https://i.imgur.com/sasuke.png"),
            new Personaje("Sakura Haruno", "Konoha", "Jōnin", "Fuerza Sobrehumana", ""),
            new Personaje("Kakashi Hatake", "Konoha", "Jōnin", "Mil Pájaros", ""),
            new Personaje("Rock Lee", "Konoha", "Jōnin", "Loto Primario", ""),
            new Personaje("Neji Hyuga", "Konoha", "Jōnin", "Palma Suave", ""),
            new Personaje("Gaara", "Arena", "Kazekage", "Armadura de Arena", ""),
            new Personaje("Itachi Uchiha", "Konoha", "ANBU", "Tsukuyomi", ""),
            new Personaje("Jiraiya", "Konoha", "Sannin", "Técnica Pelo Aguja", ""),
            new Personaje("Tsunade", "Konoha", "Hokage", "Creación Renacimiento", ""),
            new Personaje("Orochimaru", "Sonido", "Sannin", "Serpiente Gigante", ""),
            new Personaje("Minato Namikaze", "Konoha", "Hokage", "Rasengan", "")
        );
        repo.saveAll(personajes);
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("message", personajes.size() + " personajes insertados");
        return ResponseEntity.ok(res);
    }

    @GetMapping("/health")
    @Operation(summary = "Health check")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> res = new HashMap<>();
        res.put("status", "OK");
        res.put("service", "naruto-service");
        res.put("db", "PostgreSQL");
        return ResponseEntity.ok(res);
    }
}
