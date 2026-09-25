// Everything the site says lives here and in cases.ts, so updating the CV means editing data,
// not components. Translatable text is written as { en, el } right where it's used;
// localize() in i18n.ts picks one language before anything is rendered.

import {
  siDocker,
  siDotnet,
  siFastapi,
  siFlask,
  siGit,
  siGithubactions,
  siGooglechrome,
  siHuggingface,
  siLinux,
  siNextdotjs,
  siOpenapiinitiative,
  siOpenjdk,
  siPandas,
  siPostgresql,
  siPython,
  siReact,
  siScikitlearn,
  siSelenium,
  siSpringboot,
  siSqlite,
  siSvelte,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVitest,
} from "simple-icons";
import type { Localized, T } from "./i18n";

export const profile = {
  name: "David Gavriilidis",
  email: "davedev0406@gmail.com",
  github: "https://github.com/vwdshka",
  githubUser: "vwdshka",
  linkedin: "https://www.linkedin.com/in/david-gavriilidis-55707b252/",
  linkedinHandle: "david-gavriilidis",
};

/** Link-preview image entry for page metadata; the PNGs come from the og.png routes. */
export const preview = (url: string) => [{ url, width: 1200, height: 630, alt: `${profile.name} · dg.dev` }];

export const ui = {
  meta: {
    title: { en: "David Gavriilidis · Software Engineer", el: "David Gavriilidis · Μηχανικός Λογισμικού" },
    description: {
      en: "David Gavriilidis, software engineer in Athens. Backends, data pipelines and browser extensions in TypeScript, Python and Java.",
      el: "David Gavriilidis, μηχανικός λογισμικού στην Αθήνα. Backends, pipelines δεδομένων και browser extensions σε TypeScript, Python και Java.",
    },
  },
  nav: {
    about: { en: "about", el: "σχετικά" },
    skills: { en: "skills", el: "δεξιότητες" },
    projects: { en: "projects", el: "έργα" },
    experience: { en: "experience", el: "εμπειρία" },
    contact: { en: "contact", el: "επαφή" },
    theme: { en: "Switch colour theme", el: "Αλλαγή θέματος" },
    language: { en: "Διαβάστε στα ελληνικά", el: "Read in English" },
    skip: { en: "Skip to content", el: "Μετάβαση στο περιεχόμενο" },
  },
  live: {
    label: { en: "live", el: "live" },
    records: { en: "public records tracked", el: "δημόσιες εγγραφές" },
    refreshed: { en: "refreshed", el: "ανανέωση" },
  },
  hero: {
    output: {
      en: "software engineer · backend, data, the odd browser extension",
      el: "μηχανικός λογισμικού · backend, δεδομένα, και κάποιο browser extension",
    },
    lede: {
      en: "I build backends and data tools, mostly in TypeScript, Python and Java, and I like finding out how the data actually looks before I design around it.",
      el: "Φτιάχνω backends και εργαλεία δεδομένων, κυρίως σε TypeScript, Python και Java, και μου αρέσει να βλέπω πώς είναι πραγματικά τα δεδομένα πριν σχεδιάσω γύρω τους.",
    },
    cta: { en: "See my work", el: "Δείτε τη δουλειά μου" },
  },
  headings: {
    about: { en: "About", el: "Σχετικά" },
    skills: { en: "Skills", el: "Δεξιότητες" },
    projects: { en: "Projects", el: "Έργα" },
    experience: { en: "Experience & education", el: "Εμπειρία & σπουδές" },
    contact: { en: "Contact", el: "Επικοινωνία" },
  },
  skills: {
    core: { en: "core stack", el: "κύριο stack" },
    since: { en: "since", el: "από" },
    usedIn: { en: "used in", el: "χρησιμοποιείται σε" },
    everywhere: { en: "every project", el: "όλα τα έργα" },
    hint: { en: "pick a file to read it", el: "διαλέξτε ένα αρχείο" },
    files: { en: "files", el: "αρχεία" },
    jump: { en: "highlighted in Projects ↓", el: "επισημαίνεται στα Έργα ↓" },
  },
  projects: {
    all: { en: "all repositories ↗", el: "όλα τα repositories ↗" },
    noRepo: { en: "no public repo yet", el: "δεν έχει δημοσιευτεί ακόμα" },
    updated: { en: "updated", el: "ενημέρωση" },
    caseStudy: { en: "case study", el: "μελέτη περίπτωσης" },
    live: { en: "live", el: "live" },
    onGithub: { en: "on GitHub", el: "στο GitHub" },
    matching: { en: "{n} of {total} projects use {skill}", el: "{n} από {total} έργα χρησιμοποιούν {skill}" },
    noMatch: {
      en: "None of these projects use {skill}; the skills panel lists where it's used.",
      el: "Κανένα από αυτά τα έργα δεν χρησιμοποιεί {skill}· οι δεξιότητες δείχνουν πού χρησιμοποιείται.",
    },
    showAll: { en: "show all", el: "όλα" },
  },
  kinds: {
    software: { en: "software", el: "λογισμικό" },
    hospitality: { en: "hospitality", el: "φιλοξενία" },
    retail: { en: "retail", el: "λιανική" },
    education: { en: "education", el: "σπουδές" },
  },
  contact: {
    blurb: {
      en: "Open to junior backend and data roles, in Athens or remote in the EU. Email is the quickest way to reach me.",
      el: "Ανοιχτός σε θέσεις junior backend και data, στην Αθήνα ή remote στην ΕΕ. Ο πιο γρήγορος τρόπος να με βρείτε είναι το email.",
    },
    location: { en: "Location", el: "Τοποθεσία" },
    place: { en: "Kifissia, Athens", el: "Κηφισιά, Αθήνα" },
  },
  case: {
    back: { en: "← all projects", el: "← όλα τα έργα" },
    problem: { en: "The problem", el: "Το πρόβλημα" },
    how: { en: "How it works", el: "Πώς δουλεύει" },
    hard: { en: "The hard parts", el: "Τα δύσκολα σημεία" },
    decisions: { en: "Decisions and trade-offs", el: "Αποφάσεις και συμβιβασμοί" },
    notYet: { en: "What it doesn't do yet", el: "Τι δεν κάνει ακόμα" },
    numbers: { en: "In numbers", el: "Σε αριθμούς" },
    stack: { en: "Stack", el: "Stack" },
    next: { en: "Next case study", el: "Επόμενη μελέτη" },
  },
};

