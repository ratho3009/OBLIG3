package com.example.javascriptoblig2nyttforsok;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    @Autowired
    BillettRepository rep;

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett){
        rep.lagreBillett(innBillett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlleBilletter() {
        return rep.hentAlleBilletter();
    }

    @DeleteMapping("/slettAlle")
    public void slettAlleBilletter() {
       rep.slettAlleBilletter();
    }

    @DeleteMapping("slettNyeste")
    public void slettSisteBillett(){
        rep.SlettSisteBillett();
    }
}
