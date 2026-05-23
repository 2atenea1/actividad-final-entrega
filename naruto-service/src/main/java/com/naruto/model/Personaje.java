package com.naruto.model;

import jakarta.persistence.*;

@Entity
@Table(name = "personajes")
public class Personaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String aldea;

    private String rango;
    private String jutsu;
    private String imagen_url;

    public Personaje() {}

    public Personaje(String nombre, String aldea, String rango, String jutsu, String imagen_url) {
        this.nombre = nombre;
        this.aldea = aldea;
        this.rango = rango;
        this.jutsu = jutsu;
        this.imagen_url = imagen_url;
    }

    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getAldea() { return aldea; }
    public void setAldea(String aldea) { this.aldea = aldea; }
    public String getRango() { return rango; }
    public void setRango(String rango) { this.rango = rango; }
    public String getJutsu() { return jutsu; }
    public void setJutsu(String jutsu) { this.jutsu = jutsu; }
    public String getImagen_url() { return imagen_url; }
    public void setImagen_url(String imagen_url) { this.imagen_url = imagen_url; }
}
