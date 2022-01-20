# F1-history

Sivu: https://formula1history.herokuapp.com/ <br/>
Työaikakirja: https://github.com/Villee00/F1-history/blob/main/Ty%C3%B6aikakirja.md 

Database: MongoDB <br/>
Backend: Express + Apollo + nodejs <br/>
Frontend: React <br/>

# Käyttö tarkoitus
Sivuston ideana on yksinkertaistaa vanhojen F1 kisojen ja kuskien etsimistä. Lempi kisojen ja kuskien tallentaminen käy helposti käyttäjällä.

Season tabille voidaan valita haluttu kausi ja selata kauden kisoja. 
Drivers tabilla pystyy etsimään ja filtteriömään kuskeja nimen, tallin, ajaneen kauden ja kansallisuuden perusteella. Näyttämis järjestystä voi myös muuttaa.

Oikeassa yläkulmassa on valikko, josta voidaan vaihtaa tummatila sivun teemaksi. Valikossa pääsee myös kirjautumaan ja jos käyttäjä on kirjutunut sisään voidaan kirjautua ulos tai mennä katsomaan omaa profiiliaan. 

Käyttäjällä pystyy lisäämään lempi kuskeja ja kisoja omaan profiiliin. Oman profiilinsa voi jakaa muille ihmisille, jotka pystyvät näkemään lempi kuskisi ja kisat, vaikka heillä ei olisi käyttäjää.

Esimerkiksi: [Oma profiilini](https://formula1history.herokuapp.com/ville "Oma profiilini")

# Uudet ominaisuudet 5op palautuksesta
- Käyttäjän luonti/kirjautuminen
- Käyttäjä profiilit
- Käyttäjät voivat lisätä kuskeja tai kisoja suosikkeihinsa
- Kaikki kisat ja kuskit löytyvät
- Sivun teemaa voi vaihtaa tumman ja valkean välillä
- Kuskeja pystyy suodattamaan ja vaihtamaan näyttöjärjestystä
- Kuskit käyttää nyt "Infinite scrolling" tekniikkaa
- Kuvat haetaan oikean kokoisena Wikipediasta, jonka takia sivu latautuu nopeammin
- Ilmoitukset, jos jotain meni väärin tai onnistui (Esim. kirjautuminen onnistui)


Kisojen ja tuloksien tiedot saatiin Wikipediasta ja [Ergast apista](https://ergast.com/mrd/ "Ergast apista")
