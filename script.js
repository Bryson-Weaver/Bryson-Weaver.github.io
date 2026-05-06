/**
 * ============================================
 * Minimal DOM demo
 * ============================================
 *
 * This file demonstrates a few common DOM tasks:
 * - Dynamically adding an element to the page (createElement + appendChild)
 * - Selecting and modifying existing elements (querySelector + getElementById)
 * - Intercepting a form submit (preventDefault) and showing a timed confirmation
 *
 * Because `index.html` loads this script with `defer`, the DOM is already parsed.
 * We still use `DOMContentLoaded` to keep the behavior safe if the script tag changes later.
 */
document.addEventListener(
  "DOMContentLoaded",
  () => {
    /**
     * ============================================
     * Dark mode toggle (slider)
     * ============================================
     *
     * This block wires up the checkbox at the top of the page so it can switch
     * between the default theme and the dark theme.
     *
     * How it works:
     * - The CSS defines dark theme variables under `body.dark-mode { ... }`
     * - When the checkbox is checked, we add the `dark-mode` class to `<body>`
     * - We store the choice in `localStorage` so it persists after refresh
     */
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const storageKey = "preferredTheme";

    if (darkModeToggle instanceof HTMLInputElement) {
      const savedTheme = localStorage.getItem(storageKey);
      const shouldUseDark = savedTheme === "dark";

      document.body.classList.toggle("dark-mode", shouldUseDark);
      darkModeToggle.checked = shouldUseDark;

      darkModeToggle.addEventListener("change", () => {
        const isDark = darkModeToggle.checked;
        document.body.classList.toggle("dark-mode", isDark);
        localStorage.setItem(storageKey, isDark ? "dark" : "light");
      });
    }

    /**
     * ============================================
     * Page header greeting
     * ============================================
     *
     * Prompts the visitor for a name and updates the `<h1 id="page-header">`
     * with a personalized greeting. If the user cancels or submits a blank name,
     * we fall back to a generic welcome message.
     */
    const headerEl = document.getElementById("page-header");
    if (headerEl) {
      const name = window.prompt("Please enter your name:");
      const trimmed = typeof name === "string" ? name.trim() : "";
      headerEl.textContent =
        trimmed.length > 0
          ? `Welcome to My Homepage, ${trimmed}!`
          : "Welcome to My Homepage!";
    }

    /**
     * ============================================
     * 1) Dynamically add a new paragraph to Projects
     * ============================================
     *
     * Creates a new `<p>` element in JavaScript and appends it to the `#projects` section.
     */
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const p = document.createElement("p");
      p.textContent =
        "Recent project: I'm building a small game tracker to record wins/losses and improve over time.";
      projectsSection.appendChild(p);
    }

    /**
     * ============================================
     * 2) Select + modify at least two existing elements
     * ============================================
     *
     * We select two elements that already exist in the HTML and modify them:
     * - Change the About heading text (content change) using `querySelector()`
     * - Change the Projects section styling (style change) using `getElementById()`
     */
    const aboutHeading = document.querySelector("#about h2");
    if (aboutHeading) {
      aboutHeading.textContent = "About Me (updated with JavaScript)";
    }

    if (projectsSection) {
      projectsSection.style.border = "2px solid #7502a7";
    }

    /**
     * ============================================
     * 3) Timed confirmation for contact form submission
     * ============================================
     *
     * When the user clicks “Send Message”:
     * - Stop the normal form submission (preventDefault)
     * - Add/show a "Sending message..." element dynamically
     * - After ~2.5 seconds, replace it with "Message sent successfully!"
     */
    const contactForm = document.querySelector("#contact form");
    if (contactForm) {
      contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let status = contactForm.querySelector(".form-status");
        if (!status) {
          status = document.createElement("div");
          status.className = "form-status";
          contactForm.appendChild(status);
        }

        status.textContent = "Sending message...";

        window.setTimeout(() => {
          status.textContent = "Message sent successfully!";
        }, 2500);
      });
    }
  },
  { once: true }
);
