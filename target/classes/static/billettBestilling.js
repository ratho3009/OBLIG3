//metode som kjører når "Kjøp Billett" knappen trykkes, Sjekker at input er riktig formert
//hvis input er riktig så sendes post-request før skjema blankes
let idTeller = 0;
document.getElementById("leggTilBillett").addEventListener("click", function() {
    let riktigInput = true;
    const film = document.getElementById("filmListe").value;
    const fornavn = document.getElementById("fornavn").value;
    const etternavn = document.getElementById("etternavn").value;
    const telefonnr = document.getElementById("telefonnr").value;
    const epost = document.getElementById("epost").value;
    const antall = parseInt(document.getElementById("antall").value, 10);

    //Resetter feilmeldingene før dem som er false vises igjen
    document.querySelectorAll('.red-text').forEach(el => el.textContent = '');

    // Validerer inputen, setter riktigInput = fales hvis input er feil
    if (!fornavn.trim()) {
        document.getElementById("fornavnError").textContent = "Fornavn kan ikke være tomt.";
        riktigInput = false;
    }
    if (!etternavn.trim()) {
        document.getElementById("etternavnError").textContent = "Etternavn kan ikke være tomt.";
        riktigInput = false;
    }
    if (!/^\d{8}$/.test(telefonnr)) {
        document.getElementById("telefonnrError").textContent = "Telefonnummer må være 8 siffer.";
        riktigInput = false;
    }
    if (!/\S+@\S+\.\S+/.test(epost)) {
        document.getElementById("epostError").textContent = "Ugyldig epost adresse.";
        riktigInput = false;
    }
    if (!Number.isInteger(antall) || antall < 1) {
        document.getElementById("antallError").textContent = "Antall må være et heltall større enn 0.";
        riktigInput = false;
    }
    if (film === "Velg film her") {
        document.getElementById("filmListeError").textContent = "Vennligst velg en film.";
        riktigInput = false;
    }

    if (!riktigInput) return;

    // Lager de forskjellige attributene inni Billetten
    const billettData ={
        fornavn: fornavn,
        etternavn: etternavn,
        telefonnr: telefonnr,
        epost: epost,
        film: film,
        antall: antall,
        id: idTeller
    };

    idTeller = idTeller+1;

    $.post("/lagre",billettData,function (){
        visBilletter()
    })
    document.getElementById("billettForm").reset();

});

document.getElementById("redigerKnapp").addEventListener("click", function() {
    let riktigInput = true;
    const film = document.getElementById("redigerFilmListe").value;
    const fornavn = document.getElementById("redigerFornavn").value;
    const etternavn = document.getElementById("redigerEtternavn").value;
    const telefonnr = document.getElementById("redigerTelefonnr").value;
    const epost = document.getElementById("redigerEpost").value;
    const antall = parseInt(document.getElementById("redigerAntall").value, 10);
    const id = parseInt(document.getElementById("velgId").value, 10);
    //Resetter feilmeldingene før dem som er false vises igjen
    document.querySelectorAll('.red-text').forEach(el => el.textContent = '');

    // Validerer inputen, setter riktigInput = fales hvis input er feil
    if (!fornavn.trim()) {
        document.getElementById("redigerFornavnError").textContent = "Fornavn kan ikke være tomt.";
        riktigInput = false;
    }
    if (!etternavn.trim()) {
        document.getElementById("redigerEtternavnError").textContent = "Etternavn kan ikke være tomt.";
        riktigInput = false;
    }
    if (!/^\d{8}$/.test(telefonnr)) {
        document.getElementById("redigerTelefonnrError").textContent = "Telefonnummer må være 8 siffer.";
        riktigInput = false;
    }
    if (!/\S+@\S+\.\S+/.test(epost)) {
        document.getElementById("redigerEpostError").textContent = "Ugyldig epost adresse.";
        riktigInput = false;
    }
    if (!Number.isInteger(antall) || antall < 1) {
        document.getElementById("redigerAntallError").textContent = "Antall må være et heltall større enn 0.";
        riktigInput = false;
    }


    if (film === "Velg film her") {
        document.getElementById("redigerFilmListeError").textContent = "Vennligst velg en film.";
        riktigInput = false;
    }

    if (!riktigInput) return;

    // Lager de forskjellige attributene inni Billetten
    const billettData ={
        fornavn: fornavn,
        etternavn: etternavn,
        telefonnr: telefonnr,
        epost: epost,
        film: film,
        antall: antall,
        id: id
    };


    $.get("/oppdater",billettData,function (){
        visBilletter()
    })
    document.getElementById("redigerBillettForm").reset();

});

//ajax http delete request som kjøres når "slett alle billettene" knappen trykkes.
document.getElementById("fjernKnapp").addEventListener("click", function() {
  $.ajax({
      type: "delete",
      url: "slettAlle",
  success: function (response){
          visBilletter()
  }})
});

//ajax http delete request som kjøres når "slett nyeste billett" knappen trykkes.
document.getElementById("fjernNyesteKnapp").addEventListener("click", function (){
    $.ajax({
        type: "delete",
        url: "slettNyeste",
        success: function (response) {
            visBilletter()
        }})
});

// Henter og viser alle billetter fra /hentAlle endepunktet, bestillingsdetaljer utskrives i skjema
function visBilletter() {
    $.get("/hentAlle", function(data) {
        const tableBody = document.querySelector("#billettTabell tbody");
        tableBody.innerHTML = "";
        data.forEach(({ film, antall, fornavn, etternavn, telefonnr, epost, id }) => {
            const row = `<tr>
                            <td>${film}</td>
                            <td>${antall}</td>
                            <td>${fornavn}</td>
                            <td>${etternavn}</td>
                            <td>${telefonnr}</td>
                            <td>${epost}</td>
                            <td>${id}</td>
                         </tr>`;
            tableBody.innerHTML += row;
        });
    });
}
