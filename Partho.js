/*=Navigation bar=*/
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("mainNavbar");
    const navLinks = document.querySelectorAll(
        "#mainNavbar .nav-link:not(.dropdown-toggle)"
    );

    // Highlight the selected navigation link
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.forEach(function (item) {
                item.classList.remove("active");
                item.removeAttribute("aria-current");
            });

            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        });
    });

    // Close the mobile menu after selecting a navigation link
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (
                window.innerWidth < 992 &&
                navbar.classList.contains("show")
            ) {
                const collapse = bootstrap.Collapse.getOrCreateInstance(navbar);
                collapse.hide();
            }
        });
    });

    // Add shadow when the page is scrolled
    const header = document.querySelector(".partholab-navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 20) {
            header.style.boxShadow = "0 8px 30px rgba(0,0,0,0.35)";
        } else {
            header.style.boxShadow = "0 8px 35px rgba(0,0,0,0.18)";
        }
    });
});

/*=Hero bar=*/
document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll for internal links
    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });
            }
        });
    });

    // Subtle glow follows the pointer on desktop
    const hero = document.querySelector(".hero-section");

    hero.addEventListener("pointermove", function (event) {
        if (event.pointerType === "touch") return;

        const rect = hero.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        hero.style.setProperty("--pointer-x", `${x}px`);
        hero.style.setProperty("--pointer-y", `${y}px`);
    });
});

/*=About Us bar=*/
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const statsSection = document.querySelector("#about-stats");

    let hasAnimated = false;

    function animateCounters() {
        if (hasAnimated) return;

        hasAnimated = true;

        counters.forEach((counter) => {
            const target = Number(counter.dataset.target);
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Smooth ease-out animation
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(target * easedProgress);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // Start counters when statistics become visible
    if ("IntersectionObserver" in window && statsSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.25 }
        );

        observer.observe(statsSection);
    } else {
        animateCounters();
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});

/*=Services bar=*/
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const serviceItems = document.querySelectorAll(".service-item");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            // Update active filter button
            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            // Show matching services
            serviceItems.forEach((item) => {
                const category = item.dataset.category;
                const shouldShow =
                    selectedFilter === "all" || category === selectedFilter;

                item.classList.toggle("is-hidden", !shouldShow);
            });
        });
    });

    // Smooth scroll for section links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});

/*=1-Web-Development Section bar=*/
document.addEventListener("DOMContentLoaded", () => {
    const editorTabs = document.querySelectorAll(".editor-tab");
    const codeSamples = document.querySelectorAll(".code-sample");

    // Interactive code editor tabs
    editorTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const selectedCode = tab.dataset.code;

            // Remove active class from all tabs
            editorTabs.forEach((item) => {
                item.classList.remove("active");
            });

            // Hide all code samples
            codeSamples.forEach((sample) => {
                sample.classList.remove("active");
            });

            // Activate selected tab
            tab.classList.add("active");

            // Show matching code
            const selectedSample = document.querySelector(
                `[data-sample="${selectedCode}"]`
            );

            if (selectedSample) {
                selectedSample.classList.add("active");
            }
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});

