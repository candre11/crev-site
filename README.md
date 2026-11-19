# CREV — Shopify

Tema Shopify Online Store 2.0 per il brand di abbigliamento **CREV**, con una prima impostazione **light**, minimal in crema/nocciola, con testo scuro e dettagli camouflage. Negozio configurato: `s511rf-k0.myshopify.com`.

Basato sul tema ufficiale [Dawn 16.2.0](https://github.com/Shopify/dawn/tree/v16.2.0), commit `5b0862a30e0f4dd4663d685815b02192263d2efe`. La licenza originale è conservata in [LICENSE.md](LICENSE.md).

## Cosa include

- Homepage con banner camouflage continuo, titolo “Devi CREVerci” in crema con il logo CREV arancione e due prodotti subito sotto, in due colonne da 600 px e una colonna sulle finestre più strette.
- Catalogo, filtri, ricerca e schede prodotto con varianti, disponibilità e immagini gestite da Shopify.
- Logo nero ufficiale `crev nero.png` centrato e interattivo: passando sulle lettere si rivelano in verticale Clothing, Rejects, Every e Verges. I completamenti sono più piccoli delle iniziali, ravvicinati al disegno e senza riquadro. Durante l’apertura il titolo del banner sfuma per evitare sovrapposizioni. Supporta anche tastiera e tocco, senza spostare il contenuto della pagina.
- Icona a carrello sia vuoto sia con articoli, carrello laterale e checkout Shopify.
- Banner a tutta larghezza con altezza fissa; schede prodotto fino a 380 px, affiancate da 600 px e distribuite verso i lati con margini da 15 a 60 px; una colonna centrata sotto questa soglia.
- Testata con `scimmia.png` al posto dell’icona generica di accesso all’account Shopify. Menu e ricerca nascosti, riattivabili con “Mostra il menu nella testata” e “Mostra la ricerca nella testata” nell’editor. Il menu selezionato e le pagine restano disponibili.
- Layout responsive e traduzioni italiane già presenti in Dawn.

Le immagini e i prodotti segnaposto del tema vanno sostituiti con il catalogo reale. Prodotti, ordini, pagamenti, dominio e lingua predefinita si configurano nel pannello Shopify; non sono contenuti nel repository.

## Avvio

Servono Node.js **22.12 o successivo**, npm e un account autorizzato ad accedere ai temi del negozio.

```sh
npm ci
npm run dev
```

Il dominio è definito nell’ambiente `crev` del file `shopify.theme.toml`. La CLI avvia il flusso di accesso Shopify nel browser e restituisce il link di anteprima del tema di sviluppo. Non salvare password o token nel repository.

Il tema Liquid viene renderizzato da Shopify: non è un’applicazione React e non si avvia con un server statico locale.

## Verifica e caricamento

```sh
npm run check
npm run package
npm run push:preview
```

Il caricamento crea un tema **non pubblicato**. Dalla sezione **Negozio online → Temi** di Shopify puoi personalizzarlo, provarlo e pubblicarlo quando è pronto. In alternativa carica il file ZIP generato da `npm run package` oppure collega questo repository dall’integrazione GitHub di Shopify.

## Prima configurazione del negozio

1. Imposta il nome negozio **CREV**, il logo e l’italiano come lingua predefinita, se desiderato.
2. Aggiungi i capi e le varianti taglia/colore con prezzi, foto e disponibilità reali.
3. Nell’editor tema seleziona la collezione della homepage: verranno mostrati i primi due prodotti del suo ordinamento. Il titolo si modifica nella sezione **CREV — Banner camouflage**; le lettere CREV vengono colorate in arancione.
4. Configura il menu principale (ad esempio Shop e Contatti) e i collegamenti del footer.
5. Configura pagamenti, spedizioni e informative nel pannello Shopify. Verifica un ordine di prova prima di pubblicare.

## Camouflage personalizzato

Il banner usa direttamente il file `assets/Pattern_Camo.PNG`, senza velature o ripetizioni. L’immagine riempie il banner mantenendo le proporzioni, con ritaglio centrato ai bordi secondo la finestra: non presenta giunture fra copie del pattern. La testata usa il logo originale `assets/crev nero.png`, con quattro aree interattive allineate alle lettere. Il PNG è conservato integro: il ritaglio dei soli margini trasparenti è gestito nella vista SVG. Lo stesso disegno viene colorato in arancione nel titolo tramite una maschera, senza alterare il file.

Titolo e completamenti verticali usano Arial Bold (con fallback Helvetica/sans-serif), scelto come corrispondenza visiva alla riga “Made in Italy 100% Cotton” di `assets/etichetta L.png`. Il PNG dell’etichetta è un riferimento grafico e non contiene il file del carattere. La famiglia è centralizzata nella variabile `--crev-label-font-family`.

Per cambiare il camouflage del logo testuale della pagina con password:

1. Avvia `npm run dev` e apri il link dell’editor del tema mostrato dalla CLI.
2. Vai in **Impostazioni tema → Camouflage CREV → Immagine camouflage**.
3. Carica o seleziona l’immagine e salva: viene usata nel logo testuale della pagina con password, senza cambiare il banner o il logo ufficiale della testata.

In assenza di una selezione, il logo della pagina con password mantiene il pattern SVG incluso. Il comando di sviluppo include `--theme-editor-sync` per riportare nei file locali le modifiche fatte nell’editor Shopify; salva queste modifiche prima di sincronizzare ulteriori aggiornamenti Git.

## Struttura

- `assets/crev-theme.css`: identità visiva e disposizione responsive dei prodotti.
- `snippets/crev-header-brand.liquid`, `snippets/crev-acronym.liquid`, `assets/crev-acronym.js`, `assets/crev nero.png`: logo ufficiale centrato e completamenti verticali sulle quattro lettere.
- `snippets/crev-logo.liquid`: vista del logo originale, condivisa fra testata e titolo; maschera opzionale per il colore arancione.
- `snippets/crev-account-avatar.liquid`, `assets/scimmia.png`: immagine personalizzata nel componente account Shopify.
- `snippets/crev-wordmark.liquid`: logo testuale per la pagina con password.
- `sections/crev-banner.liquid`: banner della homepage con titolo crema e logo CREV arancione.
- `assets/section-crev-banner.css`, `assets/Pattern_Camo.PNG`: stile e immagine camouflage del banner.
- `assets/crev-camouflage.svg`, `snippets/crev-camouflage-url.liquid`: pattern predefinito e sorgente del camouflage dei loghi testuali.
- `sections/crev-hero.liquid`: precedente sezione CREV, ancora disponibile nell’editor.
- `assets/section-crev-hero.css`: stile responsive della hero.
- `templates/index.json`: composizione della homepage.
- `config/settings_data.json`: valori iniziali di colori e carrello.
- `shopify.theme.toml`: dominio Shopify per sviluppo e caricamento in anteprima, senza credenziali.
- `sections/header-group.json`, `sections/footer-group.json`: configurazione iniziale di testata e footer.
- Le altre cartelle contengono il tema Dawn e le sue funzionalità native.

Gli aggiornamenti effettuati nell’editor Shopify possono modificare i template JSON e le impostazioni del tema. Sincronizza queste modifiche prima di caricare una versione dal repository.
