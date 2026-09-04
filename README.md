# 🏛️ Prezentace SNK ZA JAROMĚŘICE – Komunální volby 2026

Oficiální webová prezentace Sdružení nezávislých kandidátů **ZA JAROMĚŘICE** pro komunální volby v Jaroměřicích nad Rokytnou.

🌐 **Živý web:** [https://zajaromerice.cz](https://zajaromerice.cz)

---

## 🌟 O projektu

Tento web slouží jako hlavní informační kanál pro voliče v Jaroměřicích nad Rokytnou a jejich místních částech. Přináší kompletní přehled kandidátní listiny, volebního programu a návodu k volbám s důrazem na přehledný, moderní a plně responzivní design.

### Hlavní funkce a sekce:
- 🏛️ **Hero sekce s odpočtem:** Živý odpočet zbývajícího času do komunálních voleb (9. – 10. října 2026) s animovaným nadpisem a dominantním logem.
- 👥 **Kandidátní listina (#kandidatka):** Přehledná mřížka 21 kandidátů v čele s lídryní **Soňou Peprlovou** a **Petrem Křížem**, včetně věku, povolání, politické příslušnosti a fotek kandidátů.
- ✨ **Vizuální a typografické vyladění:**
  - Odlišená barva textu pro věk a profesi kandidátů (`#52525b`) pro skvělou čitelnost a vizuální kontrast oproti tmavým jménům.
  - Plynulý pozvolný **hover efekt (1.2s)** zčernání pozadí za fotkou/číslem kandidáta při najetí myší.
  - Integrované portrétní fotky kandidátů (včetně nově přidaných fotek pro Mojmíra Ciešlaka #19 a Aleše Pekárka #20 v `beta.html`).
- 📑 **Volební program (#program):** Klíčové vize a priority pro rozvoj města a všech jeho generací.
- 🗳️ **Návod pro voliče (#jak-hlasovat):** Praktický návod jak křížkovat kandidátku a správně odevzdat hlasovací lístek.
- 📱 **Mobilní optimalizace:** Dvousloupcové rozvržení kandidátky na mobilních zařízeních a plně přizpůsobená navigace.
- 🧪 **Beta verze (`beta.html`):** Testovací prostředí pro náhledy a přípravu nových funkcí a podkladů.
- 🖼️ **Generátor kandidátky pro sociální sítě (`generate_kandidatka.py`):** Python skript pro automatické generování grafického lístku s kandidáty pro propagaci na Facebooku.

---

## 🛠️ Použité technologie

- **HTML5** – Sémantické prvky, přístupnost (a11y) a SEO optimalizace.
- **Vanilla CSS3** – Moderní tmavý designový systém, CSS Grid, Flexbox, custom variables, plynulé přechodové animace (smooth hover transitions) a glassmorphism.
- **Vanilla JavaScript (ES6+)** – Živý odpočet času voleb, interaktivní medailonky kandidátů a scroll-reveal animace přes `IntersectionObserver`.
- **Python (Pillow)** – Skript pro generování kandidátní grafiky (`assets/kandidatka_facebook.png`).
- **Google Fonts & Lokální fonty** – Fonty *Nominee*, *Noto Sans Local*, *Syne* a *Montserrat*.

---

## 📁 Struktura projektu

```text
za-jaromerice/
├── index.html            # Hlavní produkční verze webu
├── beta.html             # Beta/preview verze pro testování nových úprav
├── styles.css            # Kompletní CSS styly, animace a responzivita
├── script.js             # Logika odpočtu voleb, vyhledávání a interaktivita
├── generate_kandidatka.py # Python skript pro generování volebního letáku pro FB
├── CNAME                 # Nastavení vlastní domény pro GitHub Pages (zajaromerice.cz)
├── assets/               # Obrázky, fotky kandidátů, fonty a grafické podklady
└── README.md             # Dokumentace projektu
```

---

## 🚀 Lokální spuštění

Projekt nevyžaduje žádné sestavovací nástroje ani Node.js závislosti. Pro lokální spuštění stačí:

1. Klonovat repozitář:
   ```bash
   git clone https://github.com/fpetru104/za-jaromerice.git
   ```
2. Otevřít soubor `index.html` (nebo `beta.html`) v libovolném webovém prohlížeči.

3. (Volitelné) Pro vygenerování kandidátky do obrázku spustit Python skript:
   ```bash
   python generate_kandidatka.py
   ```

---

## 📞 Kontakt & Sociální sítě

- **Web:** [zajaromerice.cz](https://zajaromerice.cz)
- **E-mail:** [frantapetru@seznam.cz](mailto:frantapetru@seznam.cz)
- **Facebook:** [SNK ZA JAROMĚŘICE na Facebooku](https://www.facebook.com/profile.php?id=100070278666960)

---
© 2026 SNK ZA JAROMĚŘICE. Všechna práva vyhrazena.