/*=2-UI/UX Section=*/
document.addEventListener("DOMContentLoaded", () => {
    // ===== Interactive Color Palette =====
    const designBoard = document.querySelector(".design-board");
    const paletteButtons = document.querySelectorAll(".palette-btn");
    const previewTitle = document.querySelector("#preview-title");
    const previewDescription = document.querySelector(
        "#preview-description"
    );
    const previewButton = document.querySelector("#preview-button");

    const themes = {
        lime: {
            title: 'Design a life <span>you love.</span>',
            description: "Thoughtful experiences start with a simple idea.",
            button: "Get Inspired"
        },

        pink: {
            title: 'Make room for <span>creativity.</span>',
            description: "Bring bold ideas to life with expressive design.",
            button: "Explore Ideas"
        },

        blue: {
            title: 'Imagine what is <span>possible.</span>',
            description: "A clear vision creates a better digital journey.",
            button: "Discover More"
        }
    };

    paletteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedTheme = button.dataset.theme;
            const theme = themes[selectedTheme];

            designBoard.dataset.theme = selectedTheme;

            paletteButtons.forEach((item) => {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            previewTitle.innerHTML = theme.title;
            previewDescription.textContent = theme.description;
            previewButton.innerHTML =
                `${theme.button} <i class="bi bi-arrow-up-right"></i>`;
        });
    });

    // Demo interaction for preview button
    previewButton.addEventListener("click", () => {
        const board = document.querySelector(".design-board");
        board.classList.remove("preview-pulse");

        // Restart a brief visual response
        void board.offsetWidth;
        board.classList.add("preview-pulse");
    });

    // ===== Design Process Tabs =====
    const processTabs = document.querySelectorAll(".process-tab");
    const processKicker = document.querySelector(".process-kicker");
    const processTitle = document.querySelector("#process-title");
    const processDescription = document.querySelector(
        "#process-description"
    );
    const processChecklist = document.querySelector("#process-checklist");

    const processContent = {
        discover: {
            kicker: "STEP 01 / RESEARCH",
            title: "First, we listen.",
            description: "We learn about your business, audience, goals, and challenges to understand what a successful experience should achieve.",
            checklist: [
                "Understand user needs",
                "Identify key challenges",
                "Define project goals"
            ]
        },

        define: {
            kicker: "STEP 02 / STRATEGY",
            title: "Find the right direction.",
            description: "We organize the research into a clear plan, establish priorities, and map the journey users will take through your product.",
            checklist: [
                "Create user personas",
                "Map user journeys",
                "Prioritize features"
            ]
        },

        design: {
            kicker: "STEP 03 / CREATION",
            title: "Turn ideas into interfaces.",
            description: "We develop wireframes, visual systems, and interactive prototypes that bring the proposed experience to life.",
            checklist: [
                "Build wireframes",
                "Develop visual concepts",
                "Create interactive prototypes"
            ]
        },

        test: {
            kicker: "STEP 04 / VALIDATION",
            title: "Make every detail better.",
            description: "We test the design with users, identify usability issues, and refine the experience using feedback.",
            checklist: [
                "Test usability",
                "Review user feedback",
                "Refine the design"
            ]
        }
    };

    processTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const selectedStep = tab.dataset.step;
            const content = processContent[selectedStep];

            processTabs.forEach((item) => {
                item.classList.remove("active");
                item.setAttribute("aria-selected", "false");
            });

            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");

            processKicker.textContent = content.kicker;
            processTitle.textContent = content.title;
            processDescription.textContent = content.description;

            processChecklist.replaceChildren();

            content.checklist.forEach((text) => {
                const item = document.createElement("span");
                const icon = document.createElement("i");

                icon.className = "bi bi-check2";
                item.append(icon, document.createTextNode(text));

                processChecklist.appendChild(item);
            });
        });
    });

    // ===== Smooth Internal Navigation =====
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});

/*=3-Digital Solutions Section=*/
const serviceDetails = {
    "Web Development": {
        title: "Web Development",
        description: "We create responsive business websites, landing pages, e-commerce stores, and web applications. Our focus is on clean code, strong performance, accessibility, and a smooth experience across devices."
    },

    "Mobile App Solutions": {
        title: "Mobile App Solutions",
        description: "From app concepts to polished mobile experiences, we help shape solutions with intuitive navigation, responsive layouts, useful integrations, and a consistent experience across supported devices."
    },

    "UI/UX & Product Design": {
        title: "UI/UX & Product Design",
        description: "We turn ideas into user-focused digital products through research, wireframes, visual design, interactive prototypes, and usability testing."
    },

    "Cloud & IT Solutions": {
        title: "Cloud & IT Solutions",
        description: "We help businesses plan dependable digital infrastructure, cloud deployments, system integrations, and practical IT improvements with security and scalability in mind."
    }
};

const modal = document.getElementById("solutionModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");

let lastFocusedElement = null;

// Open the matching service details
document.querySelectorAll(".solution-link").forEach((button) => {
    button.addEventListener("click", () => {
        const serviceName = button.dataset.service;
        const details = serviceDetails[serviceName];

        if (!details) return;

        lastFocusedElement = button;

        modalTitle.textContent = details.title;
        modalDescription.textContent = details.description;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        modalClose.focus();
    });
});

// Close the modal
function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

modalClose.addEventListener("click", closeModal);

// Close when clicking outside the panel
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Close with Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});