export const facts: [T, T][] = [
  [{ en: "Based in", el: "Βάση" }, { en: "Kifissia, Athens", el: "Κηφισιά, Αθήνα" }],
  [{ en: "Degree", el: "Πτυχίο" }, { en: "BSc Software Eng. · 2026", el: "BSc Software Eng. · 2026" }],
  [{ en: "Core", el: "Κύρια" }, { en: "TypeScript · Python · Java", el: "TypeScript · Python · Java" }],
  [{ en: "Speaks", el: "Γλώσσες" }, { en: "Ελληνικά · English · Русский", el: "Ελληνικά · English · Русский" }],
  [{ en: "Looking for", el: "Αναζητώ" }, { en: "Junior backend / data", el: "Junior backend / data" }],
];

export const about = {
  lede: {
    en: "Software engineering graduate from Athens who learned to work fast and carefully on the floor of a busy restaurant first.",
    el: "Απόφοιτος μηχανικής λογισμικού από την Αθήνα, που έμαθε να δουλεύει γρήγορα και προσεκτικά πρώτα στο σέρβις ενός γεμάτου εστιατορίου.",
  },
  paragraphs: [
    {
      en: "I graduated in summer 2026 with a BSc in Software Engineering from the University of Greater Manchester. I studied remotely, which meant the degree fitted around full summer seasons at resorts: White Olive in Lindos, Grecotel LuxMe Oasis in the Peloponnese and Aristi Mountain Resort in Zagori, where I worked as Σερβίτορος Α'.",
      el: "Αποφοίτησα το καλοκαίρι του 2026 με BSc στη Μηχανική Λογισμικού από το University of Greater Manchester. Σπούδασα εξ αποστάσεως, οπότε το πτυχίο χωρούσε γύρω από ολόκληρες καλοκαιρινές σεζόν σε resorts: στο White Olive στη Λίνδο, στο Grecotel LuxMe Oasis στην Πελοπόννησο και στο Aristi Mountain Resort στο Ζαγόρι, όπου δούλεψα ως Σερβίτορος Α'.",
    },
    {
      en: "Service taught me things that carry straight over to code. A full terrace doesn't wait, so you plan the next ten minutes before you move. You check the order before it leaves the pass, not after the guest sends it back. And you train the person next to you, because the shift only goes as well as its weakest station.",
      el: "Το σέρβις μού έμαθε πράγματα που περνάνε αυτούσια στον κώδικα. Μια γεμάτη βεράντα δεν περιμένει, οπότε σχεδιάζεις τα επόμενα δέκα λεπτά πριν κάνεις βήμα. Ελέγχεις την παραγγελία πριν φύγει από την κουζίνα, όχι αφού την επιστρέψει ο πελάτης. Και εκπαιδεύεις αυτόν που δουλεύει δίπλα σου, γιατί η βάρδια πάει τόσο καλά όσο το πιο αδύναμο πόστο της.",
    },
    {
      en: "Most of what I build starts with a problem I had myself: 60 open tabs, tax XML that gets rejected by the server, public spending data nobody can search. I measure the data before I model it, write the tests that catch the bug before release, and say plainly in the README what the code doesn't do yet.",
      el: "Τα περισσότερα που φτιάχνω ξεκινούν από ένα πρόβλημα που είχα ο ίδιος: 60 ανοιχτές καρτέλες, φορολογικά XML που απορρίπτονται από τον server, δημόσιες δαπάνες που δεν μπορεί να τις ψάξει κανείς. Μετράω τα δεδομένα πριν τα μοντελοποιήσω, γράφω τα tests που πιάνουν το bug πριν την κυκλοφορία, και λέω καθαρά στο README τι δεν κάνει ακόμα ο κώδικας.",
    },
  ],
};

