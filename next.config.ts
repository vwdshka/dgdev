import type { NextConfig } from "next";

// github pages only serves static files, so everything is exported at build time.
// BASE_PATH comes from the pages workflow - "/dgdev-portfolio" for a project site, "" for a custom domain
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // /en/ -> out/en/index.html, works on any static host
  trailingSlash: true,
  env: { BASE_PATH: basePath },
};

export default nextConfig;
