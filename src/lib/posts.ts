import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export interface PostData {
  id: string;
  date: string;
  title: string;
  category?: string;
  contentHtml?: string;
  [key: string]: any;
}

// Helper to recursively get all markdown files
function getAllMarkdownFiles(
  dirPath: string,
  fileList: string[] = [],
): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else {
      if (file.endsWith(".md")) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

export function getSortedPostsData() {
  // Create dir if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const allFiles = getAllMarkdownFiles(postsDirectory);

  const allPostsData = allFiles.map((fullPath) => {
    // Read markdown file as string
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Get id from filename (without extension)
    // We assume filenames are unique across folders for simplicity
    const id = path.basename(fullPath, ".md");

    // Automatically determine category from folder name if not specified
    const relativePath = path.relative(postsDirectory, fullPath);
    const folderCategory = path.dirname(relativePath);
    const category =
      matterResult.data.category ||
      (folderCategory !== "." ? capitalize(folderCategory) : "General");

    // Combine the data with the id
    return {
      id,
      category,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function getPostData(id: string) {
  // We need to find the file because it could be in any subdirectory
  const allFiles = getAllMarkdownFiles(postsDirectory);
  const fullPath = allFiles.find((file) => path.basename(file, ".md") === id);

  if (!fullPath) {
    throw new Error(`Post not found: ${id}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  let contentHtml = processedContent.toString();

  // Remove the first h1 tag to avoid duplication with page title
  contentHtml = contentHtml.replace(/<h1[^>]*>.*?<\/h1>/, "");

  // Determine category
  const relativePath = path.relative(postsDirectory, fullPath);
  const folderCategory = path.dirname(relativePath);
  const category =
    matterResult.data.category ||
    (folderCategory !== "." ? capitalize(folderCategory) : "General");

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    category,
    ...(matterResult.data as { date: string; title: string }),
  };
}
