# Bryson Weaver Portfolio Page

This is a personal portfolio homepage for introducing myself, showing skills, linking to featured resources, displaying projects, and providing a contact form.

## Overview

The page is built as a simple static website. It includes:

- An about section
- A dynamically generated skills list
- Featured university and project links
- A dynamically generated projects table
- A contact form with a JavaScript alert
- A welcome modal
- A dark mode toggle saved with `localStorage`

## Languages and Libraries

- HTML: page structure and content
- CSS: layout, colors, responsive design, dark mode styles, and table styling
- JavaScript: dynamic project rendering, skills rendering, modal behavior, dark mode, and contact form interaction

No external JavaScript or CSS libraries are required.

## Dependencies

This project does not require installed dependencies, package managers, or a build step.

Runtime requirements:

- A modern web browser, such as Chrome, Edge, Firefox, or Safari
- Internet access for placeholder images loaded from `https://placehold.co`

Project files:

- `index.html`: main portfolio page
- `styles.css`: page styling
- `script.js`: page interactions and dynamic content

## How to Run

Open `index.html` in a web browser.

You can also run it with a local development server if you prefer:

```bash
python3 -m http.server
```

Then visit:

```text
http://localhost:8000
```

## Notes

The projects table is filled dynamically from an array in `script.js`. To add or remove projects, edit the `projects` array.
