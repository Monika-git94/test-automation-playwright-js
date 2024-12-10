
/*
Při vývoji nové featury Objednávka pro MŠ/ZŠ jsme obdrželi tato akceptační kritéria. Pokryjte je automatizovanými testy:

Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové Objednávky pro MŠ/ZŠ
Po kliknutí na Pro učitele > Objednávka pro MŠ/ZŠ se otevře formulář, kde může uživatel vyplnit detail objednávky
Po vyplnění IČO do formuláře objednávky se automaticky načte jméno odběratele a adresa odběratele z ARESu
Uživatel může odeslat vyplněnou objednávku na příměstský tábor
Objednávku nelze odeslat pokud není řádně vyplněna

Implementace by ideálně měla obsahovat:
soubor s testy ve kterém jsou testy zapsané v  describe a test blocích
testy by měly obsahovat assertace
nejaký  z bloků before, beforeEach, podle toho co se Ti bude hodit
(optional) Page Object Pattern

Potřebujeme otestovat že navigace v aplikaci funguje, proto se do formuláře objednávky alespoň v jednom testu proklikej přes navigační menu. Pokud máš testů více můžeš použít navigaci přes adresu, pokud alespoň jeden dest pokryje menu.
Využij soubor fixtures.js pro sdílené konstanty
Dej testům jasné a srozumitelné popisky - můžes se nechat navést akceptačními kritérii
Testy můžeš rozdělit do více describe bloků podle zaměření, například:
testy na navigaci do formuláře objednávky
testy na vytvoření objednávky
Pokud chceš, můžeš implementovat testy pro objednávku školy v přírodě
K ověření, že nesprávně vyplněnou objednávku nelze odeslat můžeš použít jakýkoliv typ nevalidního vstupu, a nebo jich můžeš otestovat i víc

*/