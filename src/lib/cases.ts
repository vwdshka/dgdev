// Case studies, one per project that has a `slug` in content.ts. Written from each repo's README
// and code; numbers and claims here should always be checkable in the repo.

import type { T } from "./i18n";

export type Case = {
  slug: string;
  tagline: T;
  problem: T[];
  /** Columns of boxes, read left to right; arrows go between columns. */
  diagram: (string | T)[][];
  diagramNote: T;
  hard: { title: T; body: T }[];
  decisions: { title: T; body: T }[];
  notYet: T[];
};

export const cases: Case[] = [
  {
    slug: "ixnos-data",
    tagline: {
      en: "Where does the money go? Greek public spending, searchable in Greek or Greeklish.",
      el: "Πού πάνε τα λεφτά; Οι ελληνικές δημόσιες δαπάνες, με αναζήτηση στα ελληνικά ή σε greeklish.",
    },
    problem: [
      {
        en: "Tenders (ΚΗΜΔΗΣ) and spending decisions (Διαύγεια) are already public, but they're hard to search, written in dense administrative Greek, and pushed to nobody. A small business has no easy way to learn that a nearby authority just posted a tender for what it sells.",
        el: "Οι διαγωνισμοί (ΚΗΜΔΗΣ) και οι αποφάσεις δαπανών (Διαύγεια) είναι ήδη δημόσιοι, αλλά δύσκολα αναζητούνται, είναι γραμμένοι σε πυκνά διοικητικά ελληνικά και δεν φτάνουν σε κανέναν. Μια μικρή επιχείρηση δεν έχει εύκολο τρόπο να μάθει ότι μια κοντινή αρχή μόλις δημοσίευσε διαγωνισμό για αυτό που πουλάει.",
      },
      {
        en: "Paid aggregators exist. I wanted a free, open-source one with a public API, that reads both sources and links a tender to its award, contract and payment.",
        el: "Υπάρχουν επί πληρωμή συλλέκτες. Ήθελα έναν δωρεάν, ανοιχτού κώδικα, με δημόσιο API, που διαβάζει και τις δύο πηγές και συνδέει έναν διαγωνισμό με την κατακύρωση, τη σύμβαση και την πληρωμή του.",
      },
    ],
    diagram: [
      ["ΚΗΜΔΗΣ API", "Διαύγεια API"],
      [{ en: "Python ingestion", el: "Εισαγωγή σε Python" }],
      ["PostgreSQL 16"],
      [".NET 10 API", { en: ".NET notifier", el: "Ειδοποιήσεις .NET" }],
      [{ en: "Next.js web app", el: "Web app σε Next.js" }, { en: "Email digests", el: "Συνόψεις email" }, { en: "Public API", el: "Δημόσιο API" }],
    ],
    diagramNote: {
      en: "Four services share one PostgreSQL database and nothing else, so each can fail and deploy on its own. The pipeline fetches, validates and upserts; the API reads with hand-written SQL for search and EF Core for writes; the notifier is a one-shot process run by cron, so a mail outage can never take the site down.",
      el: "Τέσσερις υπηρεσίες μοιράζονται μία βάση PostgreSQL και τίποτε άλλο, οπότε η καθεμία μπορεί να πέσει και να γίνει deploy μόνη της. Το pipeline φέρνει, ελέγχει και κάνει upsert· το API διαβάζει με χειρόγραφο SQL για την αναζήτηση και EF Core για τις εγγραφές· οι ειδοποιήσεις είναι μια διεργασία μίας εκτέλεσης από το cron, οπότε μια βλάβη στο email δεν μπορεί ποτέ να ρίξει το site.",
    },
    hard: [
      {
        title: { en: "Greek search that forgives people", el: "Ελληνική αναζήτηση που συγχωρεί" },
        body: {
          en: "People type «καθαρισμος», «katharismos» or «κλιματηστικών». One normaliser, shared by Python and .NET and tested against the same cases, folds accents, final sigma and Latin look-alike letters. PostgreSQL full-text search with a Greek stemmer handles word forms, trigram similarity handles typos, and phonetic keys handle Greeklish. A set of 56 real queries scores precision@10 of 0.84–1.00, and deploys fail if it drops.",
          el: "Ο κόσμος γράφει «καθαρισμος», «katharismos» ή «κλιματηστικών». Ένας κοινός normaliser για Python και .NET, δοκιμασμένος στα ίδια παραδείγματα, ενοποιεί τόνους, τελικό σίγμα και λατινικά γράμματα που μοιάζουν με ελληνικά. Η αναζήτηση πλήρους κειμένου της PostgreSQL με ελληνικό stemmer καλύπτει τις κλίσεις, η ομοιότητα trigram τα ορθογραφικά λάθη και τα φωνητικά κλειδιά τα greeklish. Ένα σύνολο 56 πραγματικών ερωτημάτων πετυχαίνει precision@10 από 0,84 έως 1,00, και το deploy αποτυγχάνει αν πέσει.",
        },
      },
      {
        title: { en: "Two sources, the same money, described differently", el: "Δύο πηγές, ίδια χρήματα, διαφορετική περιγραφή" },
        body: {
          en: "ΚΗΜΔΗΣ states amounts without VAT, Διαύγεια with VAT, and Διαύγεια awards restate ΚΗΜΔΗΣ ones. The two are kept apart, labelled, and joined by VAT number instead of added up. Corrections in Διαύγεια point to the decision they replace by an internal version ID rather than its public number, and the pipeline resolves that in either arrival order.",
          el: "Το ΚΗΜΔΗΣ δίνει ποσά χωρίς ΦΠΑ, η Διαύγεια με ΦΠΑ, και οι κατακυρώσεις της Διαύγειας επαναλαμβάνουν αυτές του ΚΗΜΔΗΣ. Τα δύο κρατιούνται χωριστά, με ετικέτα, και συνδέονται μέσω ΑΦΜ αντί να αθροίζονται. Οι διορθώσεις στη Διαύγεια δείχνουν την απόφαση που αντικαθιστούν με ένα εσωτερικό ID έκδοσης και όχι με τον δημόσιο αριθμό της, και το pipeline το επιλύει με όποια σειρά κι αν φτάσουν.",
        },
      },
      {
        title: { en: "Measuring before modelling", el: "Μέτρηση πριν από τη μοντελοποίηση" },
        body: {
          en: "Before any schema, probes pulled six months of ΚΗΜΔΗΣ and three weeks of Διαύγεια: 614,000 records. That's how I learned that titles are cut at 100 characters, that the place of work differs from the authority's address on 15% of notices, that ΚΗΜΔΗΣ answers 404 for days with no records yet, and that some payments are typos over €100 million.",
          el: "Πριν από οποιοδήποτε σχήμα, δοκιμαστικές λήψεις έφεραν έξι μήνες ΚΗΜΔΗΣ και τρεις εβδομάδες Διαύγειας: 614.000 εγγραφές. Έτσι έμαθα ότι οι τίτλοι κόβονται στους 100 χαρακτήρες, ότι ο τόπος εκτέλεσης διαφέρει από τη διεύθυνση της αρχής στο 15% των προκηρύξεων, ότι το ΚΗΜΔΗΣ απαντά 404 για μέρες χωρίς ακόμα εγγραφές, και ότι κάποιες πληρωμές είναι τυπογραφικά λάθη άνω των 100 εκατ. €.",
        },
      },
      {
        title: { en: "Alerts that never double-send", el: "Ειδοποιήσεις που δεν στέλνονται ποτέ δύο φορές" },
        body: {
          en: "The digest records its deliveries and its checkpoint before sending, so a crash or a rerun can miss at most one email and never repeats one. Sign-in is by emailed link, and only hashes of link, session and API-key tokens are stored.",
          el: "Η σύνοψη καταγράφει τις αποστολές και το checkpoint της πριν στείλει, οπότε μια κατάρρευση ή μια επανεκτέλεση μπορεί να χάσει το πολύ ένα email και ποτέ να μην επαναλάβει κάποιο. Η σύνδεση γίνεται με σύνδεσμο μέσω email, και αποθηκεύονται μόνο hashes των tokens συνδέσμων, συνεδριών και κλειδιών API.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "The database is the only integration point", el: "Η βάση είναι το μόνο σημείο ενοποίησης" },
        body: {
          en: "No message bus and no service-to-service calls. It costs some flexibility, but four processes that only share a schema are easy to reason about and run fine on one machine.",
          el: "Χωρίς message bus και χωρίς κλήσεις μεταξύ υπηρεσιών. Κοστίζει λίγη ευελιξία, αλλά τέσσερις διεργασίες που μοιράζονται μόνο ένα σχήμα είναι εύκολες στην κατανόηση και τρέχουν άνετα σε ένα μηχάνημα.",
        },
      },
      {
        title: { en: "Privacy by construction", el: "Ιδιωτικότητα από τον σχεδιασμό" },
        body: {
          en: "Public records name sole traders. They appear on the records they're in, never on a page of their own; the API never returns contractor VAT numbers, and the bulk exports carry no contractor data at all.",
          el: "Τα δημόσια αρχεία αναφέρουν ονόματα ατομικών επιχειρήσεων. Εμφανίζονται στις εγγραφές όπου υπάρχουν, ποτέ σε δική τους σελίδα· το API δεν επιστρέφει ποτέ ΑΦΜ αναδόχων, και οι μαζικές εξαγωγές δεν περιέχουν καθόλου στοιχεία αναδόχων.",
        },
      },
      {
        title: { en: "A static edition with no server", el: "Στατική έκδοση χωρίς server" },
        body: {
          en: "Every three hours a GitHub Actions workflow restores an encrypted working database, fetches new records with the same pipeline, and writes the site as plain files. Alerts become RSS feeds and there's no API, but search, organisation pages and signals all work.",
          el: "Κάθε τρεις ώρες ένα workflow του GitHub Actions επαναφέρει μια κρυπτογραφημένη βάση εργασίας, φέρνει νέες εγγραφές με το ίδιο pipeline και γράφει το site ως απλά αρχεία. Οι ειδοποιήσεις γίνονται RSS feeds και δεν υπάρχει API, αλλά η αναζήτηση, οι σελίδες φορέων και τα σήματα λειτουργούν κανονικά.",
        },
      },
      {
        title: { en: "Neutral signals, not accusations", el: "Ουδέτερα σήματα, όχι κατηγορίες" },
        body: {
          en: "A competitive tender with a single offer, or a direct award just under the legal limit, is marked as worth a second look, with no verdict attached. The reader draws the conclusion.",
          el: "Ένας ανταγωνιστικός διαγωνισμός με μία μόνο προσφορά, ή μια απευθείας ανάθεση λίγο κάτω από το νόμιμο όριο, σημειώνεται ως κάτι που αξίζει δεύτερη ματιά, χωρίς ετυμηγορία. Το συμπέρασμα το βγάζει ο αναγνώστης.",
        },
      },
    ],
    notYet: [
      {
        en: "The full version, with accounts, email alerts and API keys, is built and tested end to end but not deployed yet; the static edition is what's live.",
        el: "Η πλήρης έκδοση, με λογαριασμούς, ειδοποιήσεις email και κλειδιά API, είναι έτοιμη και δοκιμασμένη από άκρη σε άκρη αλλά δεν έχει γίνει ακόμα deploy· αυτό που τρέχει είναι η στατική έκδοση.",
      },
      {
        en: "The name may still change before launch.",
        el: "Το όνομα μπορεί ακόμα να αλλάξει πριν το λανσάρισμα.",
      },
    ],
  },
  {
    slug: "mydata-client-lib",
    tagline: {
      en: "Catch AADE's rejections on your own machine, before the request ever leaves it.",
      el: "Πιάστε τις απορρίψεις της ΑΑΔΕ στον δικό σας υπολογιστή, πριν φύγει καν το αίτημα.",
    },
    problem: [
      {
        en: "myDATA's SendInvoices endpoint enforces a long list of business rules (gross, net and tax arithmetic, line-to-summary totals, forbidden fields, VAT exemption codes) but only checks them after the request reaches AADE. A batch of 100 invoices can come back as 200 OK carrying 97 acceptances and 3 rejections, so a naive integration either treats every 200 as success or hand-parses the error list.",
        el: "Το endpoint SendInvoices του myDATA επιβάλλει μια μακριά λίστα επιχειρησιακών κανόνων (αριθμητική μικτού, καθαρού και φόρου, σύνολα γραμμών προς σύνοψη, απαγορευμένα πεδία, κωδικούς απαλλαγής ΦΠΑ), αλλά τους ελέγχει μόνο αφού το αίτημα φτάσει στην ΑΑΔΕ. Μια παρτίδα 100 παραστατικών μπορεί να γυρίσει 200 OK με 97 αποδοχές και 3 απορρίψεις, οπότε μια αφελής ενσωμάτωση είτε θεωρεί κάθε 200 επιτυχία είτε αναλύει με το χέρι τη λίστα σφαλμάτων.",
      },
      {
        en: "On top of that, the wire format is XML generated from XSDs that change with each spec revision, and none of it is exposed as a clean, typed surface.",
        el: "Επιπλέον, η μορφή στο δίκτυο είναι XML παραγόμενο από XSD που αλλάζουν με κάθε αναθεώρηση των προδιαγραφών, και τίποτα από αυτά δεν εκτίθεται ως καθαρή, typed επιφάνεια.",
      },
    ],
    diagram: [
      [{ en: "Your application", el: "Η εφαρμογή σας" }],
      ["InvoiceValidator"],
      [{ en: "Mapping layer", el: "Επίπεδο αντιστοίχισης" }],
      [{ en: "Generated XSD models", el: "Παραγόμενα μοντέλα XSD" }],
      ["MyDataClient"],
      ["AADE myDATA API"],
    ],
    diagramNote: {
      en: "Three layers, one direction. Generated/ comes from the official XSDs and never leaves the library as a public type; Mapping/ translates it into the hand-written models; Http/ only ever talks to those models. A schema regeneration changes Generated/, Mapping/ absorbs it, and the public API doesn't move.",
      el: "Τρία επίπεδα, μία κατεύθυνση. Το Generated/ προέρχεται από τα επίσημα XSD και δεν βγαίνει ποτέ από τη βιβλιοθήκη ως δημόσιος τύπος· το Mapping/ το μεταφράζει στα χειρόγραφα μοντέλα· το Http/ μιλά μόνο με αυτά τα μοντέλα. Μια αναπαραγωγή του σχήματος αλλάζει το Generated/, το Mapping/ την απορροφά, και το δημόσιο API δεν κουνιέται.",
    },
    hard: [
      {
        title: { en: "Partial success inside a 200", el: "Μερική επιτυχία μέσα σε ένα 200" },
        body: {
          en: "Business errors come back as data, per invoice, matched to the caller's input. Only transport failures (401, network errors, timeouts) throw. Treating a mixed 200 as an exception would make every caller unpack the same body twice.",
          el: "Τα επιχειρησιακά σφάλματα επιστρέφονται ως δεδομένα, ανά παραστατικό, αντιστοιχισμένα με την είσοδο του καλούντος. Εξαίρεση πετούν μόνο τα σφάλματα μεταφοράς (401, σφάλματα δικτύου, timeouts). Αν ένα μικτό 200 γινόταν εξαίρεση, κάθε καλών θα έπρεπε να ξεπακετάρει το ίδιο σώμα δύο φορές.",
        },
      },
      {
        title: { en: "Reproducing AADE's rules", el: "Αναπαραγωγή των κανόνων της ΑΑΔΕ" },
        body: {
          en: "The validator reproduces error codes 203, 207–210, 217, 219, 220, 261, 265 and 306, so a bad batch fails in milliseconds on your machine instead of round-tripping to the sandbox to find out.",
          el: "Ο validator αναπαράγει τους κωδικούς σφάλματος 203, 207–210, 217, 219, 220, 261, 265 και 306, οπότε μια λάθος παρτίδα αποτυγχάνει σε χιλιοστά του δευτερολέπτου στον υπολογιστή σας αντί να κάνει τον γύρο μέχρι το sandbox για να το μάθει.",
        },
      },
      {
        title: { en: "A boundary XmlSerializer won't enforce", el: "Ένα όριο που το XmlSerializer δεν επιβάλλει" },
        body: {
          en: "XmlSerializer refuses to serialise internal types, even with InternalsVisibleTo, so the generated types have to be public. The boundary is enforced another way: every mapping class is internal, and no HTTP method accepts or returns a generated type.",
          el: "Το XmlSerializer αρνείται να σειριοποιήσει internal τύπους, ακόμα και με InternalsVisibleTo, οπότε οι παραγόμενοι τύποι πρέπει να είναι public. Το όριο επιβάλλεται αλλιώς: κάθε κλάση αντιστοίχισης είναι internal, και καμία μέθοδος HTTP δεν δέχεται ούτε επιστρέφει παραγόμενο τύπο.",
        },
      },
      {
        title: { en: "Greek encodings and two kinds of paging", el: "Ελληνικές κωδικοποιήσεις και δύο είδη σελιδοποίησης" },
        body: {
          en: "UID computation needs ISO-8859-7, which .NET doesn't register by default, and document retrieval pages through two independent mechanisms: a mark watermark and a separate continuation token.",
          el: "Ο υπολογισμός του UID χρειάζεται ISO-8859-7, που το .NET δεν καταχωρεί από προεπιλογή, και η ανάκτηση παραστατικών σελιδοποιείται με δύο ανεξάρτητους μηχανισμούς: ένα όριο mark και ένα ξεχωριστό continuation token.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "UID computation stays opt-in", el: "Ο υπολογισμός UID είναι προαιρετικός" },
        body: {
          en: "The documented SHA-1 algorithm is implemented but never called automatically, since its exact field format hasn't been checked against a real AADE-computed value. AADE assigns the UID itself when it's left out.",
          el: "Ο τεκμηριωμένος αλγόριθμος SHA-1 υλοποιείται αλλά δεν καλείται ποτέ αυτόματα, αφού η ακριβής μορφή των πεδίων του δεν έχει ελεγχθεί απέναντι σε πραγματική τιμή της ΑΑΔΕ. Όταν παραλείπεται, το UID το αποδίδει η ίδια η ΑΑΔΕ.",
        },
      },
      {
        title: { en: "Four tiers of tests", el: "Τέσσερα επίπεδα tests" },
        body: {
          en: "Unit tests with no I/O, golden-file snapshots of the mapped XML, contract tests replaying captured sandbox responses through WireMock.Net, and live sandbox calls that skip rather than fail when credentials are missing.",
          el: "Unit tests χωρίς I/O, golden-file snapshots του XML που παράγεται, contract tests που αναπαράγουν καταγεγραμμένες απαντήσεις του sandbox μέσω WireMock.Net, και πραγματικές κλήσεις στο sandbox που παραλείπονται αντί να αποτυγχάνουν όταν λείπουν διαπιστευτήρια.",
        },
      },
      {
        title: { en: "Credentials never live in files", el: "Τα διαπιστευτήρια δεν μπαίνουν ποτέ σε αρχεία" },
        body: {
          en: "Sandbox keys come from environment variables or user-secrets, never from appsettings.json or a tracked .http file.",
          el: "Τα κλειδιά του sandbox έρχονται από μεταβλητές περιβάλλοντος ή user-secrets, ποτέ από το appsettings.json ή από αρχείο .http που παρακολουθεί το git.",
        },
      },
    ],
    notYet: [
      {
        en: "Schema coupling is the known cost: each AADE schema revision means regenerating and re-verifying the models.",
        el: "Η σύζευξη με το σχήμα είναι το γνωστό κόστος: κάθε αναθεώρηση σχήματος της ΑΑΔΕ σημαίνει αναπαραγωγή και εκ νέου επαλήθευση των μοντέλων.",
      },
      {
        en: "UID computation stays opt-in until it's checked against a real AADE value.",
        el: "Ο υπολογισμός UID μένει προαιρετικός μέχρι να ελεγχθεί απέναντι σε πραγματική τιμή της ΑΑΔΕ.",
      },
    ],
  },
  {
    slug: "tabsesh",
    tagline: {
      en: "Sixty tabs, one undoable command.",
      el: "Εξήντα καρτέλες, μία εντολή που αναιρείται.",
    },
    problem: [
      {
        en: "I kept ending up with 60+ tabs across three windows. Most tab managers are either a bookmarks-bar clone or a subscription with a login screen.",
        el: "Κατέληγα συνεχώς με 60+ καρτέλες σε τρία παράθυρα. Οι περισσότεροι tab managers είναι είτε αντίγραφο της γραμμής σελιδοδεικτών είτε συνδρομή με οθόνη σύνδεσης.",
      },
      {
        en: "I wanted something that keeps everything in the browser's own bookmarks, works from the keyboard, and never quietly does something destructive: closing 40 tabs should be undoable, not a gamble.",
        el: "Ήθελα κάτι που κρατά τα πάντα στους σελιδοδείκτες του ίδιου του browser, δουλεύει από το πληκτρολόγιο και δεν κάνει ποτέ σιωπηλά κάτι καταστροφικό: το κλείσιμο 40 καρτελών πρέπει να αναιρείται, όχι να είναι στοίχημα.",
      },
    ],
    diagram: [
      ["Popup", { en: "Full-page app", el: "Εφαρμογή πλήρους σελίδας" }, { en: "Quick overlay", el: "Γρήγορο overlay" }],
      ["src/lib/core"],
      ["chrome.bookmarks", "tabs · tabGroups · alarms", "chrome.storage.local"],
    ],
    diagramNote: {
      en: "Every entry point calls the same functions in src/lib/core, which has no Svelte in it at all. A bug fixed there is fixed in the GUI and the terminal at once, and neither can drift out of sync with the other.",
      el: "Κάθε σημείο εισόδου καλεί τις ίδιες συναρτήσεις στο src/lib/core, που δεν έχει καθόλου Svelte. Ένα bug που διορθώνεται εκεί διορθώνεται ταυτόχρονα στο GUI και στο τερματικό, και κανένα από τα δύο δεν μπορεί να αποσυγχρονιστεί από το άλλο.",
    },
    hard: [
      {
        title: { en: "Timers that survive the service worker", el: "Χρονόμετρα που επιβιώνουν τον service worker" },
        body: {
          en: "A Manifest V3 service worker can be killed at any moment, and a setTimeout dies with it. Focus sessions use chrome.alarms, the one timer that survives a restart, so a 25-minute session still fires.",
          el: "Ένας service worker του Manifest V3 μπορεί να τερματιστεί ανά πάσα στιγμή, και ένα setTimeout πεθαίνει μαζί του. Οι συνεδρίες συγκέντρωσης χρησιμοποιούν το chrome.alarms, το μόνο χρονόμετρο που επιβιώνει την επανεκκίνηση, οπότε μια συνεδρία 25 λεπτών ολοκληρώνεται κανονικά.",
        },
      },
      {
        title: { en: "Testing APIs nobody fakes", el: "Tests για APIs που δεν τα προσομοιώνει κανείς" },
        body: {
          en: "The fake extension APIs WXT recommends don't implement bookmarks or tabGroups at all, since most extensions never touch them. I wrote a small in-memory fake for just those two, built around what the code actually calls.",
          el: "Τα ψεύτικα APIs επεκτάσεων που προτείνει το WXT δεν υλοποιούν καθόλου bookmarks ή tabGroups, αφού οι περισσότερες επεκτάσεις δεν τα αγγίζουν. Έγραψα ένα μικρό fake στη μνήμη μόνο για αυτά τα δύο, φτιαγμένο γύρω από όσα πραγματικά καλεί ο κώδικας.",
        },
      },
      {
        title: { en: "Two bugs caught before release", el: "Δύο bugs πριν την κυκλοφορία" },
        body: {
          en: "The 73 tests caught undoLastDelete restoring the wrong folder when two deletions landed in the same millisecond, fixed with a stable tie-break, and a bug in fake-browser itself, where tabs.remove() looked up a window by the tab's own id.",
          el: "Τα 73 tests έπιασαν το undoLastDelete να επαναφέρει λάθος φάκελο όταν δύο διαγραφές έπεφταν στο ίδιο χιλιοστό του δευτερολέπτου, που διορθώθηκε με σταθερό κριτήριο ισοβαθμίας, και ένα bug στο ίδιο το fake-browser, όπου το tabs.remove() έψαχνε παράθυρο με το id της καρτέλας.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Bookmarks as the database", el: "Οι σελιδοδείκτες ως βάση δεδομένων" },
        body: {
          en: "Sync across devices comes free and there's nothing to migrate or back up. The cost: folder names must be unique across the whole tree, since commands look folders up by name.",
          el: "Ο συγχρονισμός μεταξύ συσκευών έρχεται δωρεάν και δεν υπάρχει τίποτα για μεταφορά ή backup. Το κόστος: τα ονόματα φακέλων πρέπει να είναι μοναδικά σε όλο το δέντρο, αφού οι εντολές βρίσκουν τους φακέλους με το όνομα.",
        },
      },
      {
        title: { en: "Soft delete everywhere", el: "Ήπια διαγραφή παντού" },
        body: {
          en: "rm moves folders to a hidden trash for 48 hours. A keyboard tool makes a fat-fingered command too easy; reversible by default beats a confirmation dialog nobody reads.",
          el: "Το rm μεταφέρει τους φακέλους σε κρυφό κάδο για 48 ώρες. Ένα εργαλείο πληκτρολογίου κάνει ένα λάθος πάτημα πολύ εύκολο· η αναστρεψιμότητα από προεπιλογή είναι καλύτερη από ένα παράθυρο επιβεβαίωσης που δεν διαβάζει κανείς.",
        },
      },
      {
        title: { en: "A user token instead of OAuth", el: "Token χρήστη αντί για OAuth" },
        body: {
          en: "Sharing a folder as a Gist uses a personal token scoped to gist only, which keeps the whole extension serverless.",
          el: "Ο διαμοιρασμός ενός φακέλου ως Gist χρησιμοποιεί προσωπικό token με δικαίωμα μόνο για gist, κι έτσι όλη η επέκταση μένει χωρίς server.",
        },
      },
      {
        title: { en: "Permissions only for what they're for", el: "Δικαιώματα μόνο για τον σκοπό τους" },
        body: {
          en: "<all_urls> exists only for the overlay hotkey; alarms and notifications only for focus sessions. Each one is explained in the README.",
          el: "Το <all_urls> υπάρχει μόνο για τη συντόμευση του overlay· τα alarms και notifications μόνο για τις συνεδρίες συγκέντρωσης. Το καθένα εξηγείται στο README.",
        },
      },
    ],
    notYet: [
      {
        en: "No Firefox build yet, though WXT supports one; I've only tested Chrome.",
        el: "Δεν υπάρχει ακόμα έκδοση για Firefox, αν και το WXT την υποστηρίζει· έχω δοκιμάσει μόνο Chrome.",
      },
      {
        en: "The memory-freed estimate depends on chrome.processes, which not every Chromium build has; when it's missing, the number just doesn't show.",
        el: "Η εκτίμηση της μνήμης που ελευθερώθηκε εξαρτάται από το chrome.processes, που δεν το έχει κάθε έκδοση Chromium· όταν λείπει, ο αριθμός απλώς δεν εμφανίζεται.",
      },
    ],
  },
  {
    slug: "fake-news-detector",
    tagline: {
      en: "Three models, a verdict from each, and a check on whether they learned the right thing.",
      el: "Τρία μοντέλα, μια ετυμηγορία από το καθένα, και ένας έλεγχος για το αν έμαθαν το σωστό πράγμα.",
    },
    problem: [
      {
        en: "A university brief with an 85% accuracy target. The models cleared it easily, and that was the problem: scores that high on a static dataset usually mean a model has found a shortcut.",
        el: "Μια πανεπιστημιακή εργασία με στόχο ακρίβειας 85%. Τα μοντέλα τον ξεπέρασαν εύκολα, και αυτό ήταν το πρόβλημα: τόσο υψηλά σκορ σε στατικό dataset συνήθως σημαίνουν ότι το μοντέλο βρήκε μια συντόμευση.",
      },
    ],
    diagram: [
      [{ en: "Article text", el: "Κείμενο άρθρου" }],
      ["TextPreprocessor"],
      ["TF-IDF + LogReg", "BiLSTM", "BERT"],
      [{ en: "Flask: three verdicts", el: "Flask: τρεις ετυμηγορίες" }],
    ],
    diagramNote: {
      en: "A ModelOrchestrator keeps a registry of three wrappers behind one interface, loads them in a background thread, and asks each one for a label and a confidence. Adding a model means adding it to the registry, not touching the logic around it.",
      el: "Ένας ModelOrchestrator κρατά ένα μητρώο τριών wrappers πίσω από μία διεπαφή, τα φορτώνει σε νήμα στο παρασκήνιο και ζητά από το καθένα ετικέτα και βεβαιότητα. Για να προστεθεί μοντέλο αρκεί να μπει στο μητρώο, χωρίς να αγγιχτεί η λογική γύρω του.",
    },
    hard: [
      {
        title: { en: "Finding the shortcuts", el: "Εντοπισμός των συντομεύσεων" },
        body: {
          en: "On articles from outside the dataset, verdicts flipped on things that had nothing to do with truth. SHAP showed why: publisher names like “Reuters” and the dash characters from datelines were driving the predictions.",
          el: "Σε άρθρα εκτός dataset, οι ετυμηγορίες άλλαζαν για λόγους που δεν είχαν σχέση με την αλήθεια. Το SHAP έδειξε γιατί: ονόματα εκδοτών όπως «Reuters» και οι παύλες από τις γραμμές ημερομηνίας καθόριζαν τις προβλέψεις.",
        },
      },
      {
        title: { en: "Cleaning out the signal", el: "Αφαίρεση του σήματος" },
        body: {
          en: "A regex strips the dateline prefix (up to 35 characters before a dash), then URLs, HTML and punctuation, before training and before inference, so the shortcut isn't there at either end.",
          el: "Ένα regex αφαιρεί το πρόθεμα της γραμμής ημερομηνίας (έως 35 χαρακτήρες πριν από μια παύλα), και μετά URLs, HTML και σημεία στίξης, πριν την εκπαίδευση και πριν την πρόβλεψη, ώστε η συντόμευση να μην υπάρχει σε καμία άκρη.",
        },
      },
      {
        title: { en: "From 1.5 seconds to 10 milliseconds", el: "Από 1,5 δευτερόλεπτο σε 10 χιλιοστά" },
        body: {
          en: "BERT is loaded once, warmed up with a dummy input and kept in memory, in a background thread so the server starts straight away. Prediction went from about 1.5 s to 8–10 ms.",
          el: "Το BERT φορτώνεται μία φορά, «ζεσταίνεται» με μια ψεύτικη είσοδο και μένει στη μνήμη, σε νήμα στο παρασκήνιο ώστε ο server να ξεκινά αμέσως. Η πρόβλεψη έπεσε από περίπου 1,5 s σε 8–10 ms.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Three models, not one", el: "Τρία μοντέλα, όχι ένα" },
        body: {
          en: "The baseline shows what cheap features can already do, and disagreement between the three is useful information for the reader in its own right.",
          el: "Το baseline δείχνει τι μπορούν ήδη να κάνουν τα φθηνά χαρακτηριστικά, και η διαφωνία των τριών είναι από μόνη της χρήσιμη πληροφορία για τον αναγνώστη.",
        },
      },
      {
        title: { en: "Each model fails on its own", el: "Κάθε μοντέλο αποτυγχάνει μόνο του" },
        body: {
          en: "Every model reports its own status. If BERT fails to load, the other two still answer and the page says which one is missing.",
          el: "Κάθε μοντέλο αναφέρει τη δική του κατάσταση. Αν το BERT δεν φορτώσει, τα άλλα δύο απαντούν κανονικά και η σελίδα λέει ποιο λείπει.",
        },
      },
      {
        title: { en: "Whatever hardware is there", el: "Όποιο υλικό υπάρχει" },
        body: {
          en: "BERT picks CUDA, Apple's MPS or the CPU at start-up, so the same code runs on a laptop and on a GPU machine.",
          el: "Το BERT επιλέγει CUDA, MPS της Apple ή CPU κατά την εκκίνηση, οπότε ο ίδιος κώδικας τρέχει σε laptop και σε μηχάνημα με GPU.",
        },
      },
    ],
    notYet: [
      {
        en: "Accuracy on a static test set says little about real articles; a fresh, dated test set would be the honest benchmark.",
        el: "Η ακρίβεια σε στατικό test set λέει λίγα για πραγματικά άρθρα· ένα νέο test set με ημερομηνίες θα ήταν το έντιμο μέτρο σύγκρισης.",
      },
      {
        en: "The SHAP explanations live in the notebooks, not in the web app.",
        el: "Οι εξηγήσεις του SHAP βρίσκονται στα notebooks, όχι στην web εφαρμογή.",
      },
    ],
  },
];
