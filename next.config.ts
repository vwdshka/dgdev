import type { NextConfig } from "next";

// GitHub Pages serves plain files, so the whole site is exported at build time. The Pages workflow
// passes BASE_PATH ("/dgdev-portfolio" for a project site, "" for a user site or custom domain).
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  basePath,
  // /en/ -> out/en/index.html, which every static host resolves without rewrites.
  trailingSlash: true,
  env: { BASE_PATH: basePath },
};

export default nextConfig;
