# My Personal Website

This is a Next.js project bootstrapped with `create-next-app`, designed for GitHub Pages hosting.

## Features

- **Blog**: Write articles in Markdown with `gray-matter` for metadata. Located in `src/content/blog`.
- **Resume**: A timeline-style resume page.
- **Publications**: Placeholder for publication list.
- **Dark Mode**: Automatic and toggleable dark mode.
- **Static Export**: Configured for GitHub Pages.

## How to add a new blog post

1. Create a new markdown file in `src/content/blog/`.
2. Add frontmatter at the top:
   ```yaml
   ---
   title: "My New Post"
   date: "2024-03-20"
   description: "A short description."
   ---
   ```
3. Write your content below.
4. Commit and push!

## Deployment

This repository uses GitHub Actions to automatically deploy to GitHub Pages.

1. Push your changes to the `main` branch.
2. Go to your repository **Settings** > **Pages**.
3. Under **Source**, ensure "GitHub Actions" is selected (or it might be auto-selected).
4. View your site at `https://bouc615.github.io`.

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
