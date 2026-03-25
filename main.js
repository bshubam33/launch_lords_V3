// All JavaScript animations and Three.js scrubbing logic has been removed as per the simplified looping video request.
console.log("Launch Lords minimal video engine loaded.");

// Modal Logic & Form Submission
document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("open-audit-modal");
    const closeBtn = document.getElementById("close-audit-modal");
    const modal = document.getElementById("audit-modal");
    
    // Success Modal elements
    const successModal = document.getElementById("success-modal");
    const closeSuccessBtn = document.getElementById("close-success-modal");

    // Form elements
    const form = document.getElementById("audit-form-element");
    const submitBtn = form ? form.querySelector(".btn-submit") : null;

    if (openBtn && closeBtn && modal) {
        openBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.add("active");
        });

        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });

        // Close when clicking outside of modal content
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }

    if (successModal && closeSuccessBtn) {
        closeSuccessBtn.addEventListener("click", () => {
            successModal.classList.remove("active");
        });

        // Close when clicking outside of success modal content
        successModal.addEventListener("click", (e) => {
            if (e.target === successModal) {
                successModal.classList.remove("active");
            }
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            if (submitBtn) {
                submitBtn.textContent = "Sending...";
                submitBtn.disabled = true;
            }

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            fetch("https://formsubmit.co/ajax/founders@launchlords.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                // Success
                if (modal) modal.classList.remove("active");
                if (successModal) successModal.classList.add("active");
                form.reset();
                if (submitBtn) {
                    submitBtn.textContent = "Launch Audit";
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                console.error("Error:", error);
                if (submitBtn) {
                    submitBtn.textContent = "Try Again";
                    submitBtn.disabled = false;
                }
            });
        });
    }

    // Footer Scroll Animation Logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    const footerTargetSelectors = [
        '.bottom-bar h4', 
        '.bottom-bar .team-member', 
        '.bottom-bar .social-links-row', 
        '.bottom-bar .queries-text', 
        '.bottom-bar .footer-meta'
    ].join(', ');

    const footerElements = document.querySelectorAll(footerTargetSelectors);
    
    footerElements.forEach((el, index) => {
        el.classList.add('fade-up');
        // Add a slight stagger delay for a cascading effect
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});
