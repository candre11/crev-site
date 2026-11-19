# CREV — Shopify

Tema Shopify Online Store 2.0 per il brand di abbigliamento **CREV**, con una prima impostazione **light**, minimal in crema/nocciola, con testo scuro e dettagli camouflage. Negozio configurato: `s511rf-k0.myshopify.com`.

Basato sul tema ufficiale [Dawn 16.2.0](https://github.com/Shopify/dawn/tree/v16.2.0), commit `5b0862a30e0f4dd4663d685815b02192263d2efe`. La licenza originale è conservata in [LICENSE.md](LICENSE.md).

## Cosa include

- Homepage con `banner.png` a tutto schermo, senza velature, e testata trasparente sovrapposta: logo CREV interattivo, scimmia account e carrello. Il ritaglio mantiene il focus sulla scimmia anche su mobile. I due prodotti seguono la foto, in due colonne da 600 px e una colonna sulle finestre più strette.
- Catalogo, filtri, ricerca e schede prodotto con varianti, disponibilità e immagini gestite da Shopify.
- Logo ufficiale `crev nero.png` centrato e interattivo: in homepage viene colorato crema (`#d8c4b9`), come i completamenti verticali Clothing, Rejects, Every e Verges che si rivelano passando sulle lettere. I completamenti sono più piccoli delle iniziali, ravvicinati al disegno e senza riquadro. Supporta anche tastiera e tocco, senza spostare il contenuto della pagina.
- Icona a carrello sia vuoto sia con articoli, carrello laterale e checkout Shopify.
- Foto iniziale a tutta larghezza e alta quanto la finestra visibile, senza la precedente fascia camouflage; schede prodotto fino a 380 px, affiancate da 600 px. L’area prodotti si ferma alla larghezza del tema (1200 px): oltre questa soglia la distanza tra le schede resta fissa e aumentano solo i margini esterni. Sotto 600 px resta una colonna centrata.
- Testata con `scimmia.png` al posto dell’icona generica di accesso all’account Shopify e ingrandimento al passaggio del cursore pari al carrello (1,07×). In homepage, scimmia e carrello sono crema (`#d8c4b9`), come il logo. Menu e ricerca nascosti, riattivabili con “Mostra il menu nella testata” e “Mostra la ricerca nella testata” nell’editor. Il menu selezionato e le pagine restano disponibili.
- Layout responsive e traduzioni italiane già presenti in Dawn. Palette crema `#d8c4b9`, verde militare `#777d5a` e arancione.
- Footer unico arancione (`#ed8b3a`) con testi verde militare (`#777d5a`). In basso a sinistra mostra il campo email e, subito sotto, “iscriviti alla newsletter”; seguono copyright, Powered by Shopify e informative, a 3 px dai bordi inferiore e sinistro. Social, logo C, selettori e icone di pagamento sono al momento nascosti. Restano attivi il modulo newsletter e i collegamenti alle informative pubblicate su Shopify; nascondere le icone non cambia i metodi di pagamento al checkout.
- Pagina con password “Opening soon” con logo nero, sfondo camouflage a tutta pagina e riquadro arancione. Titolo e frase “be the first to know when the jungle opens” in marrone; la stampa della maglia crema segue il testo, alta 1 em. Accesso con password e iscrizione email mantengono i moduli Shopify.

Le immagini e i prodotti segnaposto del tema vanno sostituiti con il catalogo reale. Prodotti, ordini, pagamenti, dominio e lingua predefinita si configurano nel pannello Shopify; non sono contenuti nel repository.

## Avvio

Servono Node.js **22.12 o successivo**, npm e un account autorizzato ad accedere ai temi del negozio.

```sh
npm ci
npm run dev
```

`npm run dev` usa i file locali e carica il tema di sviluppo, senza riscaricare automaticamente le modifiche dell’editor Shopify. Se devi cambiare impostazioni o sezioni nell’editor e conservarle nella repo, usa invece `npm run dev:editor`: questa modalità abilita `--theme-editor-sync`. Prima di aggiornare con Git, ferma il server e salva o metti in stash le modifiche locali.

Se un `git pull` si interrompe perché `sections/footer-group.json` contiene modifiche locali, puoi conservarle e poi aggiornare:

```sh
git stash push -m "Backup footer Shopify" -- sections/footer-group.json
git pull --ff-only
npm run dev
```

Il backup resta nello stash; recuperalo solo dopo aver controllato le differenze rispetto al footer aggiornato.

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
3. Nell’editor tema seleziona la collezione della homepage: verranno mostrati i primi due prodotti del suo ordinamento. La foto iniziale usa il file `assets/banner.png`; la testata è sovrapposta solo in homepage e mantiene il normale comportamento sulle altre pagine.
4. Configura il menu principale (ad esempio Shop e Contatti) e i collegamenti del footer.
5. Configura pagamenti, spedizioni e informative nel pannello Shopify. Verifica un ordine di prova prima di pubblicare.

## Immagini e identità visiva

La foto iniziale usa `assets/banner.png`, con proporzioni conservate e riempimento della finestra (`object-fit: cover`). Il punto di ritaglio orizzontale al 42% mantiene in evidenza la scimmia nelle finestre strette. La testata della home è trasparente e scorre insieme alla foto; account e carrello conservano i componenti Shopify. Il camouflage resta sulla pagina con password. La testata usa il logo originale `assets/crev nero.png`, con quattro aree interattive allineate alle lettere. Il PNG è conservato integro: il ritaglio dei soli margini trasparenti è gestito nella vista SVG.

La home, i completamenti verticali, la pagina con password e la finestra account usano Arial Bold (con fallback Helvetica/sans-serif), scelto come corrispondenza visiva alla riga “Made in Italy 100% Cotton” di `assets/etichetta L.png`. Il PNG dell’etichetta è un riferimento grafico e non contiene il file del carattere. La famiglia è centralizzata nella variabile `--crev-label-font-family`; nella finestra account viene applicata tramite le variabili ufficiali Shopify per titoli e testo, senza cambiare riquadri o colori.

L’icona della voce “Profilo” dentro la finestra account è gestita da Shopify e non ha un punto di personalizzazione pubblico: il componente espone lo slot dell’avatar esterno, non le icone dei collegamenti interni. Riferimento: [API shopify-account](https://shopify.dev/docs/api/storefront-web-components/components/shopify-account).

Per cambiare il camouflage dello sfondo della pagina con password:

1. Avvia `npm run dev:editor` e apri il link dell’editor del tema mostrato dalla CLI.
2. Vai in **Impostazioni tema → Camouflage CREV → Immagine camouflage**.
3. Carica o seleziona l’immagine e salva: viene usata come sfondo della pagina con password, senza cambiare la foto della home o i loghi ufficiali.

In assenza di una selezione, lo sfondo usa `assets/Pattern_Camo.PNG`. Il testo della pagina si modifica nella sezione “Banner di iscrizione email” dell’editor password; il blocco paragrafo include l’opzione “Mostra la stampa CREV alla fine del testo”. La modalità `dev:editor` riporta nei file locali le modifiche fatte nell’editor Shopify; salva queste modifiche prima di sincronizzare ulteriori aggiornamenti Git.

## Struttura

- `assets/crev-theme.css`: identità visiva e disposizione responsive dei prodotti.
- `sections/footer.liquid`, `assets/crev-footer.css`: footer arancione essenziale, con newsletter sopra le diciture finali. Il file `assets/c nera.png` è conservato per utilizzi futuri.
- `snippets/crev-header-brand.liquid`, `snippets/crev-acronym.liquid`, `assets/crev-acronym.js`, `assets/crev nero.png`: logo ufficiale centrato e completamenti verticali sulle quattro lettere.
- `snippets/crev-logo.liquid`: vista del logo originale, condivisa fra testata e titolo; maschera opzionale per il colore arancione.
- `snippets/crev-account-avatar.liquid`, `assets/scimmia.png`: immagine personalizzata nel componente account Shopify.
- `layout/password.liquid`, `assets/crev-password.css`, `sections/main-password-header.liquid`, `templates/password.json`: pagina di lancio con logo nero, sfondo camo e riquadro arancione.
- `sections/crev-photo-hero.liquid`, `assets/section-crev-photo-hero.css`, `assets/banner.png`: foto iniziale a tutto schermo.
- `sections/crev-banner.liquid`, `assets/section-crev-banner.css`: precedente banner camouflage, rimosso dalla homepage.
- `assets/Pattern_Camo.PNG`: pattern usato nella pagina con password.
- `snippets/crev-camouflage-url.liquid`: sorgente dello sfondo della pagina con password, con `Pattern_Camo.PNG` come predefinito.
- `sections/crev-hero.liquid`: precedente sezione CREV, ancora disponibile nell’editor.
- `assets/section-crev-hero.css`: stile responsive della hero.
- `templates/index.json`: composizione della homepage.
- `config/settings_data.json`: valori iniziali di colori e carrello.
- `shopify.theme.toml`: dominio Shopify per sviluppo e caricamento in anteprima, senza credenziali.
- `sections/header-group.json`, `sections/footer-group.json`: configurazione iniziale di testata e footer.
- Le altre cartelle contengono il tema Dawn e le sue funzionalità native.

Gli aggiornamenti effettuati nell’editor Shopify possono modificare i template JSON e le impostazioni del tema. Sincronizza queste modifiche prima di caricare una versione dal repository.
