const billetter = [];

document.getElementById("submitBtn").addEventListener("click", function() {
    let isValid = true;
    const film = document.getElementById("filmListe").value;
    const fornavn = document.getElementById("fornavn").value;
    const etternavn = document.getElementById("etternavn").value;
    const telefonnr = document.getElementById("telefonnr").value;
    const epost = document.getElementById("epost").value;
    const antall = parseInt(document.getElementById("antall").value, 10);

    // Reset error messages
    document.querySelectorAll('.red-text').forEach(el => el.textContent = '');

    // Validation
    if (!fornavn.trim()) {
        document.getElementById("fornavnError").textContent = "Fornavn kan ikke være tomt.";
        isValid = false;
    }
    if (!etternavn.trim()) {
        document.getElementById("etternavnError").textContent = "Etternavn kan ikke være tomt.";
        isValid = false;
    }
    if (!/^\d{8}$/.test(telefonnr)) {
        document.getElementById("telefonnrError").textContent = "Telefonnummer må være 8 siffer.";
        isValid = false;
    }
    if (!/\S+@\S+\.\S+/.test(epost)) {
        document.getElementById("epostError").textContent = "Ugyldig epost adresse.";
        isValid = false;
    }
    if (!Number.isInteger(antall) || antall < 1) {
        document.getElementById("antallError").textContent = "Antall må være et heltall større enn 0.";
        isValid = false;
    }
    if (film === "Velg film her") {
        document.getElementById("filmListeError").textContent = "Vennligst velg en film.";
        isValid = false;
    }

    if (!isValid) return;

    // Add ticket
    const billettData ={
        fornavn: fornavn,
        etternavn: etternavn,
        telefonnr: telefonnr,
        epost: epost,
        film: film,
        antall: antall
    };

    $.post("/lagre",billettData,function (){
        visBilletter()
    })
    document.getElementById("billettForm").reset();

});

document.getElementById("fjernKnapp").addEventListener("click", function() {
  $.ajax({
      type: "delete",
      url: "slettAlle",
  success: function (response){
          visBilletter()
  }})
});

document.getElementById("fjernNyesteKnapp").addEventListener("click", function (){
    $.ajax({
        type: "delete",
        url: "slettNyeste",
        success: function (response) {
            visBilletter()
        }})
});

function visBilletter() {
    $.get("/hentAlle", function(data) {
        const tableBody = document.querySelector("#billettTable tbody");
        tableBody.innerHTML = "";
        data.forEach(({ film, antall, fornavn, etternavn, telefonnr, epost }) => {
            const row = `<tr>
                            <td>${film}</td>
                            <td>${antall}</td>
                            <td>${fornavn}</td>
                            <td>${etternavn}</td>
                            <td>${telefonnr}</td>
                            <td>${epost}</td>
                         </tr>`;
            tableBody.innerHTML += row;
        });
    });
}
