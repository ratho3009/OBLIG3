package com.example.javascriptoblig2nyttforsok;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBillett(Billett billett){
        String sql = "INSERT INTO Bestilling (film,antall,fornavn,etternavn,telefonnr,epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, billett.getfilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.gettelefonnr(), billett.getEpost());
    }

    public List<Billett> hentAlleBilletter() {
        String sql = "SELECT * FROM Bestilling";
        List<Billett> alleBilletter =
                db.query(sql, new BeanPropertyRowMapper(Billett.class));
        return alleBilletter;
    }

    public void slettAlleBilletter () {
        String sql = "DELETE FROM Bestilling";
        db.update(sql);
    }

    public void SlettSisteBillett(){
        String sql = "DELETE FROM Bestilling WHERE BestillingsID = (SELECT MAX(BestillingsID) FROM Bestilling)";
        db.update(sql);
    }

}