/** Everything a skill can point to as evidence. `slug` means it has a case study on this site. */
export const works: Record<string, { name: string; slug?: string; href?: string }> = {
  ixnos: { name: "ixnos-data", slug: "ixnos-data" },
  mydata: { name: "myData-Client-Lib", slug: "mydata-client-lib" },
  tabsesh: { name: "tabsesh", slug: "tabsesh" },
  fakenews: { name: "LLM-Fake-News-Detector", slug: "fake-news-detector" },
  a11y: { name: "accessibility extension" },
  oce: { name: "OpenChartExcavator", href: "https://github.com/vwdshka/OpenChartExcavator" },
  cozychat: { name: "CozyChatNoUI", href: "https://github.com/vwdshka/CozyChatNoUI" },
  instants: { name: "my-instants-api", href: "https://github.com/vwdshka/my-instants-api" },
  lostnfound: { name: "swe6002-lostnfound", href: "https://github.com/vwdshka/swe6002-lostnfound" },
  guesser: { name: "swe6002-number-guesser", href: "https://github.com/vwdshka/swe6002-number-guesser" },
  reactchat: { name: "firebase-react-chat-app", href: "https://github.com/vwdshka/firebase-react-chat-app" },
  wick: { name: "wick (smart-bulb daemon)" },
};

export type Skill = {
  name: string;
  /** SVG path from simple-icons, drawn in currentColor on a 24×24 grid. */
  icon: string;
  core?: boolean;
  since: string;
  note: T;
  /** Keys of `works`; empty means it's in everything. */
  used: string[];
};

export type SkillGroup = { group: string; tone: "accent" | "ochre" | "olive" | "brick"; items: Skill[] };

