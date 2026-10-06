/**
 * COOL COMFORT & SOLUTIONS - JAVASCRIPT LOGIC
 * Founder: Vikash Kumar | Primary Contact: 9205329312 / 8882308275
 * Location Coordinates: 28°37'21.1"N 77°20'45.6"E (28.622528, 77.346000)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  initServiceFilters();
  initFaqAccordion();
  initMobileMenu();
  initLiveTicker();
  initHeaderScroll();
  initScrollSpy();
  initSecurity();       // Security features
});

// Primary Contact Numbers
const PRIMARY_WHATSAPP_NUMBER = "919205329312";
const ALT_PHONE_NUMBER = "918882308275";

/* ==========================================================================
   1. BOOKING MODAL LOGIC & WHATSAPP GENERATION
   ========================================================================== */

/**
 * Open the booking popup modal pre-filled with service title
 * @param {string} serviceName - Name of the selected service
 */
function openBookingModal(serviceName) {
  const modal = document.getElementById('bookingModal');
  const serviceInput = document.getElementById('modalSelectedService');
  
  if (serviceInput && serviceName) {
    serviceInput.value = serviceName;
  }
  
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent body background scrolling
  }
}

/**
 * Open booking modal pre-selecting customer's locality/area
 * @param {string} areaName - Locality name
 */
function openBookingModalForArea(areaName) {
  const modal = document.getElementById('bookingModal');
  const serviceInput = document.getElementById('modalSelectedService');
  const areaSelect = document.getElementById('modalCustArea');
  
  if (serviceInput) {
    serviceInput.value = `Doorstep AC/Appliance Service in ${areaName}`;
  }
  
  if (areaSelect && areaName) {
    areaSelect.value = areaName;
  }
  
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close the booking modal
 */
function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal when clicking outside of card
window.addEventListener('click', (e) => {
  const modal = document.getElementById('bookingModal');
  if (e.target === modal) {
    closeBookingModal();
  }
});

// Close modal on 'Escape' key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBookingModal();
  }
});

/**
 * Handle submission from the Interactive Modal Popup
 */
function handleModalSubmit(event) {
  event.preventDefault();

  const service = document.getElementById('modalSelectedService').value.trim();
  const name = document.getElementById('modalCustName').value.trim();
  const phone = document.getElementById('modalCustPhone').value.trim();
  const area = document.getElementById('modalCustArea').value;
  const address = document.getElementById('modalCustAddress').value.trim();
  const timeSlot = document.getElementById('modalPreferredTime').value;
  const brand = document.getElementById('modalApplianceBrand').value;
  const issue = document.getElementById('modalIssueDetails').value.trim();

  if (!name || !phone || !address) {
    showToast("Please fill all required fields (Name, Phone, Address).");
    return;
  }

  // Construct formatted WhatsApp message
  let message = `*❄️ COOL COMFORT & SOLUTIONS ❄️*\n`;
  message += `*NEW SERVICE BOOKING REQUEST*\n\n`;
  message += `👤 *Customer Name:* ${name}\n`;
  message += `📞 *Customer Phone:* ${phone}\n`;
  message += `📍 *Area / Locality:* ${area}\n`;
  message += `🏠 *Address / Flat:* ${address}\n`;
  message += `🔧 *Service Required:* ${service || 'Doorstep Service'}\n`;
  
  if (brand && brand !== 'Not Specified / Any') {
    message += `🏷️ *Brand:* ${brand}\n`;
  }
  
  message += `🕒 *Preferred Time:* ${timeSlot}\n`;
  
  if (issue) {
    message += `📝 *Fault / Notes:* ${issue}\n`;
  }
  
  message += `\n--------------------------------\n`;
  message += `🚀 *Sent via Cool Comfort Website to Vikash Kumar (9205329312)*`;

  // Encode & Open WhatsApp
  const whatsappUrl = `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  
  showToast("Opening WhatsApp with your booking details...");
  
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    closeBookingModal();
    document.getElementById('modalBookingForm').reset();
  }, 600);
}

/**
 * Handle submission from Hero Section Quick Inquiry Form
 */
function handleHeroSubmit(event) {
  event.preventDefault();

  const service = document.getElementById('heroServiceName').value;
  const name = document.getElementById('heroCustName').value.trim();
  const phone = document.getElementById('heroCustPhone').value.trim();
  const area = document.getElementById('heroCustArea').value;
  const note = document.getElementById('heroCustNote').value.trim();

  if (!name || !phone || !area) {
    showToast("Please enter your name, phone and select your area.");
    return;
  }

  let message = `*❄️ COOL COMFORT & SOLUTIONS - QUICK INQUIRY ❄️*\n\n`;
  message += `👤 *Customer Name:* ${name}\n`;
  message += `📞 *Phone Number:* ${phone}\n`;
  message += `📍 *Locality / Area:* ${area}\n`;
  message += `🔧 *Required Service:* ${service}\n`;
  
  if (note) {
    message += `📝 *Requirement / Problem:* ${note}\n`;
  }
  
  message += `\n--------------------------------\n`;
  message += `⚡ *Doorstep Service Request to Vikash Kumar (9205329312)*`;

  const whatsappUrl = `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  
  showToast("Connecting to Vikash Kumar on WhatsApp...");
  
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    document.getElementById('heroQuickForm').reset();
  }, 600);
}

/* ==========================================================================
   2. TOAST NOTIFICATION
   ========================================================================== */