// Reveal service cards when they enter the viewport
const cards = document.querySelectorAll(".solution-card");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("card-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 }
    );

    cards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(22px)";
        card.style.transition =
            "opacity 0.6s ease, transform 0.6s ease, border-color 0.35s ease, box-shadow 0.35s ease";

        observer.observe(card);
    });

    // Add visible state styles through a stylesheet class
    const revealStyle = document.createElement("style");
    revealStyle.textContent = `
    .solution-card.card-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .solution-card.card-visible:hover {
      transform: translateY(-9px) !important;
    }
  `;
    document.head.appendChild(revealStyle);
} else {
    cards.forEach((card) => {
        card.style.opacity = "1";
        card.style.transform = "none";
    });
}

/*=Project Seaction  bar=*/
// PROJECT CATEGORY FILTER

const filterButtons = document.querySelectorAll(".project-filter");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Active button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Selected category
        const filterValue = button.dataset.filter;

        // Show matching projects
        projectItems.forEach(item => {

            const category = item.dataset.category;

            if (filterValue === "all" || category === filterValue) {

                item.classList.remove("hide");
                item.classList.add("show");

            } else {

                item.classList.add("hide");
                item.classList.remove("show");

            }

        });

    });

});


// PROJECT DETAILS MODAL

const projectButtons = document.querySelectorAll(".project-open");

const projectModalElement = document.getElementById("projectModal");

const projectModal = new bootstrap.Modal(projectModalElement);

const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");

projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        const title = button.dataset.title;
        const category = button.dataset.category;
        const description = button.dataset.description;

        modalTitle.textContent = title;
        modalCategory.textContent = category;
        modalDescription.textContent = description;

        projectModal.show();

    });

});

/*=Blogs Seaction  bar=*/
// BLOG CATEGORY FILTER

const blogFilters = document.querySelectorAll(".blog-filter");

const blogItems = document.querySelectorAll(".blog-item");

const blogSearch = document.getElementById("blogSearch");

const noResults = document.getElementById("noResults");

const articleCount = document.getElementById("articleCount");

let selectedCategory = "all";


// FILTER AND SEARCH FUNCTION

function filterBlogs() {

    const searchValue = blogSearch.value.toLowerCase().trim();

    let visibleCount = 0;

    blogItems.forEach(item => {

        const category = item.dataset.category;

        const title = item.dataset.title.toLowerCase();

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const matchesSearch =
            title.includes(searchValue);

        if (matchesCategory && matchesSearch) {

            item.classList.remove("hide");

            item.classList.add("show");

            visibleCount++;

        } else {

            item.classList.add("hide");

            item.classList.remove("show");

        }

    });

    // Update article count
    articleCount.textContent = visibleCount + " Articles";

    // Show no result message
    noResults.style.display =
        visibleCount === 0 ? "block" : "none";

}


// CATEGORY BUTTONS

blogFilters.forEach(button => {

    button.addEventListener("click", () => {

        blogFilters.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.filter;

        filterBlogs();

    });

});


// LIVE SEARCH

blogSearch.addEventListener("input", filterBlogs);


// BLOG ARTICLE MODAL

const blogModalElement = document.getElementById("blogModal");

const blogModal = new bootstrap.Modal(blogModalElement);

const modalImage = document.getElementById("modalImage");

const modalTitle = document.getElementById("modalTitle");

const modalCategory = document.getElementById("modalCategory");

const modalDescription = document.getElementById("modalDescription");


// Open modal from any Read More button

document.querySelectorAll(".read-more, .read-featured")
    .forEach(button => {

        button.addEventListener("click", () => {

            modalTitle.textContent = button.dataset.title;

            modalCategory.textContent = button.dataset.category;

            modalDescription.textContent =
                button.dataset.description;

            modalImage.src = button.dataset.image;

            modalImage.alt = button.dataset.title;

            blogModal.show();

        });

    });


// Clear image when modal closes

blogModalElement.addEventListener("hidden.bs.modal", () => {

    modalImage.removeAttribute("src");

});

/*=Contact Seaction bar=*/
// CONTACT FORM

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