export const skills: SkillGroup[] = [
  {
    group: "backend",
    tone: "accent",
    items: [
      {
        name: "Python",
        icon: siPython.path,
        core: true,
        since: "2024",
        note: {
          en: "Ingestion pipelines with httpx and Pydantic, ML models, and browser automation.",
          el: "Pipelines εισαγωγής δεδομένων με httpx και Pydantic, μοντέλα ML και αυτοματοποίηση browser.",
        },
        used: ["ixnos", "fakenews", "oce", "wick"],
      },
      {
        name: "FastAPI",
        icon: siFastapi.path,
        core: true,
        since: "2026",
        note: {
          en: "Small REST services: one that collects a MyInstants profile's favourite sounds into JSON, and the daemon every client of Wick talks to.",
          el: "Μικρές υπηρεσίες REST: μία που συλλέγει τους αγαπημένους ήχους ενός προφίλ MyInstants σε JSON, και ο daemon με τον οποίο μιλούν όλοι οι clients του Wick.",
        },
        used: ["instants", "wick"],
      },
      {
        name: "Java",
        icon: siOpenjdk.path,
        core: true,
        since: "2025",
        note: {
          en: "University projects, from a JWT-secured REST service to server-rendered web apps.",
          el: "Πανεπιστημιακά έργα, από ένα REST service με JWT μέχρι web εφαρμογές με server-side rendering.",
        },
        used: ["lostnfound", "guesser"],
      },
      {
        name: "Spring Boot",
        icon: siSpringboot.path,
        core: true,
        since: "2025",
        note: {
          en: "Spring Security, Spring Data JPA, Thymeleaf and HTMX, on MySQL and PostgreSQL.",
          el: "Spring Security, Spring Data JPA, Thymeleaf και HTMX, πάνω σε MySQL και PostgreSQL.",
        },
        used: ["lostnfound", "guesser"],
      },
      {
        name: "C# / .NET",
        icon: siDotnet.path,
        since: "2023",
        note: {
          en: "From raw TCP sockets in 2023 to a .NET 10 API and a typed client library.",
          el: "Από raw TCP sockets το 2023 μέχρι ένα API σε .NET 10 και μια typed client βιβλιοθήκη.",
        },
        used: ["ixnos", "mydata", "cozychat"],
      },
      {
        name: "Flask",
        icon: siFlask.path,
        since: "2026",
        note: {
          en: "Serves three models' verdicts side by side, with a health endpoint while they load.",
          el: "Σερβίρει τις ετυμηγορίες τριών μοντέλων δίπλα-δίπλα, με health endpoint όσο φορτώνουν.",
        },
        used: ["fakenews"],
      },
      {
        name: "REST API design",
        icon: siOpenapiinitiative.path,
        since: "2025",
        note: {
          en: "A documented public API with keys and rate limits; business errors returned as data.",
          el: "Τεκμηριωμένο δημόσιο API με κλειδιά και όρια χρήσης· τα επιχειρησιακά σφάλματα επιστρέφονται ως δεδομένα.",
        },
        used: ["ixnos", "mydata", "instants"],
      },
    ],
  },
  {
    group: "frontend",
    tone: "ochre",
    items: [
      {
        name: "TypeScript",
        icon: siTypescript.path,
        core: true,
        since: "2026",
        note: {
          en: "Typed end to end, from a terminal command parser to an OpenAPI-generated client.",
          el: "Τύποι από άκρη σε άκρη, από έναν parser εντολών τερματικού μέχρι client παραγόμενο από OpenAPI.",
        },
        used: ["tabsesh", "ixnos"],
      },
      {
        name: "React",
        icon: siReact.path,
        core: true,
        since: "2021",
        note: {
          en: "My first projects in 2021; now server components in Next.js.",
          el: "Τα πρώτα μου projects το 2021· σήμερα server components στο Next.js.",
        },
        used: ["ixnos", "reactchat"],
      },
      {
        name: "Next.js",
        icon: siNextdotjs.path,
        since: "2026",
        note: {
          en: "App Router, bilingual routing, and a static edition that runs without a server.",
          el: "App Router, δίγλωσση δρομολόγηση και μια στατική έκδοση που τρέχει χωρίς server.",
        },
        used: ["ixnos"],
      },
      {
        name: "Svelte",
        icon: siSvelte.path,
        since: "2026",
        note: {
          en: "The popup, the full-page app and the in-browser terminal of tabsesh.",
          el: "Το popup, η εφαρμογή πλήρους σελίδας και το τερματικό μέσα στον browser του tabsesh.",
        },
        used: ["tabsesh"],
      },
      {
        name: "Tailwind CSS",
        icon: siTailwindcss.path,
        since: "2025",
        note: {
          en: "Design tokens as CSS variables, with light and dark themes that pass AA.",
          el: "Design tokens ως μεταβλητές CSS, με φωτεινό και σκοτεινό θέμα που περνούν το AA.",
        },
        used: ["ixnos", "tabsesh", "guesser"],
      },
      {
        name: "WebExtensions (MV3)",
        icon: siGooglechrome.path,
        since: "2026",
        note: {
          en: "Service workers that get killed at any time, so timers go through chrome.alarms.",
          el: "Service workers που σκοτώνονται ανά πάσα στιγμή, γι' αυτό οι χρονομετρητές περνούν από το chrome.alarms.",
        },
        used: ["tabsesh", "a11y"],
      },
    ],
  },
  {
    group: "data-ml",
    tone: "olive",
    items: [
      {
        name: "scikit-learn",
        icon: siScikitlearn.path,
        since: "2026",
        note: {
          en: "A TF-IDF logistic regression baseline for the other models to beat.",
          el: "Ένα baseline με TF-IDF και logistic regression, για να το ξεπεράσουν τα άλλα μοντέλα.",
        },
        used: ["fakenews"],
      },
      {
        name: "TensorFlow",
        icon: siTensorflow.path,
        since: "2026",
        note: {
          en: "A bidirectional LSTM classifier trained on article text.",
          el: "Ένας ταξινομητής bidirectional LSTM εκπαιδευμένος σε κείμενα άρθρων.",
        },
        used: ["fakenews"],
      },
      {
        name: "BERT / Transformers",
        icon: siHuggingface.path,
        since: "2026",
        note: {
          en: "Fine-tuned BERT, warmed up in a background thread so the first request is fast.",
          el: "Fine-tuned BERT, που «ζεσταίνεται» σε νήμα στο παρασκήνιο ώστε το πρώτο αίτημα να είναι γρήγορο.",
        },
        used: ["fakenews"],
      },
      {
        name: "pandas",
        icon: siPandas.path,
        since: "2026",
        note: {
          en: "Cleaning and profiling the dataset before any model saw it.",
          el: "Καθαρισμός και profiling του dataset πριν το δει οποιοδήποτε μοντέλο.",
        },
        used: ["fakenews"],
      },
      {
        name: "SHAP",
        icon: siPython.path,
        since: "2026",
        note: {
          en: "Showed which words drove each verdict, and exposed the shortcuts the models had learned.",
          el: "Έδειξε ποιες λέξεις καθόριζαν κάθε ετυμηγορία και αποκάλυψε τις «συντομεύσεις» που είχαν μάθει τα μοντέλα.",
        },
        used: ["fakenews"],
      },
      {
        name: "Selenium",
        icon: siSelenium.path,
        since: "2025",
        note: {
          en: "Headless Chrome against Google Maps, with explicit waits instead of sleeps.",
          el: "Headless Chrome πάνω στο Google Maps, με ρητές αναμονές αντί για sleeps.",
        },
        used: ["oce"],
      },
    ],
  },
  {
    group: "tooling",
    tone: "brick",
    items: [
      {
        name: "Git",
        icon: siGit.path,
        since: "2021",
        note: {
          en: "Every project since the first one; small commits that say why, not just what.",
          el: "Σε κάθε project από το πρώτο· μικρά commits που λένε το γιατί, όχι μόνο το τι.",
        },
        used: [],
      },
      {
        name: "Docker",
        icon: siDocker.path,
        since: "2026",
        note: {
          en: "Compose for the database, API and web app: one command builds and starts it all.",
          el: "Compose για βάση, API και web app: μία εντολή τα χτίζει και τα ξεκινά όλα.",
        },
        used: ["ixnos"],
      },
      {
        name: "Linux",
        icon: siLinux.path,
        since: "2026",
        note: {
          en: "A production setup with Caddy, cron jobs, backups and a restore that has been tested.",
          el: "Παραγωγικό setup με Caddy, cron jobs, backups και restore που έχει δοκιμαστεί.",
        },
        used: ["ixnos"],
      },
      {
        name: "SQLite",
        icon: siSqlite.path,
        since: "2026",
        note: {
          en: "Zero-setup local storage for Wick's scenes and schedules.",
          el: "Τοπική αποθήκευση χωρίς setup για τις σκηνές και τα προγράμματα του Wick.",
        },
        used: ["wick"],
      },
      {
        name: "PostgreSQL",
        icon: siPostgresql.path,
        since: "2025",
        note: {
          en: "Full-text search with a Greek configuration, pg_trgm for typos and unaccent.",
          el: "Αναζήτηση πλήρους κειμένου με ελληνική ρύθμιση, pg_trgm για τα ορθογραφικά λάθη και unaccent.",
        },
        used: ["ixnos", "guesser"],
      },
      {
        name: "GitHub Actions",
        icon: siGithubactions.path,
        since: "2026",
        note: {
          en: "CI on every push, and a workflow that rebuilds a static site every three hours.",
          el: "CI σε κάθε push και ένα workflow που ξαναχτίζει στατικό site κάθε τρεις ώρες.",
        },
        used: ["mydata", "ixnos"],
      },
      {
        name: "Vitest / xUnit",
        icon: siVitest.path,
        since: "2026",
        note: {
          en: "73 Vitest tests in tabsesh; unit, snapshot, contract and live tests in .NET.",
          el: "73 tests με Vitest στο tabsesh· unit, snapshot, contract και live tests σε .NET.",
        },
        used: ["tabsesh", "mydata", "ixnos"],
      },
    ],
  },
];

