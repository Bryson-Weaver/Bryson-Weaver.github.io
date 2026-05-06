/**
 * ============================================
 * Portfolio page interactions
 * ============================================
 *
 * This file contains all JavaScript for the page (kept out of `index.html` so it’s
 * easier to read and maintain).
 *
 * The script is loaded with `defer`, so the HTML is parsed before this runs.
 * We still use `DOMContentLoaded` so the code stays safe even if the script tag
 * is moved later.
 */
document.addEventListener(
  "DOMContentLoaded",
  () => {
    /**
     * ============================================
     * Header greeting (prompt for visitor name)
     * ============================================
     *
     * We ask the visitor for their name and update the page header with a welcome message.
     * If the visitor cancels the prompt or enters only whitespace, we fall back to "Guest".
     */
    const headerEl = document.getElementById("page-header");
    if (headerEl) {
      const visitorName = window.prompt("Please enter your name:");
      const safeName =
        typeof visitorName === "string" && visitorName.trim() !== ""
          ? visitorName.trim()
          : "Guest";
      headerEl.textContent = `Welcome to My Homepage, ${safeName}!`;
    }

    /**
     * ============================================
     * Skills list (dynamic DOM creation)
     * ============================================
     *
     * Builds a bullet list of skills entirely in JavaScript and inserts it into the
     * "About" section. This demonstrates DOM creation with `createElement()` and
     * DOM insertion with `appendChild()`.
     */
    const skills = [
      "HTML",
      "CSS",
      "JavaScript",
      "Git",
      "GitHub",
      "Responsive Design",
    ];
    const skillsListEl = document.getElementById("skills-list");
    if (skillsListEl) {
      const ul = document.createElement("ul");
      ul.className = "skills-bullets";

      for (let i = 0; i < skills.length; i++) {
        const li = document.createElement("li");
        li.textContent = skills[i];
        ul.appendChild(li);
      }

      skillsListEl.appendChild(ul);
    }

    /**
     * ============================================
     * Featured panels visibility (content-based UI)
     * ============================================
     *
     * We count how many project rows exist in the projects table and show/hide featured
     * panels based on that count.
     */
    const projectRows = document.querySelectorAll("#projects tbody tr");
    const projectCount = projectRows.length;
    const universityPanel = document.getElementById("university-resources");
    const personalPanel = document.getElementById("personal-projects-featured");

    if (universityPanel && personalPanel) {
      if (projectCount < 3) {
        universityPanel.classList.add("featured-visible");
        universityPanel.classList.remove("featured-hidden");
        personalPanel.classList.add("featured-visible");
        personalPanel.classList.remove("featured-hidden");
      } else {
        universityPanel.classList.add("featured-hidden");
        universityPanel.classList.remove("featured-visible");
        personalPanel.classList.add("featured-visible");
        personalPanel.classList.remove("featured-hidden");
      }
    }

    /**
     * ============================================
     * Dark mode slider
     * ============================================
     *
     * Toggles the `dark-mode` class on `<body>` when the checkbox is changed.
     * We also store the preference in `localStorage` so it survives page refresh.
     */
    const darkToggle = document.getElementById("dark-mode-toggle");
    const themeStorageKey = "preferredTheme";

    if (darkToggle instanceof HTMLInputElement) {
      const savedTheme = localStorage.getItem(themeStorageKey);
      const shouldUseDark = savedTheme === "dark";

      document.body.classList.toggle("dark-mode", shouldUseDark);
      darkToggle.checked = shouldUseDark;
      darkToggle.setAttribute("aria-checked", shouldUseDark ? "true" : "false");

      darkToggle.addEventListener("change", () => {
        const isDark = darkToggle.checked;
        document.body.classList.toggle("dark-mode", isDark);
        darkToggle.setAttribute("aria-checked", isDark ? "true" : "false");
        localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
      });
    }

    /**
     * ============================================
     * Contact form timed confirmation
     * ============================================
     *
     * Intercepts the form submission so the page doesn’t refresh, shows a temporary
     * “Sending message...” status element, then replaces it with a success message
     * after a short delay.
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
