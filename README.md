# DevX

A complete toolkit for web developers, packaged as a browser extension for Chromium browsers (Chrome, Edge, Brave, Opera).

It bundles **51 tools** across **11 categories** plus 3 dedicated panels (image editor, network interceptor, and screen recorder). The goal is to replace a pile of single-purpose extensions (color picker, font finder, screenshot, cookie editor, etc.) with one unified package.

**Repository:** https://github.com/revoltz-dev/DevX

---

## Installation

Not yet published on the Chrome Web Store. To install manually:

1. Download or clone this repository:
   ```bash
   git clone https://github.com/revoltz-dev/DevX.git
   ```
2. Open `chrome://extensions` in your browser
3. Enable **Developer mode** (top right corner)
4. Click **Load unpacked** and select the project folder
5. Pin the DevX icon to the extensions bar

---

## Features

### Colors
- **Color Picker** — grab the exact color of any pixel on the page or pick from a palette
- **WCAG Contrast** — check the contrast ratio between two colors for accessibility
- **Force Dark Mode** — invert site colors to simulate dark mode
- **CSS Variables** — list every custom property (`--varname`) defined on the page

### Typography
- **What Font** — identify font, size, and weight by hovering over text
- **Swap Font** — replace every font on the site with another (with favorites and recents)
- **Word Count** — count words, characters, and lines in the content
- **Edit Text** — make every text on the page editable via `contenteditable`
- **Lorem Ipsum** — generate placeholder text with configurable lengths

### Layout
- **Grid Overlay** — show a customizable column grid overlay
- **Ruler** — measure pixel distances between two clicked points
- **Box Model** — inspect margin, padding, and border on hover
- **Element Outline** — outline elements by type (div, img, etc.) in distinct colors
- **Mobile View** — emulate mobile viewports (iPhone/Android)
- **Z-Index Map** — visualize the hierarchy of elements with z-index set

### Media
- **Save Image** — export images as PNG, JPG, or WEBP, with crop and filters in the built-in editor
- **Image ↔ Base64** — convert image URLs to base64 and back
- **Screenshot** — capture the visible area, full page, or a specific element
- **Screen Recorder** — record screen, window, or tab with system audio and mic, with pause/resume
- **Images Without Alt** — highlight images missing the `alt` attribute for accessibility review
- **Lazy Load Checker** — detect images without `loading="lazy"`
- **QR Code** — generate a QR Code for the current URL to open on your phone

### SEO
- **Meta Tags** — list every meta tag (`<meta>`, Open Graph, Twitter Card)
- **External Links** — enumerate all external links on the page
- **Headings** — show the H1–H6 hierarchy to validate semantic structure
- **Robots.txt** — fetch and display the domain's `/robots.txt`
- **Sitemap** — locate and display `sitemap.xml`
- **Open Graph Preview** — simulate how the link would appear on social media

### Inspection
- **Iframes** — detect and list all iframes on the page in real time
- **Remove Element** — click to delete elements from the DOM
- **Element Count** — count every tag (`<div>`, `<p>`, `<img>`, etc.)
- **Requests** — list every resource loaded (CSS, JS, images, APIs)
- **Interceptor** — intercept XHR, Fetch, and WebSocket in real time with header and body details
- **View Source** — open the tab's HTML source in a new window
- **Tech Stack** — detect frameworks (React, Vue, Angular), libraries, and versions

### Storage
- **Clear Storage** — wipe localStorage, sessionStorage, and cookies in one go
- **Storage Viewer** — browse, edit, and delete items in localStorage and sessionStorage
- **Cookie Editor** — manage cookies (name, value, expiration, domain)

### Performance
- **Page Speed** — show TTFB, DOM Ready, Load Time, resource count, and transfer size
- **Security Headers** — check for CSP, HSTS, X-Frame-Options and give a 0–100% score
- **Disable JS** — turn off JavaScript on the tab to simulate no-JS scenarios
- **Disable CSS** — strip every stylesheet from the page
- **Unprotect** — remove anti-copy, anti-right-click, selection blockers, and devtools blockers

### Generators
- **Data Generator** — passwords, fake person (name, CPF, RG, address), credit card (Visa/Master/Amex), CPF/CNPJ, UUID
- **Hash Generator** — SHA-1, SHA-256, and SHA-512 for any input
- **Timestamp** — convert unix timestamp ↔ human date and generate ISO 8601
- **Base64 Encode/Decode** — encode and decode text in Base64
- **Console Logger** — capture and display `console.log` in a dedicated panel (log/warn/error)

### Utilities
- **JSON Formatter** — format and highlight JSON with a tree viewer
- **Translate Page** — open the current page in Google Translate

---

## Dedicated panels

### Image Editor
Dedicated panel that opens for every screenshot or captured image. Offers:
- Crop (free-form and proportional)
- Annotations (lines, rectangles, arrows)
- Zoom, undo/redo
- Export as PNG, download or copy to clipboard

### Network Interceptor
Panel for capturing traffic in real time:
- Captures XHR, Fetch, and WebSocket
- Filters by type, URL, and iframe
- Detailed view of headers, payload, and response with syntax highlighting
- Export the log in HAR format

### Screen Recorder
Full recording with:
- Capture full screen, window, or tab
- System audio + microphone
- Pause/resume controls and HH:MM:SS timer
- Output in WebM, download or copy to clipboard

---

## Interface

- **Main popup** (360×520) with a categorized menu
- Quick search by tool name
- **All**, **Recent**, and **Favorites** tabs (mark with the star)
- Top bar with favicon, title, and URL of the active tab, plus buttons to open the popup in a floating window
- Settings to enable/disable tools and define the default output (built-in editor vs. direct download)

---

## Permissions

The extension requests the following permissions, each with a specific purpose:

| Permission | Used for |
|------------|----------|
| `activeTab`, `scripting` | Running tools on the current page |
| `cookies` | Cookie Editor and Clear Storage |
| `storage` | Saving favorites, settings, and recents |
| `downloads` | Exporting screenshots, recordings, and files |
| `tabs`, `webNavigation` | Tab info and navigation |
| `contextMenus` | Right-click menus |
| `history`, `topSites`, `bookmarks` | Navigation features and shortcuts |
| `system.cpu`, `system.memory`, `system.display` | System info shown in the popup |
| `clipboardWrite` | Copying colors, text, and generated data |
| `<all_urls>` | Working on any site |

---

## Tech stack

- **Manifest V3** (Chrome Extensions)
- Pure JavaScript (no framework or build step)
- Service worker in `background.js`
- Content script in `content.js` injected at `document_start`
- Dedicated pages: `popup.html`, `editor.html`, `interceptor.html`, `recorder.html`

---

## Project structure

```
DevX/
├── manifest.json           # Extension config (MV3)
├── background.js           # Service worker
├── content.js              # Script injected into every page
├── inject.js               # Page-world script (world: MAIN)
├── popup.html / popup.js   # Main UI
├── editor.html / editor.js # Image editor
├── interceptor.html / interceptor.js / interceptor-inject.js
├── recorder.html / recorder.js
└── icons/
```

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

## License

[MIT](LICENSE) — free to use, including commercially, as long as the copyright notice is preserved.