export type Project = {
  name: string;
  /** Key in `works`, so a selected skill can light up the projects that use it. */
  work: string;
  /** Matches a case study in cases.ts. */
  slug?: string;
  /** GitHub repository name under profile.githubUser; omitted when the code isn't public. */
  repo?: string;
  site?: string;
  year: string;
  summary: T;
  numbers: [T, string][];
  tags: string[];
};

// The first project gets the full-width card.
export const projects: Project[] = [
  {
    name: "ixnos-data",
    work: "ixnos",
    slug: "ixnos-data",
    repo: "ixnos-data",
    site: "https://vwdshka.github.io/ixnos-data/",
    year: "2026",
    summary: {
      en: "Greek public procurement data (ΚΗΜΔΗΣ tenders and Διαύγεια spending decisions), searchable in Greek or Greeklish. A Python pipeline, a .NET 10 API and a Next.js front end around PostgreSQL full-text search. Before writing a schema I probed 614,000 real records, which is how I found titles cut at 100 characters and payments with typos worth over €100 million.",
      el: "Τα δεδομένα των δημόσιων συμβάσεων (διαγωνισμοί του ΚΗΜΔΗΣ και αποφάσεις δαπανών της Διαύγειας), με αναζήτηση στα ελληνικά ή σε greeklish. Ένα pipeline σε Python, ένα API σε .NET 10 και ένα front end σε Next.js γύρω από την αναζήτηση πλήρους κειμένου της PostgreSQL. Πριν γράψω σχήμα βάσης εξέτασα 614.000 πραγματικές εγγραφές, και έτσι βρήκα τίτλους κομμένους στους 100 χαρακτήρες και πληρωμές με τυπογραφικά λάθη άνω των 100 εκατ. €.",
    },
    numbers: [
      [{ en: "precision@10", el: "precision@10" }, "0.84–1.00"],
      [{ en: "Records probed", el: "Εγγραφές που εξετάστηκαν" }, "614,000"],
      [{ en: "Static site refresh", el: "Ανανέωση στατικού site" }, "3 h"],
    ],
    tags: ["C#", ".NET 10", "Python", "PostgreSQL", "Next.js"],
  },
  {
    name: "myData-Client-Lib",
    work: "mydata",
    slug: "mydata-client-lib",
    repo: "myData-Client-Lib",
    year: "2026",
    summary: {
      en: "A typed .NET client for AADE's myDATA, the e-invoicing API every Greek business has to report through. It reproduces AADE's arithmetic and business rules in a validator that runs before anything is serialised, and returns results per invoice, because a batch can come back as HTTP 200 with some invoices rejected.",
      el: "Ένας typed .NET client για το myDATA της ΑΑΔΕ, το API ηλεκτρονικής τιμολόγησης μέσω του οποίου πρέπει να δηλώνει κάθε ελληνική επιχείρηση. Αναπαράγει τους αριθμητικούς και επιχειρησιακούς κανόνες της ΑΑΔΕ σε έναν validator που τρέχει πριν σειριοποιηθεί οτιδήποτε, και επιστρέφει αποτέλεσμα ανά παραστατικό, γιατί μια παρτίδα μπορεί να γυρίσει HTTP 200 με κάποια παραστατικά απορριφθέντα.",
    },
    numbers: [
      [{ en: "Rejection codes caught locally", el: "Κωδικοί απόρριψης που πιάνονται τοπικά" }, "11"],
      [{ en: "Test tiers", el: "Επίπεδα tests" }, "4"],
    ],
    tags: ["C#", ".NET 10", "XML / XSD", "xUnit", "WireMock.Net"],
  },
  {
    name: "tabsesh",
    work: "tabsesh",
    slug: "tabsesh",
    repo: "tabsesh",
    year: "2026",
    summary: {
      en: "Closing 60+ tabs becomes one undoable command. A popup, a full-page GUI and an in-browser terminal all call the same UI-free TypeScript core. Chrome's own bookmarks are the only data store, so sync between devices comes free, with no server and no account.",
      el: "Το κλείσιμο 60+ καρτελών γίνεται μία εντολή που αναιρείται. Ένα popup, ένα GUI πλήρους σελίδας και ένα τερματικό μέσα στον browser καλούν όλα τον ίδιο πυρήνα TypeScript χωρίς UI. Οι σελιδοδείκτες του ίδιου του Chrome είναι η μόνη αποθήκευση, οπότε ο συγχρονισμός μεταξύ συσκευών έρχεται δωρεάν, χωρίς server και χωρίς λογαριασμό.",
    },
    numbers: [
      [{ en: "Vitest tests", el: "Tests με Vitest" }, "73"],
      [{ en: "Bugs caught before release", el: "Bugs που πιάστηκαν πριν την κυκλοφορία" }, "2"],
      [{ en: "Trash before purge", el: "Κάδος πριν τη διαγραφή" }, "48 h"],
    ],
    tags: ["TypeScript", "Svelte", "WXT", "Manifest V3", "Vitest"],
  },
  {
    name: "Web accessibility extension",
    work: "a11y",
    year: "2026",
    summary: {
      en: "A Chromium extension that checks the accessibility of a page while you use it, instead of after a crawl. A heuristic engine settles everything a rule can decide, and a Gemma 4 model running locally takes the cases that need judgement, so the page is analysed on your own machine and never sent to a server.",
      el: "Ένα extension για Chromium που ελέγχει την προσβασιμότητα μιας σελίδας την ώρα που τη χρησιμοποιείτε, όχι μετά από crawl. Μια μηχανή ευρετικών κανόνων αποφασίζει ό,τι μπορεί να κριθεί με κανόνα, και ένα μοντέλο Gemma 4 που τρέχει τοπικά αναλαμβάνει όσα θέλουν κρίση, οπότε η σελίδα αναλύεται στον δικό σας υπολογιστή και δεν στέλνεται ποτέ σε server.",
    },
    numbers: [
      [{ en: "Platform", el: "Πλατφόρμα" }, "Manifest V3"],
      [{ en: "Model", el: "Μοντέλο" }, "Gemma 4, on-device"],
      [{ en: "Checks", el: "Έλεγχοι" }, "heuristics → LLM"],
    ],
    tags: ["Manifest V3", "Chromium", "Gemma 4", "Local LLM", "Heuristics"],
  },
  {
    name: "LLM-Fake-News-Detector",
    work: "fakenews",
    slug: "fake-news-detector",
    repo: "LLM-Fake-News-Detector",
    year: "2026",
    summary: {
      en: "Three models side by side: a TF-IDF logistic regression baseline, a bidirectional LSTM and BERT. All three passed 98% on the test set, which looked too good for a static dataset, so I ran the models on articles from outside it and used SHAP to see which words drove each verdict. They had learned shortcuts, like the word “Reuters”, which regex cleaning now strips before training and inference.",
      el: "Τρία μοντέλα δίπλα-δίπλα: ένα baseline με TF-IDF και logistic regression, ένα bidirectional LSTM και το BERT. Και τα τρία ξεπέρασαν το 98% στο test set, κάτι που έμοιαζε υπερβολικά καλό για στατικό dataset, οπότε τα δοκίμασα σε άρθρα εκτός αυτού και χρησιμοποίησα το SHAP για να δω ποιες λέξεις καθόριζαν κάθε ετυμηγορία. Είχαν μάθει «συντομεύσεις», όπως τη λέξη «Reuters», που πλέον αφαιρείται με regex πριν την εκπαίδευση και την πρόβλεψη.",
    },
    numbers: [
      [{ en: "Accuracy LR / LSTM / BERT", el: "Ακρίβεια LR / LSTM / BERT" }, "98.42 / 99.91 / 99.74 %"],
      [{ en: "Prediction time", el: "Χρόνος πρόβλεψης" }, "~1.5 s → 8–10 ms"],
    ],
    tags: ["Python", "BERT", "LSTM", "scikit-learn", "TensorFlow", "SHAP", "Flask"],
  },
];

