#!/usr/bin/env bun
import { readdirSync, writeFileSync } from "fs";
import { basename, extname } from "path";

interface DocMetadata {
  slug: string;
  title: string;
  path: string;
}

interface ExampleMetadata {
  slug: string;
  title: string;
  path: string;
  language: string;
}

interface ContentMetadata {
  docs: DocMetadata[];
  examples: ExampleMetadata[];
}

const DOCS_SOURCE = "node_modules/@falai/agent/docs";
const EXAMPLES_SOURCE = "node_modules/@falai/agent/examples";
const OUTPUT_FILE = "src/content-metadata.json";

function slugify(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, "") // Remove extension
    .toLowerCase()
    .replace(/[_]/g, "-");
}

function titleCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function generateDocsMetadata(): DocMetadata[] {
  const files = readdirSync(DOCS_SOURCE);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = slugify(file);
      const title = titleCase(basename(file, ".md"));
      return {
        slug,
        title,
        path: `/content/docs/${file}`,
      };
    })
    .sort((a, b) => {
      // Sort with README first, then GETTING_STARTED, then alphabetically
      if (a.slug === "readme") return -1;
      if (b.slug === "readme") return 1;
      if (a.slug === "getting-started") return -1;
      if (b.slug === "getting-started") return 1;
      return a.title.localeCompare(b.title);
    });
}

function generateExamplesMetadata(): ExampleMetadata[] {
  const files = readdirSync(EXAMPLES_SOURCE);
  return files
    .filter((file) => file.endsWith(".ts") || file.endsWith(".prisma"))
    .map((file) => {
      const slug = slugify(file);
      const title = titleCase(basename(file, extname(file)));
      const language = file.endsWith(".prisma") ? "prisma" : "typescript";
      return {
        slug,
        title,
        path: `/content/examples/${file}`,
        language,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

function generateMetadata() {
  console.log("📝 Generating content metadata...");

  const metadata: ContentMetadata = {
    docs: generateDocsMetadata(),
    examples: generateExamplesMetadata(),
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(metadata, null, 2));

  console.log(
    `✅ Generated metadata for ${metadata.docs.length} docs and ${metadata.examples.length} examples`
  );
  console.log(`📄 Written to ${OUTPUT_FILE}`);
}

generateMetadata();