const sendButton = document.querySelector(".send-btn");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get input values
    const name = document.getElementById("userName").value.trim();

    const email = document.getElementById("userEmail").value.trim();

    const phone = document.getElementById("userPhone").value.trim();

    const service = document.getElementById("userService").value;

    const subject = document.getElementById("userSubject").value.trim();

    const message = document.getElementById("userMessage").value.trim();

    const agreement = document.getElementById("userAgreement").checked;


    // Hide old message
    formMessage.className = "form-message";

    formMessage.textContent = "";


    // Name validation
    if (name.length < 2) {

        showError("Please enter a valid name.");

        return;

    }


    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showError("Please enter a valid email address.");

        return;

    }


    // Phone validation (optional)
    if (phone && !/^[0-9+\-\s()]{7,20}$/.test(phone)) {

        showError("Please enter a valid phone number.");

        return;

    }


    // Service validation
    if (service === "") {

        showError("Please select a service.");

        return;

    }


    // Subject validation
    if (subject.length < 3) {

        showError("Please enter a subject.");

        return;

    }


    // Message validation
    if (message.length < 10) {

        showError("Message must contain at least 10 characters.");

        return;

    }


    // Checkbox validation
    if (!agreement) {

        showError("Please agree to be contacted.");

        return;

    }


    // Frontend demo success
    formMessage.className = "form-message success";

    formMessage.textContent =
        "Thank you, " + name +
        "! Your form passed validation. Connect a backend to send your enquiry.";

    // Reset form
    contactForm.reset();

});


// ERROR FUNCTION

function showError(text) {

    formMessage.className = "form-message error";

    formMessage.textContent = text;

}

/*=Signin bar=*/

const signinForm = document.getElementById("signinForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formMessage = document.getElementById("formMessage");

// Show / Hide Password
document.getElementById("togglePassword").addEventListener("click", function () {

    if (password.type === "password") {
        password.type = "text";
        this.innerHTML = '<i class="bi bi-eye-slash"></i>';
        this.setAttribute("aria-label", "Hide password");
    } else {
        password.type = "password";
        this.innerHTML = '<i class="bi bi-eye"></i>';
        this.setAttribute("aria-label", "Show password");
    }
});

// Sign In Form Validation
signinForm.addEventListener("submit", function (event) {

    event.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";
    formMessage.textContent = "";

    let isValid = true;

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Please enter a valid email.";
        isValid = false;
    }

    if (passwordValue === "") {
        passwordError.textContent = "Password is required.";
        isValid = false;
    } else if (passwordValue.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        isValid = false;
    }

    if (isValid) {
        formMessage.style.color = "#c5ff6b";
        formMessage.textContent =
            "Form validated! Connect a backend to authenticate your account.";
    }
});

// Forgot Password Demo
document.getElementById("forgotPassword").addEventListener("click", function (event) {
    event.preventDefault();
    alert("Please connect a password reset service to continue.");
});

// Social Login Demo
document.getElementById("googleLogin").addEventListener("click", function () {
    alert("Google login requires OAuth setup.");
});

document.getElementById("githubLogin").addEventListener("click", function () {
    alert("GitHub login requires OAuth setup.");
});

/*=Get Started=*/
const getStartedForm = document.getElementById("getStartedForm");

getStartedForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get input values
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;

    // Error elements
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const serviceError = document.getElementById("serviceError");

    const successMessage = document.getElementById("successMessage");

    // Clear previous messages
    nameError.textContent = "";
    emailError.textContent = "";
    serviceError.textContent = "";
    successMessage.textContent = "";

    let isValid = true;

    // Name validation
    if (name === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Please enter your email.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email.";
        isValid = false;
    }
// Service validation
    if (service === "") {
        serviceError.textContent = "Please select a service.";
        isValid = false;
    }

    // Final result
    if (isValid) {
        successMessage.textContent =
            "Thank you, " + name + "! Your project details are ready.";

        getStartedForm.reset();
    }

});


/*=Footer Seaction bar=*/
// Dynamic Copyright Year
document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// Newsletter Form
const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const emailInput = document.getElementById("newsletterEmail");
    const message = document.getElementById("newsletterMessage");

    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        message.textContent = "Please enter your email address.";
        return;
    }

    if (!emailPattern.test(email)) {
        message.textContent = "Please enter a valid email address.";
        return;
    }

    message.textContent = "Thank you! Your email is ready for subscription.";

    newsletterForm.reset();

});


// Back To Top
const backToTop = document.getElementById("backToTop");

backToTop.addEventListener("click", function(event) {

    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
