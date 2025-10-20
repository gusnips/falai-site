#!/usr/bin/env bun
import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { basename, extname, join } from "path";

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

interface CategoryMetadata {
  slug: string;
  title: string;
  items: DocMetadata[] | ExampleMetadata[];
}

interface ContentMetadata {
  version: string;
  docs: CategoryMetadata[];
  examples: CategoryMetadata[];
}

const DOCS_SOURCE = "node_modules/@falai/agent/docs";
const EXAMPLES_SOURCE = "node_modules/@falai/agent/examples";
const PACKAGE_JSON = "node_modules/@falai/agent/package.json";
const OUTPUT_FILE = "src/content-metadata.json";

function slugify(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, "") // Remove extension
    .toLowerCase()
    .replace(/[_]/g, "-");
}

function titleCase(str: string): string {
  const words = str.split(/[-_]/);
  return words
    .map((word, index) => {
      // Capitalize first word, keep rest lowercase unless it's an acronym
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      // Check if word is likely an acronym (all caps, 2-5 letters)
      if (word.length <= 5 && word.toUpperCase() === word) {
        return word.toUpperCase();
      }
      return word.toLowerCase();
    })
    .join(" ");
}

function scanDirectoryRecursive(dirPath: string, basePath: string): (DocMetadata | ExampleMetadata)[] {
  const items: (DocMetadata | ExampleMetadata)[] = [];
  const entries = readdirSync(dirPath);

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);

    if (stat.isFile() && (entry.endsWith(".md") || entry.endsWith(".ts") || entry.endsWith(".prisma"))) {
      const slug = slugify(entry);
      const title = titleCase(basename(entry, extname(entry)));
      const relativePath = `${basePath}/${entry}`;
      
      if (entry.endsWith(".md")) {
        items.push({
          slug,
          title,
          path: relativePath,
        } as DocMetadata);
      } else {
        const language = entry.endsWith(".prisma") ? "prisma" : "typescript";
        items.push({
          slug,
          title,
          path: relativePath,
          language,
        } as ExampleMetadata);
      }
    } else if (stat.isDirectory()) {
      // Recursively scan subdirectories
      const subItems = scanDirectoryRecursive(fullPath, `${basePath}/${entry}`);
      items.push(...subItems);
    }
  }

  return items.sort((a, b) => {
    // Sort with README first, then alphabetically
    if (a.slug === "readme") return -1;
    if (b.slug === "readme") return 1;
    return a.title.localeCompare(b.title);
  });
}

function generateDocsMetadata(): CategoryMetadata[] {
  const categories: CategoryMetadata[] = [];
  const entries = readdirSync(DOCS_SOURCE);

  // Handle root level files first
  const rootFiles = entries
    .filter((entry) => {
      const fullPath = join(DOCS_SOURCE, entry);
      return statSync(fullPath).isFile() && entry.endsWith(".md");
    })
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
      if (a.slug === "readme") return -1;
      if (b.slug === "readme") return 1;
      return a.title.localeCompare(b.title);
    });

  if (rootFiles.length > 0) {
    categories.push({
      slug: "overview",
      title: "Overview",
      items: rootFiles,
    });
  }

  // Handle directories
  const directories = entries.filter((entry) => {
    const fullPath = join(DOCS_SOURCE, entry);
    return statSync(fullPath).isDirectory();
  });

  for (const dir of directories) {
    const dirPath = join(DOCS_SOURCE, dir);
    const items = scanDirectoryRecursive(dirPath, `/content/docs/${dir}`);
    
    if (items.length > 0) {
      categories.push({
        slug: slugify(dir),
        title: titleCase(dir),
        items: items as DocMetadata[],
      });
    }
  }

  return categories;
}

function generateExamplesMetadata(): CategoryMetadata[] {
  const categories: CategoryMetadata[] = [];
  const entries = readdirSync(EXAMPLES_SOURCE);

  // Handle root level files first
  const rootFiles = entries
    .filter((entry) => {
      const fullPath = join(EXAMPLES_SOURCE, entry);
      return statSync(fullPath).isFile() && (entry.endsWith(".ts") || entry.endsWith(".prisma"));
    })
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

  if (rootFiles.length > 0) {
    categories.push({
      slug: "general",
      title: "General",
      items: rootFiles,
    });
  }

  // Handle directories
  const directories = entries.filter((entry) => {
    const fullPath = join(EXAMPLES_SOURCE, entry);
    return statSync(fullPath).isDirectory();
  });

  for (const dir of directories) {
    const dirPath = join(EXAMPLES_SOURCE, dir);
    const items = scanDirectoryRecursive(dirPath, `/content/examples/${dir}`);
    
    if (items.length > 0) {
      categories.push({
        slug: slugify(dir),
        title: titleCase(dir),
        items: items as ExampleMetadata[],
      });
    }
  }

  return categories;
}

function getPackageVersion(): string {
  try {
    const packageJson = JSON.parse(readFileSync(PACKAGE_JSON, "utf-8"));
    return packageJson.version || "unknown";
  } catch (error) {
    console.warn("⚠️  Could not read package version", error);
    return "unknown";
  }
}

function generateMetadata() {
  console.log("📝 Generating content metadata...");

  const version = getPackageVersion();
  const metadata: ContentMetadata = {
    version,
    docs: generateDocsMetadata(),
    examples: generateExamplesMetadata(),
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(metadata, null, 2));

  const totalDocs = metadata.docs.reduce((sum, category) => sum + category.items.length, 0);
  const totalExamples = metadata.examples.reduce((sum, category) => sum + category.items.length, 0);
  
  console.log(
    `✅ Generated metadata for ${totalDocs} docs in ${metadata.docs.length} categories and ${totalExamples} examples in ${metadata.examples.length} categories`
  );
  console.log(`📦 Package version: ${version}`);
  console.log(`📄 Written to ${OUTPUT_FILE}`);
}

generateMetadata();
