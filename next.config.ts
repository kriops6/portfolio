// Filename: next.config.ts
// This file configures your Next.js project for static deployment on GitHub Pages.

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * This option tells Next.js to build your site as a collection of static
   * HTML, CSS, and JavaScript files that can be hosted anywhere.
   */
  output: 'export',

  /**
   * This is the most important part for GitHub Pages. It tells your application
   * that it lives in a subfolder (your repository name) on the domain.
   */
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
};

export default nextConfig;