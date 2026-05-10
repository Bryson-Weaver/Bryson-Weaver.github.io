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

    const projects = [
      {
        title: "Bank Account Project",
        summary: "A simple bank account management system implemented in Java.",
        image: "https://placehold.co/600x400",
        link: "https://github.com/Bryson-Weaver/Bank-Account-Project",
      },
      {
        title: "Department Store Inventory System",
        summary: "A PHP-based inventory management system for a One Piece Themed store.",
        image: "https://placehold.co/600x400",
        link: "https://github.com/Bryson-Weaver/PHP-Dept-Store-Project",
      },
      {
        title: "Pandas and Charting Project",
        summary: "A data analysis and visualization project using Python's Pandas library.",
        image: "https://placehold.co/600x400",
        link: "https://github.com/Bryson-Weaver/Advanced-Pandas-and-Charting",
      },
    ];

    const projectsSection = document.querySelector("#projects");
    const projectList = projectsSection
      ? projectsSection.querySelector("#project-list")
      : null;
    if (projectList) {
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const row = document.createElement("tr");
        const titleCell = document.createElement("td");
        const summaryCell = document.createElement("td");
        const imageCell = document.createElement("td");
        const linkCell = document.createElement("td");
        const image = document.createElement("img");
        const link = document.createElement("a");

        titleCell.textContent = project.title;
        summaryCell.textContent = project.summary;
        image.src = project.image;
        image.alt = project.title;
        link.href = project.link;
        link.textContent = "View Project";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        imageCell.appendChild(image);
        linkCell.appendChild(link);
        row.append(titleCell, summaryCell, imageCell, linkCell);
        projectList.appendChild(row);
      }
    }

    /**
     * Featured panels visibility from project count.
     */
    const projectCount = projects.length;
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