export type Entry = {
  kind: "software" | "hospitality" | "retail" | "education";
  /** One line per period, newest first. */
  when: T[];
  title: T;
  org: string;
  place?: T;
  points: T[];
};

const WAITER: T = { en: "Σερβίτορος Α'", el: "Σερβίτορος Α'" };

// Newest first, by the end of the latest period. Hospitality titles stay as on the contracts.
export const timeline: Entry[] = [
  {
    kind: "hospitality",
    when: [
      { en: "Apr 2026 – Oct 2026", el: "Απρ 2026 – Οκτ 2026" },
      { en: "Jun 2025 – Nov 2025", el: "Ιούν 2025 – Νοέ 2025" },
    ],
    title: WAITER,
    org: "Aristi Mountain Resort",
    place: { en: "Aristi, Zagori", el: "Αρίστη, Ζαγόρι" },
    points: [
      {
        en: "Two seasons in a restaurant with multiple food awards and two Michelin Keys.",
        el: "Δύο σεζόν σε εστιατόριο με πολλές γαστρονομικές διακρίσεις και δύο Michelin Keys.",
      },
      {
        en: "Planned and ran events together with the hotel's manager.",
        el: "Σχεδίασα και έτρεξα εκδηλώσεις μαζί με τον διευθυντή του ξενοδοχείου.",
      },
    ],
  },
  {
    kind: "education",
    when: [{ en: "Sep 2022 – Summer 2026", el: "Σεπ 2022 – Καλοκαίρι 2026" }],
    title: { en: "BSc Software Engineering", el: "BSc Μηχανική Λογισμικού" },
    org: "University of Greater Manchester",
    place: { en: "Remote from Athens", el: "Εξ αποστάσεως από την Αθήνα" },
    points: [
      {
        en: "Studied remotely while working full seasons in hospitality.",
        el: "Σπούδασα εξ αποστάσεως, δουλεύοντας ολόκληρες σεζόν στη φιλοξενία.",
      },
      {
        en: "Java and Spring Boot coursework, including a lost-and-found system for a municipality with Spring Security, MySQL and Leaflet maps.",
        el: "Εργασίες σε Java και Spring Boot, ανάμεσά τους ένα σύστημα απολεσθέντων αντικειμένων για δήμο με Spring Security, MySQL και χάρτες Leaflet.",
      },
    ],
  },
  {
    kind: "software",
    when: [{ en: "2026", el: "2026" }],
    title: { en: "Open-source projects", el: "Έργα ανοιχτού κώδικα" },
    org: "github.com/vwdshka",
    points: [
      {
        en: "ixnos-data: search over Greek public spending, with a static edition on GitHub Pages refreshed every three hours.",
        el: "ixnos-data: αναζήτηση στις ελληνικές δημόσιες δαπάνες, με στατική έκδοση στο GitHub Pages που ανανεώνεται κάθε τρεις ώρες.",
      },
      {
        en: "myData-Client-Lib and tabsesh, each with its own test suite running in CI.",
        el: "myData-Client-Lib και tabsesh, το καθένα με τη δική του σουίτα tests που τρέχει στο CI.",
      },
    ],
  },
  {
    kind: "software",
    when: [{ en: "2025", el: "2025" }],
    title: { en: "Back-end developer, team project", el: "Back-end developer, ομαδικό έργο" },
    org: "OpenChartExcavator",
    points: [
      {
        en: "Owned the back end of a four-person app that lists every business in an area picked on Google Maps.",
        el: "Ανέλαβα το back end μιας εφαρμογής τεσσάρων ατόμων που καταγράφει κάθε επιχείρηση σε μια περιοχή που επιλέγεται στο Google Maps.",
      },
      {
        en: "Replaced fixed sleeps with explicit waits on element state, which stopped the stale-element failures on slow connections.",
        el: "Αντικατέστησα τις σταθερές αναμονές με ρητές αναμονές στην κατάσταση των στοιχείων, κάτι που σταμάτησε τα σφάλματα stale element σε αργές συνδέσεις.",
      },
    ],
  },
  {
    kind: "hospitality",
    when: [{ en: "May 2024 – Nov 2024", el: "Μάι 2024 – Νοέ 2024" }],
    title: WAITER,
    org: "Grecotel LuxMe Oasis",
    place: { en: "Peloponnese", el: "Πελοπόννησος" },
    points: [
      {
        en: "Trained assistant waiters and interns in the à la carte restaurant.",
        el: "Εκπαίδευσα βοηθούς σερβιτόρους και ασκούμενους στο à la carte εστιατόριο.",
      },
      {
        en: "Worked to HACCP and ISO 22000, and met with management before service to plan events.",
        el: "Εργάστηκα με βάση το HACCP και το ISO 22000, και συναντιόμουν με τη διεύθυνση πριν το σέρβις για τον σχεδιασμό εκδηλώσεων.",
      },
    ],
  },
  {
    kind: "hospitality",
    when: [{ en: "Sep 2023 – Nov 2023", el: "Σεπ 2023 – Νοέ 2023" }],
    title: WAITER,
    org: "White Olive Premium Lindos",
    place: { en: "Pefkoi, Rhodes", el: "Πεύκοι, Ρόδος" },
    points: [
      {
        en: "Peak-season service, set-up of the dining room, and walking guests through each dish and its allergens.",
        el: "Σέρβις στην αιχμή της σεζόν, στήσιμο της σάλας και ενημέρωση των πελατών για κάθε πιάτο και τα αλλεργιογόνα του.",
      },
    ],
  },
  {
    kind: "retail",
    when: [{ en: "May 2023 – Sep 2023", el: "Μάι 2023 – Σεπ 2023" }],
    title: { en: "Cashier", el: "Ταμίας" },
    org: "SpotMarket",
    place: { en: "Neo Irakleio, Athens", el: "Νέο Ηράκλειο, Αθήνα" },
    points: [
      {
        en: "Wrote my first tool used by other people: it tracked stock close to its expiry date, and every store in the company adopted it.",
        el: "Έγραψα το πρώτο μου εργαλείο που χρησιμοποίησαν άλλοι: παρακολουθούσε τα προϊόντα κοντά στη λήξη τους, και το υιοθέτησαν όλα τα καταστήματα της εταιρείας.",
      },
    ],
  },
];


export type UI = Localized<typeof ui>;
