// Everything the page says lives here, so updating the CV means editing one file.

export const profile = {
  name: "David Gavriilidis",
  role: "Software engineer",
  location: "Kifissia, Athens, Greece",
  email: "davedev0406@gmail.com",
  github: "https://github.com/vwdshka",
  githubUser: "vwdshka",
  linkedin: "https://www.linkedin.com/in/david-gavriilidis-55707b252/",
  linkedinHandle: "david-gavriilidis",
};

export const facts: [string, string][] = [
  ["Based in", "Kifissia, Athens"],
  ["Degree", "BSc Software Eng. · 2026"],
  ["Core", "Rust · TS · Python · Java"],
  ["Speaks", "Ελληνικά · English · Русский"],
  ["Looking for", "Junior backend / data"],
];

export type Skill = { name: string; core?: boolean };

export const skills: { group: string; items: Skill[] }[] = [
  {
    group: "Backend",
    items: [
      { name: "Rust", core: true },
      { name: "Python", core: true },
      { name: "FastAPI", core: true },
      { name: "Java", core: true },
      { name: "Spring Boot", core: true },
      { name: "C# / .NET" },
      { name: "Flask" },
      { name: "REST API design" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "TypeScript", core: true },
      { name: "React", core: true },
      { name: "Next.js" },
      { name: "Svelte" },
      { name: "Tailwind CSS" },
      { name: "WebExtensions (MV3)" },
    ],
  },
  {
    group: "Data & ML",
    items: [
      { name: "scikit-learn" },
      { name: "TensorFlow" },
      { name: "BERT / Transformers" },
      { name: "pandas" },
      { name: "SHAP" },
      { name: "Selenium" },
    ],
  },
  {
    group: "Tooling",
    items: [
      { name: "Git" },
      { name: "Docker" },
      { name: "Linux" },
      { name: "SQLite" },
      { name: "PostgreSQL" },
      { name: "GitHub Actions" },
      { name: "Vitest / xUnit" },
    ],
  },
];

export type Project = {
  name: string;
  /** GitHub repository name under profile.githubUser; omitted when the code isn't public. */
  repo?: string;
  site?: string;
  year: string;
  summary: string;
  numbers: [string, string][];
  tags: string[];
};

// The first project gets the full-width card.
export const projects: Project[] = [
  {
    name: "ixnos-data",
    repo: "ixnos-data",
    site: "https://vwdshka.github.io/ixnos-data/",
    year: "2026",
    summary:
      "Greek public procurement data (ΚΗΜΔΗΣ tenders and Διαύγεια spending decisions), searchable in Greek or Greeklish. A Python pipeline, a .NET 10 API and a Next.js front end around PostgreSQL full-text search. Before writing a schema I probed 614,000 real records, which is how I found titles cut at 100 characters and payments with typos worth over €100 million.",
    numbers: [
      ["precision@10", "0.84–1.00"],
      ["Records probed", "614,000"],
      ["Static site refresh", "every 3 h"],
    ],
    tags: ["C#", ".NET 10", "Python", "PostgreSQL", "Next.js"],
  },
  {
    name: "myData-Client-Lib",
    repo: "myData-Client-Lib",
    year: "2026",
    summary:
      "A typed .NET client for AADE’s myDATA, the e-invoicing API every Greek business has to report through. It reproduces AADE’s arithmetic and business rules in a validator that runs before anything is serialised, and returns results per invoice, because a batch can come back as HTTP 200 with some invoices rejected.",
    numbers: [
      ["Rejection codes caught locally", "11"],
      ["Test tiers", "4"],
    ],
    tags: ["C#", ".NET 10", "XML / XSD", "xUnit", "WireMock.Net"],
  },
  {
    name: "tabsesh",
    repo: "tabsesh",
    year: "2026",
    summary:
      "Closing 60+ tabs becomes one undoable command. A popup, a full-page GUI and an in-browser terminal all call the same UI-free TypeScript core. Chrome’s own bookmarks are the only data store, so sync between devices comes free, with no server and no account.",
    numbers: [
      ["Vitest tests", "73"],
      ["Bugs caught before release", "2"],
      ["Trash before purge", "48 h"],
    ],
    tags: ["TypeScript", "Svelte", "WXT", "Manifest V3", "Vitest"],
  },
  {
    name: "Web accessibility extension",
    year: "2026",
    summary:
      "A Chromium extension that checks the accessibility of a page while you use it, instead of after a crawl. A heuristic engine settles everything a rule can decide, and a Gemma 4 model running locally takes the cases that need judgement, so the page is analysed on your own machine and never sent to a server.",
    numbers: [
      ["Platform", "Manifest V3"],
      ["Model", "Gemma 4, on-device"],
      ["Checks", "heuristics first, LLM second"],
    ],
    tags: ["Manifest V3", "Chromium", "Gemma 4", "Local LLM", "Heuristics"],
  },
  {
    name: "LLM-Fake-News-Detector",
    repo: "LLM-Fake-News-Detector",
    year: "2026",
    summary:
      "Three models side by side: a TF-IDF logistic regression baseline, a bidirectional LSTM and BERT. All three passed 98% on the test set, which looked too good for a static dataset, so I ran the models on articles from outside it and used SHAP to see which words drove each verdict. They had learned shortcuts, like the word “Reuters”, which regex cleaning now strips before training and inference.",
    numbers: [
      ["Accuracy LR / LSTM / BERT", "98.42 / 99.91 / 99.74 %"],
      ["Prediction time", "~1.5 s → 8–10 ms"],
    ],
    tags: ["Python", "BERT", "LSTM", "scikit-learn", "TensorFlow", "SHAP", "Flask"],
  },
];