function showToast(text) {
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  
  if (!toast || !toastText) return;
  
  toastText.textContent = text;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   3. BILINGUAL TRANSLATION TOGGLE (ENGLISH / HINDI)
   ========================================================================== */
let currentLanguage = localStorage.getItem('cool_comfort_lang') || 'en';

function initLanguageToggle() {
  const toggleBtn = document.getElementById('langToggle');
  const label = document.getElementById('currentLangLabel');

  // Apply stored language
  applyLanguage(currentLanguage);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
      localStorage.setItem('cool_comfort_lang', currentLanguage);
      applyLanguage(currentLanguage);
    });
  }
}

function applyLanguage(lang) {
  const label = document.getElementById('currentLangLabel');
  if (label) {
    label.textContent = lang === 'en' ? 'हिंदी' : 'English';
  }

  const elementsWithLang = document.querySelectorAll('[data-en][data-hi]');
  elementsWithLang.forEach(el => {
    if (lang === 'hi') {
      el.textContent = el.getAttribute('data-hi');
    } else {
      el.textContent = el.getAttribute('data-en');
    }
  });
}

/* ==========================================================================
   4. SERVICE CATEGORY FILTER
   ========================================================================== */
function initServiceFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const serviceCards = document.querySelectorAll('#acServicesGrid .service-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   6. MOBILE NAVIGATION DRAWER & BACKDROP LOGIC
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileMenuClose');
  const navMenu = document.getElementById('navMenu');
  const backdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  let scrollStartY = 0; // Menu open hote waqt scroll position

  function openMenu() {
    if (navMenu) navMenu.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    if (toggleBtn) {
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
    scrollStartY = window.scrollY; // Current position note karo
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (navMenu) navMenu.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu && navMenu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Nav link click par menu band karo
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Escape key par menu band karo
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // Scroll par auto-close — 100px scroll hone par menu band ho
  window.addEventListener('scroll', () => {
    if (navMenu && navMenu.classList.contains('active')) {
      const scrolled = Math.abs(window.scrollY - scrollStartY);
      if (scrolled > 100) {
        closeMenu();
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   7. LIVE ACTIVITY TICKER (REALISTIC LOCALITY BOOKING UPDATES)
   ========================================================================== */
const tickerUpdates = [
  "📍 Gaur City 2 (12th Avenue): Split AC Jet Service booked 3 mins ago!",
  "📍 Noida Extension (Cherry County): 1.5 Ton AC rented for summer just now.",
  "📍 Sector 62 IT Park, Noida: AC Gas Refill & Leak testing requested.",
  "📍 Sector 137 Highrise (Paras Tierea): Inverter PCB repair engineer assigned.",
  "📍 Sector 50 Mansion, Noida: Refrigerator cooling repair engineer visiting.",
  "📍 Indirapuram (Ahinsa Khand): Old Split AC Sold with instant cash payment.",
  "📍 Crossings Republik (Gaur Global): Washing Machine drum & spin service booked.",
  "📍 Delta Sector, Greater Noida: 2 Ton Split AC Installation completed.",
  "📍 Kala Enclave, Khora Colony: Water Geyser coil replaced with warranty."
];

let tickerIndex = 0;
function initLiveTicker() {
  const tickerEl = document.getElementById('liveTickerText');
  if (!tickerEl) return;

  setInterval(() => {
    tickerIndex = (tickerIndex + 1) % tickerUpdates.length;
    tickerEl.innerHTML = `<span>${tickerUpdates[tickerIndex]}</span>`;
  }, 4000);
}

/* ==========================================================================
   8. HEADER SCROLL & COMPACT STYLING
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   9. SCROLLSPY (AUTOMATIC ACTIVE LINK HIGHLIGHT ON ALL DEVICES)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (!sections.length || !navLinks.length) return;

  const handleScrollSpy = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
}

/* ==========================================================================
   10. AUTO YEAR UPDATE IN FOOTER
   ========================================================================== */
(function updateFooterYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ==========================================================================
   11. FLOATING ACTION BAR - Show/Hide on Scroll (Smart Behavior)
   ========================================================================== */
function initFloatingBar() {
  const bar = document.getElementById('floatingActionBar');
  if (!bar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleBarVisibility() {
    const scrollY = window.scrollY;
    // Show bar after scrolling past hero (200px), hide when at very top
    if (scrollY > 200) {
      bar.style.transform = 'translateY(0)';
      bar.style.opacity = '1';
    } else {
      bar.style.transform = 'translateY(100%)';
      bar.style.opacity = '0';
    }
    lastScrollY = scrollY;
    ticking = false;
  }

  // Set initial hidden state
  bar.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
  bar.style.transform = 'translateY(100%)';
  bar.style.opacity = '0';

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleBarVisibility);
      ticking = true;
    }
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initFloatingBar();
});

/* ==========================================================================
   12. SMOOTH IMAGE LOADING - Prevent Layout Shift
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Add loaded class to images after they load
  const imgs = document.querySelectorAll('img');
  imgs.forEach(img => {
    if (img.complete) {
      img.classList.add('img-loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('img-loaded'));
      img.addEventListener('error', () => {
        // Graceful fallback for broken images
        img.style.opacity = '0.5';
      });
    }
  });
});

/* ==========================================================================
   13. SECURITY MODULE — Basic Protection
   Features:
   - Right-click / context menu disable
   - Image drag protection
   - iFrame embedding block
   ========================================================================== */

function initSecurity() {

  /* 1. RIGHT-CLICK DISABLE */
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  /* 2. IMAGE DRAG PROTECTION */
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', (e) => e.preventDefault());
  });

  /* 3. IFRAME EMBEDDING BLOCK */
  if (window.self !== window.top) {
    try {
      window.top.location = window.self.location;
    } catch (e) {
      document.body.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;' +
        'height:100vh;font-family:sans-serif;font-size:1.1rem;color:#e74c3c;">' +
        '&#x26D4; This page cannot be displayed inside a frame.</div>';
    }
  }

}
