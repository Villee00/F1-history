# F1-history

Sivu: https://formula1history.herokuapp.com/</br>
Työaikakirja: https://github.com/Villee00/F1-history/blob/main/Ty%C3%B6aikakirja.md</br>

Database: MongoDB<br/>
Backend: Express + Apollo + nodejs<br/>
Frontend: React + cypress<br/>

# Käyttö
Sivun ideana on helpottaa F1 kausien vanhojen kisojen etsimistä ja ratojen katsomista. Kisojen kortissa näkyy perustiedot (Päivä + sää) ja klikkaamalla pääsee tarkemmin katsomaan. Kisojen sivulla näkyy lopputulos ja kuinka monta paikkaa kuski on onnistunut saamaan/häviämään kisassa.<br/>

Drivers tabilla pystyy mennä katsomaan jokaisesta kuskista erikseen tietoa. Perustietona näkyy kuskin koko uran yhteenlaskettu paikkojen saaminen kisassa + kisojen määrä, joita on pystytty hakemaan Wikipediasta. Kuskit ovat ikä järjestyksessä.<br/>

Jos haluaa saada enemmän tietoa kisasta, jossa kuski ajoi voi kisan nimeä painaa ja kisan sivu avautuu. Kisan sivulta pääsee myös kuskin sivuille painamalla kuskin nimeä.<br/>


Kauden kisat ja ratojen tiedot yritetään hakea Wikipediasta. Joitain kausia ei pysty hakea, sillä jokainen Wikipedian sivu on vähän erilainen ja kisa listaa ei pystytty löytämään sivuilta. Näissä tilanteissa annetaan sivulle Wikipedia artikkeli, jos haluaa lukea lisää kyseiseistä kaudesta.
<br/> Kisojen tuloksien saamiseen käytin sivua: http://ergast.com/mrd/ <br/>