package com.example.javascriptoblig2nyttforsok;

public class Billett {

    private long id;

    private String film;

    private int antall;

    private String fornavn;

    private String etternavn;

    private String telefonnr;

    private String epost;


    public Billett(){}

    public Billett(Long id, String film, int antall, String fornavn, String etternavn, String telefonnr, String epost) {
        this.id = id;
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefonnr = telefonnr;
        this.epost = epost;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getfilm() {
        return film;
    }

    public void setfilm(String film) {
        this.film = film;
    }

    public int getAntall() {
        return antall;
    }

    public void setAntall(int antall) {
        this.antall = antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public String gettelefonnr() {
        return telefonnr;
    }

    public void settelefonnr(String telefonnr) {
        this.telefonnr = telefonnr;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }
}