export type Entry = {
  kind: "software" | "hospitality" | "retail" | "education";
  /** One line per period, newest first. */
  when: string[];
  title: string;
  org: string;
  place?: string;
  points: string[];
};

// Newest first, by the end of the latest period. Hospitality titles stay as on the contracts.
export const timeline: Entry[] = [
  {
    kind: "hospitality",
    when: ["Apr 2026 – Oct 2026", "Jun 2025 – Nov 2025"],
    title: "Σερβίτορος Α'",
    org: "Aristi Mountain Resort",
    place: "Aristi, Zagori",
    points: [
      "Two seasons in a restaurant with multiple food awards and two Michelin Keys.",
      "Planned and ran events together with the hotel’s manager.",
    ],
  },
  {
    kind: "education",
    when: ["Sep 2022 – Summer 2026"],
    title: "BSc Software Engineering",
    org: "University of Greater Manchester",
    place: "Remote from Athens",
    points: [
      "Studied remotely while working full seasons in hospitality.",
      "Java and Spring Boot coursework, including a lost-and-found system for a municipality with Spring Security, MySQL and Leaflet maps.",
    ],
  },
  {
    kind: "software",
    when: ["2026"],
    title: "Open-source projects",
    org: "github.com/vwdshka",
    points: [
      "ixnos-data: search over Greek public spending, with a static edition on GitHub Pages refreshed every three hours.",
      "myData-Client-Lib and tabsesh, each with its own test suite running in CI.",
    ],
  },
  {
    kind: "software",
    when: ["2025"],
    title: "Back-end developer, team project",
    org: "OpenChartExcavator",
    points: [
      "Owned the back end of a four-person app that lists every business in an area picked on Google Maps.",
      "Replaced fixed sleeps with explicit waits on element state, which stopped the stale-element failures on slow connections.",
    ],
  },
  {
    kind: "hospitality",
    when: ["May 2024 – Nov 2024"],
    title: "Σερβίτορος Α'",
    org: "Grecotel LuxMe Oasis",
    place: "Peloponnese",
    points: [
      "Trained assistant waiters and interns in the à la carte restaurant.",
      "Worked to HACCP and ISO 22000, and met with management before service to plan events.",
    ],
  },
  {
    kind: "hospitality",
    when: ["Sep 2023 – Nov 2023"],
    title: "Σερβίτορος Α'",
    org: "White Olive Premium Lindos",
    place: "Pefkoi, Rhodes",
    points: ["Peak-season service, set-up of the dining room, and walking guests through each dish and its allergens."],
  },
  {
    kind: "retail",
    when: ["May 2023 – Sep 2023"],
    title: "Cashier",
    org: "SpotMarket",
    place: "Neo Irakleio, Athens",
    points: [
      "Wrote my first tool used by other people: it tracked stock close to its expiry date, and every store in the company adopted it.",
    ],
  },
];
