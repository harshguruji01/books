/**
 * ============================================================================
 * WEBGURUJI / HARSHGURUJI — NCERT BOOKS LIBRARY PREMIUM NAVIGATION ENGINE
 * Dedicated Navigation Controller for books.webguruji.online & books.html
 * Features:
 *  - Responsive Desktop Frosted Glass Bar & Mobile Floating Dock
 *  - Interactive Class Picker (Classes 1 to 12) with instant in-page filtering
 *  - Deep linking support (?class=10, ?search=science)
 *  - Instant Search shortcut (Ctrl + K / ⌘K)
 *  - Real-time Scroll-Spy section highlighting
 * ============================================================================
 */

(function () {
  'use strict';

  // Context-aware page path resolution
  const isBooksPage = window.location.pathname.endsWith('books.html') || 
                      window.location.pathname.endsWith('/') || 
                      window.location.pathname.endsWith('index.html') ||
                      window.location.pathname === '';
  
  const booksPageUrl = isBooksPage ? '#top' : 'books.html';

  document.addEventListener('DOMContentLoaded', () => {
    initBooksNavigation();
    setupUrlParamHandlers();
    setupScrollSpy();
    setupKeyboardShortcuts();
  });

  function initBooksNavigation() {
    // Remove old conflicting navbars if present
    document.querySelectorAll('.books-nav-header, .books-bottom-dock, .books-sheet-overlay, .hg-header, #hg-global-navbar, #hg-bottom-bar, .premium-navbar').forEach(el => el.remove());

    const navHTML = `
      <!-- Desktop & Tablet Top Sticky Navigation -->
      <header class="books-nav-header" id="books-nav-header" role="banner" aria-label="Books Main Navigation">
        <div class="books-nav-container">
          
          <!-- Brand Logo & Subdomain Identity -->
          <a href="${isBooksPage ? '#top' : 'books.html'}" class="books-brand" id="nav-brand-link" aria-label="HarshGuruJi Books Home">
            <div class="books-brand-logo-wrap">
              <img src="books.png" onerror="this.src='logo.png'" alt="HarshGuruJi Books" class="books-brand-logo" fetchpriority="high">
            </div>
            <div class="books-brand-text-wrap">
              <div class="books-brand-name">
                HarshGuruJi <span class="books-brand-badge">BOOKS</span>
              </div>
              <div class="books-brand-sub">NCERT Class 1 to 12 Library</div>
            </div>
          </a>

          <!-- Desktop Center Navigation Links -->
          <nav class="books-nav-center" aria-label="Desktop Navigation Links">
            <a href="${isBooksPage ? '#top' : 'books.html'}" class="books-nav-link active" id="dnav-link-home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Home</span>
            </a>

            <!-- Quick Classes Mega Dropdown (Class 1 to 12) -->
            <div class="books-dropdown-wrap" id="books-classes-dropdown-wrap">
              <button type="button" class="books-dropdown-btn" id="btn-classes-dropdown" aria-haspopup="true" aria-expanded="false">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                <span>Classes 1–12</span>
                <svg class="books-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <div class="books-mega-menu" id="books-classes-mega-menu" role="menu">
                <div class="books-mega-header">
                  <div class="books-mega-title">
                    <span>📚</span> Select NCERT Class
                  </div>
                  <button type="button" class="books-mega-all-btn" onclick="window.selectBookClass('all')">
                    All Classes View
                  </button>
                </div>

                <div class="books-classes-grid">
                  <!-- Senior Secondary -->
                  <div class="books-class-card" onclick="window.selectBookClass('12')" role="menuitem" tabindex="0">
                    <span class="books-class-tag">Board</span>
                    <span class="books-class-num">12</span>
                    <span class="books-class-label">Class 12</span>
                  </div>
                  <div class="books-class-card" onclick="window.selectBookClass('11')" role="menuitem" tabindex="0">
                    <span class="books-class-num">11</span>
                    <span class="books-class-label">Class 11</span>
                  </div>
                  <!-- Secondary -->
                  <div class="books-class-card" onclick="window.selectBookClass('10')" role="menuitem" tabindex="0">
                    <span class="books-class-tag">Board</span>
                    <span class="books-class-num">10</span>
                    <span class="books-class-label">Class 10</span>
                  </div>
                  <div class="books-class-card" onclick="window.selectBookClass('9')" role="menuitem" tabindex="0">
                    <span class="books-class-num">9</span>
                    <span class="books-class-label">Class 9</span>
                  </div>
                  <!-- Middle School -->
                  <div class="books-class-card" onclick="window.selectBookClass('8')" role="menuitem" tabindex="0">
                    <span class="books-class-num">8</span>
                    <span class="books-class-label">Class 8</span>
                  </div>
                  <div class="books-class-card" onclick="window.selectBookClass('7')" role="menuitem" tabindex="0">
                    <span class="books-class-num">7</span>
                    <span class="books-class-label">Class 7</span>
                  </div>
                  <div class="books-class-card" onclick="window.selectBookClass('6')" role="menuitem" tabindex="0">
                    <span class="books-class-num">6</span>
                    <span class="books-class-label">Class 6</span>
                  </div>
                  <div class="books-class-card" onclick="window.selectBookClass('5')" role="menuitem" tabindex="0">
                    <span class="books-class-num">5</span>
                    <span class="books-class-label">Class 5</span>
                  </div>
                  <!-- Primary -->
                  <div class="books-class-card" onclick="window.selectBookClass('4')" role="menuitem" tabindex="0">
                    <span class="books-class-num">4</span>
                    <span class="books-class-label">Class 4</span>
                  </div>
                  <div class="books-class-card" onclick="window.selectBookClass('3')" role="menuitem" tabindex="0">
                    <span class="books-class-num">3</span>
                    <span class="books-class-label">Class 3</span>
                  </div>
                  <div class="books-class-card" onclick="window.selectBookClass('2')" role="menuitem" tabindex="0">
                    <span class="books-class-num">2</span>
                    <span class="books-class-label">Class 2</span>
                  </div>
                  <div class="books-class-card" onclick="window.selectBookClass('1')" role="menuitem" tabindex="0">
                    <span class="books-class-num">1</span>
                    <span class="books-class-label">Class 1</span>
                  </div>
                </div>

                <div class="books-mega-footer">
                  <span>⚡ Instant Filter • Direct Chapter PDFs</span>
                  <a href="#class-pills-row" onclick="window.scrollToSection('class-pills-row')">Quick Class Row &darr;</a>
                </div>
              </div>
            </div>

            <!-- 4-Step Book Finder -->
            <a href="#step-box-class" class="books-nav-link" id="dnav-link-finder" onclick="window.scrollToSection('step-box-class')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
              <span>Book Finder</span>
            </a>

            <!-- Textbooks Catalog -->
            <a href="#books-grid" class="books-nav-link" id="dnav-link-catalog" onclick="window.scrollToSection('books-grid')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <span>Textbooks</span>
            </a>
          </nav>

          <!-- Right Side Actions: Instant Search + WebGuruJi Hub -->
          <div class="books-nav-right">
            <!-- Search Pill Button -->
            <button type="button" class="books-nav-search-trigger" id="btn-nav-search" title="Search Books (Ctrl + K)" onclick="window.focusBookSearch()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span class="books-search-text">Search Textbooks...</span>
              <kbd class="books-search-kbd">Ctrl K</kbd>
            </button>

            <!-- Main Portal Link -->
            <a href="https://www.webguruji.online" target="_blank" rel="noopener noreferrer" class="books-portal-pill" title="Go to Main WebGuruJi Portal">
              <span>Main Portal</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>

        </div>
      </header>

      <!-- Mobile Floating Glass Dock (<= 1024px) -->
      <nav class="books-bottom-dock" id="books-bottom-dock" aria-label="Mobile Navigation Dock">
        <button type="button" class="books-dock-item active" id="dock-btn-home" onclick="window.scrollToSection('top')">
          <span class="books-dock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </span>
          <span class="books-dock-label">Home</span>
        </button>

        <!-- Prominent Classes Picker Button -->
        <button type="button" class="books-dock-item books-dock-item-primary" id="dock-btn-classes" onclick="window.toggleClassesSheet(true)">
          <span class="books-dock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </span>
          <span class="books-dock-label">Classes</span>
        </button>

        <button type="button" class="books-dock-item" id="dock-btn-search" onclick="window.focusBookSearch()">
          <span class="books-dock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <span class="books-dock-label">Search</span>
        </button>

        <button type="button" class="books-dock-item" id="dock-btn-finder" onclick="window.scrollToSection('step-box-class')">
          <span class="books-dock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
          </span>
          <span class="books-dock-label">Finder</span>
        </button>

        <button type="button" class="books-dock-item" id="dock-btn-catalog" onclick="window.scrollToSection('books-grid')">
          <span class="books-dock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </span>
          <span class="books-dock-label">Textbooks</span>
        </button>
      </nav>

      <!-- Mobile Classes Bottom Sheet Modal -->
      <div class="books-sheet-overlay" id="books-sheet-overlay" onclick="if(event.target===this) window.toggleClassesSheet(false)" aria-hidden="true">
        <div class="books-bottom-sheet" role="dialog" aria-modal="true" aria-label="Select Class Sheet">
          <div class="books-sheet-handle"></div>
          <div class="books-sheet-head">
            <div class="books-sheet-title">
              <span>🎓</span> Select NCERT Class
            </div>
            <button type="button" class="books-sheet-close" onclick="window.toggleClassesSheet(false)" aria-label="Close Class Sheet">&times;</button>
          </div>

          <div class="books-sheet-grid">
            <button type="button" class="books-sheet-class-btn" onclick="window.selectBookClass('12')">
              <span class="num">12</span>
              <span class="label">Class 12</span>
            </button>
            <button type="button" class="books-sheet-class-btn" onclick="window.selectBookClass('11')">
              <span class="num">11</span>
              <span class="label">Class 11</span>
            </button>
            <button type="button" class="books-sheet-class-btn" onclick="window.selectBookClass('10')">
              <span class="num">10</span>
              <span class="label">Class 10</span>
            </button>
            <button type="button" class="books-sheet-class-btn" onclick="window.selectBookClass('9')">
              <span class="num">9</span>
              <span class="label">Class 9</span>
            </button>
            <button type="button" class="books-sheet-class-btn" onclick="window.selectBookClass('8')">
              <span class="num">8</span>
              <span class="label">Class 8</span>
            </button>
            <button type="button" class="books-sheet-class-btn" onclick="window.selectBookClass('7')">
              <span class="num">7</span>
              <span class="label">Class 7</span>
            </button>
            <button type="button" class="books-sheet-class-btn" onclick="window.selectBookClass('6')">
              <span class="num">6</span>
              <span class="label">Class 6</span>
            </button>
            <button type="button" class="books-sheet-class-btn" onclick="window.selectBookClass('5')">
              <span class="num">5</span>
              <span class="label">Class 5</span>
            </button>
            <button type="button" class="books-sheet-class-btn" onclick="window.selectBookClass('4')">
              <span class="num">4</span>
              <span class="label">Class 4</span>
            </button>
            <button type="button" class="books-sheet-class-btn" onclick="window.selectBookClass('3')">
              <span class="num">3</span>
              <span class="label">Class 3</span>
            </button>
            <button type="button" class="books-sheet-class-btn" onclick="window.selectBookClass('2')">
              <span class="num">2</span>
              <span class="label">Class 2</span>
            </button>
            <button type="button" class="books-sheet-class-btn" onclick="window.selectBookClass('1')">
              <span class="num">1</span>
              <span class="label">Class 1</span>
            </button>
          </div>

          <div style="margin-top: 14px; text-align: center;">
            <button type="button" class="books-mega-all-btn" style="width:100%; padding:10px;" onclick="window.selectBookClass('all')">
              Show All Classes &amp; Textbooks
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Desktop classes dropdown toggle & accessibility
    const dropdownWrap = document.getElementById('books-classes-dropdown-wrap');
    const dropdownBtn = document.getElementById('btn-classes-dropdown');
    if (dropdownWrap && dropdownBtn) {
      dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdownWrap.classList.toggle('open');
        dropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', (e) => {
        if (!dropdownWrap.contains(e.target)) {
          dropdownWrap.classList.remove('open');
          dropdownBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Scroll effect for header
    const header = document.getElementById('books-nav-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 25) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }
  }

  // =========================================================================
  // GLOBAL INTERACTIVE ACTIONS
  // =========================================================================

  // 1. Direct Class Selector across Navbar and Books Engine
  window.selectBookClass = function (classNumber) {
    // Close mobile sheet if open
    window.toggleClassesSheet(false);
    
    // Close desktop dropdown if open
    const dropdownWrap = document.getElementById('books-classes-dropdown-wrap');
    if (dropdownWrap) dropdownWrap.classList.remove('open');

    // If we're not currently on books.html/index.html, redirect with query param
    if (!document.getElementById('select-class') && !document.getElementById('books-grid')) {
      window.location.href = `books.html?class=${encodeURIComponent(classNumber)}`;
      return;
    }

    const val = (classNumber === 'all') ? '' : String(classNumber);
    const selectClass = document.getElementById('select-class');

    // Trigger selectClass change
    if (selectClass) {
      selectClass.value = val;
      selectClass.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Update Pills row active state
    const pill = document.querySelector(`.class-pill[data-class="${classNumber}"]`);
    if (pill) {
      document.querySelectorAll('.class-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    }

    // Scroll smoothly to the catalog
    window.scrollToSection('books-grid');
  };

  // 2. Smooth Section Scroll with Header Offset
  window.scrollToSection = function (elementId) {
    if (elementId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.getElementById(elementId);
    if (!target) {
      if (!isBooksPage) {
        window.location.href = `books.html#${elementId}`;
      }
      return;
    }

    const navHeight = 75;
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementPosition - navHeight);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // 3. Focus Universal Search Input with Ripple Glow
  window.focusBookSearch = function () {
    const searchInput = document.getElementById('book-search-input');
    const searchCard = document.querySelector('.book-search-input-wrap') || document.querySelector('.book-search-card');

    if (!searchInput) {
      if (!isBooksPage) {
        window.location.href = 'books.html?focus=search';
      }
      return;
    }

    window.scrollToSection('book-search-input');
    setTimeout(() => {
      searchInput.focus();
      if (searchCard) {
        searchCard.classList.add('book-search-focus-glow');
        setTimeout(() => searchCard.classList.remove('book-search-focus-glow'), 2400);
      }
    }, 250);
  };

  // 4. Mobile Bottom Sheet Toggle
  window.toggleClassesSheet = function (open) {
    const overlay = document.getElementById('books-sheet-overlay');
    if (!overlay) return;

    if (open) {
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // =========================================================================
  // URL PARAMETERS & DEEP LINKING (?class=10, ?search=science)
  // =========================================================================
  function setupUrlParamHandlers() {
    try {
      const params = new URLSearchParams(window.location.search);
      const classParam = params.get('class');
      const searchParam = params.get('search');
      const focusParam = params.get('focus');

      if (classParam) {
        const cleanClass = classParam.replace(/class/i, '').trim();
        setTimeout(() => {
          window.selectBookClass(cleanClass);
        }, 350);
      }

      if (searchParam) {
        const searchInput = document.getElementById('book-search-input');
        if (searchInput) {
          searchInput.value = searchParam;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          setTimeout(() => window.scrollToSection('books-grid'), 400);
        }
      }

      if (focusParam === 'search') {
        setTimeout(window.focusBookSearch, 400);
      }
    } catch (e) {
      console.warn('[BooksNav] Error handling URL params:', e);
    }
  }

  // =========================================================================
  // SCROLL-SPY ACTIVE LINK HIGHLIGHTER
  // =========================================================================
  function setupScrollSpy() {
    const sections = [
      { id: 'books-grid', dnav: 'dnav-link-catalog', dock: 'dock-btn-catalog' },
      { id: 'step-box-class', dnav: 'dnav-link-finder', dock: 'dock-btn-finder' }
    ];

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveNavLinks();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    function updateActiveNavLinks() {
      const scrollPos = window.scrollY + 200;

      // Check if at top
      if (window.scrollY < 180) {
        setActiveLinks('dnav-link-home', 'dock-btn-home');
        return;
      }

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveLinks(sections[i].dnav, sections[i].dock);
            return;
          }
        }
      }
    }

    function setActiveLinks(dnavId, dockId) {
      document.querySelectorAll('.books-nav-link').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.books-dock-item').forEach(el => el.classList.remove('active'));

      if (dnavId) document.getElementById(dnavId)?.classList.add('active');
      if (dockId) document.getElementById(dockId)?.classList.add('active');
    }
  }

  // =========================================================================
  // KEYBOARD SHORTCUTS (Ctrl + K, Escape)
  // =========================================================================
  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl + K or Cmd + K: Focus Search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.focusBookSearch();
      }

      // Escape: Close mobile sheet or mega menu
      if (e.key === 'Escape') {
        window.toggleClassesSheet(false);
        const dropdownWrap = document.getElementById('books-classes-dropdown-wrap');
        if (dropdownWrap) dropdownWrap.classList.remove('open');
      }
    });
  }

})();
