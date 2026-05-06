/**
 * Portfolio page interactions — loaded with `defer`; DOMContentLoaded keeps setup safe.
 */
document.addEventListener(
  "DOMContentLoaded",
  () => {
    /**
     * Dark mode: read/write localStorage and sync checkbox + body class.
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
     * Static page title (name prompt replaced by welcome modal).
     */
    const headerEl = document.getElementById("page-header");
    if (headerEl) {
      headerEl.textContent = "Welcome to My Homepage";
    }

    /**
     * Welcome modal on load: semi-transparent backdrop overlay + Close dismisses.
     */
    const welcomeModal = document.getElementById("welcome-modal");
    const welcomeClose = document.getElementById("welcome-modal-close");

    function closeWelcomeModal() {
      if (!welcomeModal) return;
      welcomeModal.hidden = true;
      welcomeModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("welcome-modal-open");
    }

    function openWelcomeModal() {
      if (!welcomeModal) return;
      welcomeModal.hidden = false;
      welcomeModal.removeAttribute("aria-hidden");
      document.body.classList.add("welcome-modal-open");
      if (welcomeClose instanceof HTMLElement) {
        welcomeClose.focus();
      }
    }

    if (welcomeModal && welcomeClose) {
      openWelcomeModal();

      welcomeClose.addEventListener("click", closeWelcomeModal);

      welcomeModal.addEventListener("click", (event) => {
        if (event.target === welcomeModal.querySelector(".welcome-modal__backdrop")) {
          closeWelcomeModal();
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !welcomeModal.hidden) {
          closeWelcomeModal();
        }
      });
    }

    /**
     * Skills list (for loop + DOM).
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
      for (let i = 0; i < skills.length; i++) {
        const li = document.createElement("li");
        li.textContent = skills[i];
        skillsListEl.appendChild(li);
      }
    }

    /**
     * Featured panels visibility from project count.
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
     * Contact form submit: prevent refresh + alert with name.
     */
    const submitBtn = document.getElementById("contact-submit");
    if (submitBtn) {
      submitBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const nameField = document.getElementById("name");
        const rawName = nameField instanceof HTMLInputElement ? nameField.value : "";
        const displayName = rawName.trim() !== "" ? rawName.trim() : "friend";

        alert(`Thank you, ${displayName}, your message has been sent!`);
      });
    }
  },
  { once: true }
);
