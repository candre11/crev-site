# CREV — Shopify

Tema Shopify Online Store 2.0 per il brand di abbigliamento **CREV**, con una prima impostazione **light**, minimal in beige chiaro, con testo scuro e dettagli camouflage. Negozio configurato: `s511rf-k0.myshopify.com`.

Basato sul tema ufficiale [Dawn 16.2.0](https://github.com/Shopify/dawn/tree/v16.2.0), commit `5b0862a30e0f4dd4663d685815b02192263d2efe`. La licenza originale è conservata in [LICENSE.md](LICENSE.md).

## Cosa include

- Homepage con la foto “Camerino Rustico con Scimpanzé e Maglie Appese” a tutto schermo, senza velature, e testata trasparente sovrapposta: logo CREV interattivo, scimmia account e carrello. L’inquadratura iniziale dà più spazio all’abito a sinistra. La foto si esplora in orizzontale con il dito, il trackpad, trascinando con il mouse o usando la tastiera; le maglie restano cliccabili. Le due maglie nella foto sono cliccabili: quella indossata apre Longsleeve Cream, quella appesa a destra apre Longsleeve Camo. Il footer segue direttamente la foto: la fascia prodotti è stata rimossa dalla home. Cliccando sull’abito compare “SEI SERIO?” con `scimmia.png` sotto e il banner sfocato; Esc o un clic in qualsiasi punto richiudono il messaggio, senza pulsanti di chiusura.
- Pagina **Prodotti** su `/collections/all`, con le due maglie e le schede native Shopify: immagini verticali, seconda immagine al passaggio del cursore e scelta delle varianti. Le schede arrivano a 380 px, affiancate da 600 px e in una colonna sulle finestre più strette; l’area si ferma a 1200 px. Filtri e ordinamento sono nascosti per il catalogo iniziale. Prodotti, disponibilità e immagini restano gestiti da Shopify.
- Pagine delle due maglie su sfondo crema, con foto grande a tutta larghezza e informazioni sotto, anche su desktop. Il logo nero è in alto a sinistra; a destra ci sono Home e carrello, senza hamburger o profilo. Le taglie riprendono le lettere dell’etichetta: contorno nero e riempimento nero per la selezione. Galleria, zoom, disponibilità, quantità e acquisto usano i componenti Shopify. I prodotti consigliati sono rimossi.
- Su telefono, foto, nome, prezzo e taglie rientrano nella prima schermata: l’altezza della foto si adatta allo spazio occupato dalle informazioni reali. Quantità e pulsanti di acquisto seguono sotto, raggiungibili scorrendo.
- Logo ufficiale `crev nero.png` centrato e interattivo: in homepage viene colorato crema (`#FFFDE7`), come i completamenti verticali Clothing, Rejects, Every e Verges che si rivelano passando sulle lettere. I completamenti sono più piccoli delle iniziali, ravvicinati al disegno e senza riquadro. Supporta anche tastiera e tocco, senza spostare il contenuto della pagina.
- Icona a carrello sia vuoto sia con articoli, carrello laterale e checkout Shopify.
- Suggerimento facoltativo “Perché non entrambe?” nel carrello laterale e nella pagina carrello, con il collegamento alla maglia mancante. Compare con una sola delle due maglie CREV, indipendentemente da quantità e taglie, e scompare con entrambe. “No grazie” o la chiusura del carrello lo nascondono per la sessione della scheda, anche dopo cambi quantità, ricaricamenti e passaggi tra pagine. Il checkout resta disponibile.
- Foto iniziale a tutta larghezza e alta quanto la finestra visibile, con scorrimento orizzontale indipendente dalla testata. Le pagine prodotto restano accessibili dalle maglie nella foto; catalogo e collezioni restano disponibili nei rispettivi percorsi Shopify.
- Testata con `scimmia.png` al posto dell’icona generica di accesso all’account Shopify e ingrandimento al passaggio del cursore pari al carrello (1,07×). In homepage, scimmia e carrello sono crema (`#FFFDE7`), come il logo. Menu hamburger in alto a sinistra, su desktop e mobile, con Home, Prodotti, Chi siamo e Profilo; la pagina corrente è sottolineata e ha `aria-current="page"`. Profilo usa la scimmia e apre l’account Shopify. La ricerca resta nascosta e riattivabile nell’editor. Il menu classico può essere ripristinato disattivando “Usa le voci del menu CREV”.
- Pagina **Chi siamo** già raggiungibile dal menu, con logo CREV e testo iniziale modificabile, basato solo su nome e identità del brand.
- Layout responsive e traduzioni italiane già presenti in Dawn. Palette crema `#FFFDE7`, verde militare `#777d5a` e arancione.
- Footer camouflage con il file originale `Pattern_Camo.PNG` e testi arancioni (`#ed8b3a`). In alto ha due colonne: Social (Instagram, TikTok, YouTube) e Help (Contattaci, Spedizioni e resi), per ora come testo senza collegamenti. In basso a sinistra mantiene il campo email e “iscriviti alla newsletter”, seguiti da copyright, Powered by Shopify e informative. Logo C, selettori e icone di pagamento restano nascosti. Il modulo newsletter e i collegamenti alle informative pubblicate su Shopify sono attivi.
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
3. Nella sezione **CREV — Foto fullscreen**, puoi selezionare i prodotti Cream e Camo e regolare il focus orizzontale iniziale. Sono già selezionati i prodotti `cream-tribe-longsleeve` e `tribe-longsleeve-camo`, usati anche come predefiniti se i selettori sono vuoti. Il campo “Link diretto Cream” è impostato su `/products/cream-tribe-longsleeve` e prevale sul selettore del prodotto, mantenendo la navigazione nello stesso dominio dell’anteprima. La testata è sovrapposta solo in homepage e mantiene il normale comportamento sulle altre pagine.
4. Il menu CREV è già configurato. Per collegare una pagina Chi siamo esistente, selezionala nelle impostazioni della testata in “Pagina Chi siamo”; altrimenti viene usata la vista Chi siamo inclusa nel tema. I collegamenti alle informative del footer dipendono dalle pagine pubblicate su Shopify.
5. Configura pagamenti, spedizioni e informative nel pannello Shopify. Verifica un ordine di prova prima di pubblicare.

## Menu e pagine

Il menu CREV riusa il cassetto nativo Dawn, con apertura a tutte le larghezze, blocco dello scorrimento, gestione del focus, chiusura con l’hamburger o Esc. La scimmia nel menu ha una maschera SVG distinta da quella nella testata, per evitare identificatori duplicati.

Sulle pagine prodotto la testata mostra invece il logo nero a sinistra e Home e carrello a destra. Il template prodotto predefinito, condiviso da Cream e Camo, abilita “Foto a tutto schermo e taglie CREV”. La foto mantiene le proporzioni senza ritagliare il capo; la galleria scorre in orizzontale a tutte le larghezze e conserva lo zoom nativo. Nome, prezzo e taglie compongono il riepilogo; quantità, acquisto e descrizione seguono sotto. `crev-product-viewport.js` misura il riepilogo con `ResizeObserver`: su mobile la foto usa lo spazio residuo della prima schermata (`100svh`), tenendo conto dell’altezza della testata e dei cambi di variante. La sezione “You may also like” è rimossa dal template.

Le opzioni chiamate Taglia/Taglie, Size, Misura o Dimensione, oppure con valori standard come S/M/L/XL, usano i PNG originali `S vuota.png`, `M vuota.png`, `L vuota.png`, `XL vuota.png`. Quando una taglia è selezionata, viene mostrato il corrispondente file “a mano” al posto della versione vuota. `snippets/crev-size-letter.liquid` allinea i margini trasparenti in viste SVG: i file originali non vengono modificati o ricalcati. Entrambi gli stati sono caricati insieme, per evitare attese al primo clic, e occupano lo stesso spazio. L’altezza grafica è 24 px, con proporzioni relative delle lettere conservate e aree da toccare di almeno 44 × 44 px. Il cambio segue i radio button Shopify, inclusa la variante iniziale disponibile; tornando a un’altra taglia, la precedente mostra di nuovo l’immagine vuota. Le taglie esaurite sono attenuate e barrate; il componente Shopify mantiene lo stato del pulsante di acquisto e l’identificativo della variante nel modulo. Per eventuali taglie aggiuntive prive di PNG rimane il riferimento grafico precedente in `crev-size-letter-fallback.liquid`. Le altre opzioni conservano il selettore nativo. Le varianti effettive vanno create nel pannello Prodotti di Shopify: il tema non inventa taglie o scorte.

Nel carrello il suggerimento confronta la presenza dei due handle prodotto, senza contare le righe o le quantità. È inserito nelle regioni native aggiornate via Ajax, quindi si aggiorna dopo aggiunte, rimozioni e cambi quantità. Il suggerimento copre e sfoca il carrello con “Sappiamo che le vuoi entrambe” e la scimmia originale. Il link sulla scimmia apre l’altra maglia per scegliere la taglia, senza aggiunte automatiche. Un clic in qualsiasi altro punto o Esc chiude solo il suggerimento, senza attivare i comandi sottostanti; anche il clic sulla scimmia e la chiusura del carrello lo segnano come ignorato. La preferenza è conservata in `sessionStorage`, con memoria nella pagina come ripiego se lo storage non è disponibile. Senza JavaScript il suggerimento resta nascosto e il carrello rimane utilizzabile. Le istanze della pagina carrello e del pannello condividono la preferenza. Durante questa sovrapposizione e quella “SEI SERIO?” il cursore diventa una X, con contorno chiaro per restare visibile sullo sfondo; torna normale alla chiusura.

## Personalizzazione della pagina prodotto

Nel tema si modificano disposizione, dimensione delle foto, colori, font, animazioni, testata, stile dei selettori, descrizioni aggiuntive e suggerimenti nel carrello. Nome del prodotto, foto, prezzo, descrizione, varianti e disponibilità vengono dal pannello **Shopify → Prodotti**.

“Aggiungi al carrello” è un pulsante del tema. Il pulsante accelerato “Acquista con Shop” è gestito da Shopify: possiamo mostrarlo, nasconderlo e posizionarlo, ma logo, testo e colori del marchio di pagamento hanno vincoli. Il metodo mostrato dipende dai pagamenti attivi e dal cliente; non è garantito che sia sempre Shop Pay. Il checkout ha un editor e limiti propri, distinti dal tema. Riferimenti: [pulsanti accelerati](https://help.shopify.com/en/manual/online-store/dynamic-checkout/customize-button), [stile del checkout](https://help.shopify.com/en/manual/checkout-settings/customize-checkout-configurations/checkout-style).

**Prodotti** usa il percorso Shopify già esistente `/collections/all`: non occorre creare una pagina o una collezione aggiuntiva. Il titolo è “Prodotti”; la griglia mostra i prodotti pubblicati del catalogo, attualmente Cream e Camo.

**Chi siamo** usa `templates/index.chi-siamo.json`, una vista alternativa nativa Shopify raggiungibile su `/?view=chi-siamo`. È una pagina completa con risposta normale del tema, non una pagina 404 adattata. Questa soluzione la rende subito navigabile senza richiedere un nuovo record Pagina nel pannello Shopify. Titolo, logo, intestazione, voce corrente e URL canonico sono gestiti separatamente dalla home. Il testo iniziale si modifica nel file del template o nella sezione “CREV — Chi siamo” dell’editor. Si può passare a un normale percorso `/pages/...` scegliendo una Pagina Shopify già creata nel campo “Pagina Chi siamo” della testata. Riferimento: [template alternativi Shopify](https://shopify.dev/docs/storefronts/themes/architecture/templates/alternate-templates).

## Immagini e identità visiva

La foto iniziale usa il file originale `assets/banner-camerino-rustico.png`, con proporzioni conservate e riempimento della finestra. Il punto di ritaglio orizzontale iniziale al 28% sposta l’inquadratura verso l’abito a sinistra; nelle finestre strette entrambi i soggetti possono essere visibili parzialmente. Il focus iniziale si regola nell’editor della sezione. Lo scorrimento orizzontale permette poi di esplorare tutta la larghezza della foto, mantenendo la pagina scorribile in verticale. Il trascinamento con il mouse distingue gli spostamenti dai clic sui prodotti. La tastiera usa le frecce orizzontali e Home/End quando il riquadro della foto è selezionato; il ridimensionamento conserva la posizione relativa raggiunta. Foto e sagome cliccabili condividono lo stesso piano, così restano allineate a qualsiasi dimensione. I link usano gli URL dei due prodotti Shopify forniti, con supporto ai percorsi localizzati. I selettori della sezione consentono di sostituire in futuro le destinazioni. Un prodotto mancante non genera collegamenti vuoti; per la Cream è disponibile anche il collegamento diretto configurato nell’editor. I collegamenti sulle maglie sono normali link HTML, con SVG decorativi per evidenziarne le sagome al passaggio del cursore o con la tastiera. Il banner non contiene pulsanti aggiuntivi in fondo alla foto. L’abito ha un pulsante trasparente sulla sua sagoma: apre un dialogo nativo con “SEI SERIO?” e la scimmia, sfocando foto e testata e bloccando lo scorrimento della pagina fino alla chiusura. Il dialogo si chiude con Esc oppure facendo clic sul contenuto o sullo sfondo; il focus torna all’abito. Anche nelle finestre strette, la maglia camo si raggiunge scorrendo la foto verso destra; passando al collegamento con la tastiera viene portata in vista. Il vecchio `assets/banner.png` resta disponibile per utilizzi futuri. La testata della home è trasparente, resta ferma durante il movimento orizzontale della foto e segue la pagina nello scorrimento verticale; account e carrello conservano i componenti Shopify. Il camouflage resta sulla pagina con password. La testata usa il logo originale `assets/crev nero.png`, con quattro aree interattive allineate alle lettere. Il PNG è conservato integro: il ritaglio dei soli margini trasparenti è gestito nella vista SVG.

Per le nuove immagini, usa nomi con lettere senza accenti, numeri e trattini, ad esempio `banner-camerino-rustico.png`, per evitare il rifiuto del file da parte di Shopify.

I testi del sito usano Roboto Bold (peso 700), in maiuscolo, come alternativa gratuita a Helvetica Neue LT Pro 65 Medium. I file WOFF2 originali `assets/roboto-bold-latin.woff2` e `assets/roboto-bold-latin-ext.woff2` provengono da Google Fonts, progetto [Roboto](https://github.com/googlefonts/roboto-3-classic), con licenza SIL Open Font License conservata in `licenses/Roboto-OFL.txt`. Le due parti coprono il latino e il latino esteso, inclusi accenti e simbolo euro. `snippets/crev-fonts.liquid` registra il font in entrambi i layout: viene servito dagli assets Shopify, senza richieste a Google Fonts o ad altri servizi di font. Helvetica Neue/Helvetica/Arial sono i fallback durante il caricamento. Il beige di base è `#FFFDE7`; foto, loghi, disegni delle taglie e pattern rimangono le immagini originali. La famiglia è centralizzata nella variabile `--crev-label-font-family`; nella finestra account viene applicata tramite le variabili ufficiali Shopify per titoli e testo, senza cambiare riquadri o colori.

L’icona della voce “Profilo” dentro la finestra account è gestita da Shopify e non ha un punto di personalizzazione pubblico: il componente espone lo slot dell’avatar esterno, non le icone dei collegamenti interni. Riferimento: [API shopify-account](https://shopify.dev/docs/api/storefront-web-components/components/shopify-account).

Per cambiare il camouflage dello sfondo della pagina con password:

1. Avvia `npm run dev:editor` e apri il link dell’editor del tema mostrato dalla CLI.
2. Vai in **Impostazioni tema → Camouflage CREV → Immagine camouflage**.
3. Carica o seleziona l’immagine e salva: viene usata come sfondo della pagina con password, senza cambiare la foto della home o i loghi ufficiali.

In assenza di una selezione, lo sfondo usa `assets/Pattern_Camo.PNG`. Il testo della pagina si modifica nella sezione “Banner di iscrizione email” dell’editor password; il blocco paragrafo include l’opzione “Mostra la stampa CREV alla fine del testo”. La modalità `dev:editor` riporta nei file locali le modifiche fatte nell’editor Shopify; salva queste modifiche prima di sincronizzare ulteriori aggiornamenti Git.

## Struttura

- `assets/crev-theme.css`: identità visiva, menu, testata e griglia della pagina Prodotti.
- `snippets/crev-navigation.liquid`: menu CREV con pagina corrente e collegamento al profilo.
- `templates/collection.json`, `sections/main-collection-banner.liquid`: pagina Prodotti.
- `templates/index.chi-siamo.json`, `sections/crev-about.liquid`: pagina Chi siamo con testo modificabile.
- `templates/product.json`, `assets/crev-product.css`, `snippets/crev-size-letter.liquid`: pagine delle maglie con foto grande, modulo nativo e taglie dell’etichetta.
- `assets/crev-product-viewport.js`: adattamento della prima schermata mobile alle informazioni del prodotto.
- `snippets/crev-cart-pair.liquid`, `assets/crev-cart-pair.css`, `assets/crev-cart-pair.js`: suggerimento dell’altra maglia nel carrello e chiusura ricordata nella sessione.
- `sections/footer.liquid`, `assets/crev-footer.css`: footer camo con testi arancioni, colonne Social e Help e newsletter sopra le diciture finali. Il file `assets/c nera.png` è conservato per utilizzi futuri.
- `snippets/crev-header-brand.liquid`, `snippets/crev-acronym.liquid`, `assets/crev-acronym.js`, `assets/crev nero.png`: logo ufficiale centrato e completamenti verticali sulle quattro lettere.
- `snippets/crev-logo.liquid`: vista del logo originale, condivisa fra testata e titolo; maschera opzionale per il colore arancione.
- `snippets/crev-account-avatar.liquid`, `assets/scimmia.png`: immagine personalizzata nel componente account Shopify.
- `layout/password.liquid`, `assets/crev-password.css`, `sections/main-password-header.liquid`, `templates/password.json`: pagina di lancio con logo nero, sfondo camo e riquadro arancione.
- `sections/crev-photo-hero.liquid`, `assets/section-crev-photo-hero.css`, `assets/crev-photo-pan.js`: foto iniziale a tutto schermo, focus regolabile, scorrimento orizzontale e collegamenti sulle maglie.
- `sections/crev-banner.liquid`, `assets/section-crev-banner.css`: precedente banner camouflage, rimosso dalla homepage.
- `assets/Pattern_Camo.PNG`: pattern usato nel footer e nella pagina con password.
- `snippets/crev-camouflage-url.liquid`: sorgente dello sfondo della pagina con password, con `Pattern_Camo.PNG` come predefinito.
- `sections/crev-hero.liquid`: precedente sezione CREV, ancora disponibile nell’editor.
- `assets/section-crev-hero.css`: stile responsive della hero.
- `templates/index.json`: composizione della homepage.
- `config/settings_data.json`: valori iniziali di colori e carrello.
- `shopify.theme.toml`: dominio Shopify per sviluppo e caricamento in anteprima, senza credenziali.
- `sections/header-group.json`, `sections/footer-group.json`: configurazione iniziale di testata e footer.
- Le altre cartelle contengono il tema Dawn e le sue funzionalità native.

Gli aggiornamenti effettuati nell’editor Shopify possono modificare i template JSON e le impostazioni del tema. Sincronizza queste modifiche prima di caricare una versione dal repository.
