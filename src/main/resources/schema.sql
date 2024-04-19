CREATE TABLE Bestilling
(
    BestillingsID INTEGER AUTO_INCREMENT NOT NULL,
    film VARCHAR(30) NOT NULL,
    antall INTEGER NOT NULL,
    fornavn VARCHAR(30) NOT NULL,
    etternavn VARCHAR(30) NOT NULL,
    telefonnr VARCHAR(10) NOT NULL,
    epost VARCHAR(50) NOT NULL,
    PRIMARY KEY (BestillingsID)
);