document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Contact Copy Interaction
  const copyItems = document.querySelectorAll(".copyable");
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toast-text");

  copyItems.forEach((item) => {
    item.addEventListener("click", () => {
      const textToCopy = item.getAttribute("data-copy");
      const label = item.getAttribute("data-label");

      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          showToast(`Copied: ${label}`);
        })
        .catch((err) => {
          console.error("Copy error: ", err);
          showToast("Failed to copy");
        });
    });
  });

  function showToast(message) {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  // Print Resume Action
  const printBtn = document.getElementById("print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Dynamic Hover Glow Effect for Experience Cards
  const cards = document.querySelectorAll(".glass-card, .timeline-item, .project-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // Avatar Lightbox Modal
  const avatarImg = document.getElementById("avatar-img");
  const modal = document.getElementById("avatar-modal");
  const modalClose = document.getElementById("modal-close");

  if (avatarImg && modal && modalClose) {
    avatarImg.addEventListener("click", () => {
      modal.style.display = "flex";
      // Force reflow
      modal.offsetWidth;
      modal.classList.add("show");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });

    const closeModal = () => {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
      document.body.style.overflow = ""; // Restore scrolling
    };

    modalClose.addEventListener("click", closeModal);
    
    // Close modal by clicking outside the image
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close modal by pressing Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
      }
    });
  }
});
