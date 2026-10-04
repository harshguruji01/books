/**
 * ============================================================================
 * HARSHGURUJI BOOKS — PREMIUM NAVIGATION ENGINE
 * Dedicated Navigation Controller for books.webguruji.online & books.html
 * Fully unified with HarshGuruJi ecosystem & fixed mobile bottom navigation
 * ============================================================================
 */

(function () {
  'use strict';

  const isBooksPage = window.location.pathname.endsWith('books.html') || 
                      window.location.pathname.endsWith('/') || 
                      window.location.pathname.endsWith('index.html') ||
                      window.location.pathname === '';

  document.addEventListener('DOMContentLoaded', () => {
    initBooksNavigation();
    setupUrlParamHandlers();
    setupScrollSpy();
    setupKeyboardShortcuts();
  });

  function initBooksNavigation() {
    // Remove old conflicting navbars if present
    document.querySelectorAll('.books-nav-header, .books-bottom-dock, .books-sheet-overlay, .hg-header, #hg-global-navbar, #hg-bottom-bar, .hg-bottom-bar, .premium-navbar').forEach(el => el.remove());

    const navHTML = `
      <!-- Desktop & Tablet Top Fixed Navigation -->
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

          <!-- Desktop Center Navigation Links (Clean, Unified Ecosystem) -->
          <nav class="books-nav-center" aria-label="Desktop Navigation Links">
            <a href="https://www.webguruji.online/" class="books-nav-link" id="dnav-link-home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Home</span>
            </a>

            <a href="${isBooksPage ? '#top' : 'books.html'}" class="books-nav-link active" id="dnav-link-books">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <span>Books Library</span>
            </a>

            <a href="https://www.webguruji.online/daily-special.html" class="books-nav-link" id="dnav-link-dailyspecial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>Daily Special</span>
            </a>

            <a href="https://store.webguruji.online" target="_blank" rel="noopener noreferrer" class="books-nav-link" id="dnav-link-store" title="HarshGuruJi Store">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>Store</span>
            </a>

            <a href="https://chat.webguruji.online" target="_blank" rel="noopener noreferrer" class="books-nav-link" id="dnav-link-chat" title="ChatBase AI">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span>Chat</span>
            </a>

            <a href="https://www.webguruji.online/contributor.html" class="books-nav-link" id="dnav-link-contributor">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Contributor</span>
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
            <a href="https://www.webguruji.online" target="_blank" rel="noopener noreferrer" class="books-portal-pill" title="Go to Main HarshGuruJi Portal">
              <span>Main Portal ↗</span>
            </a>
          </div>

        </div>
      </header>

      <!-- Unified Mobile Bottom Navigation Bar (Identical to HarshGuruJi Ecosystem) -->
      <nav class="hg-bottom-bar" id="hg-bottom-bar" aria-label="Mobile Navigation">
        <a href="${isBooksPage ? '#top' : 'books.html'}" class="hg-bottom-item active" id="bottom-nav-books" title="NCERT Books">
          <span class="hg-bottom-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </span>
          <span class="hg-bottom-label">Books</span>
        </a>

        <a href="https://www.webguruji.online/daily-special.html" class="hg-bottom-item" id="bottom-nav-dailyspecial" title="Daily Special">
          <span class="hg-bottom-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </span>
          <span class="hg-bottom-label">Daily Special</span>
        </a>

        <a href="https://store.webguruji.online" class="hg-bottom-item" id="bottom-nav-store" target="_blank" rel="noopener noreferrer" title="HarshGuruJi Store">
          <span class="hg-bottom-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </span>
          <span class="hg-bottom-label">Store</span>
        </a>

        <a href="https://www.webguruji.online/" class="hg-bottom-item hg-bottom-item-home" id="bottom-nav-home" title="Home">
          <span class="hg-bottom-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </span>
          <span class="hg-bottom-label">Home</span>
        </a>

        <a href="https://chat.webguruji.online" class="hg-bottom-item" id="bottom-nav-chat" target="_blank" rel="noopener noreferrer" title="Chat App">
          <span class="hg-bottom-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </span>
          <span class="hg-bottom-label">Chat</span>
        </a>

        <a href="https://www.webguruji.online/contributor.html" class="hg-bottom-item" id="bottom-nav-contributor" title="Contributors">
          <span class="hg-bottom-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </span>
          <span class="hg-bottom-label">Contributor</span>
        </a>

        <a href="https://www.webguruji.online/login.html" class="hg-bottom-item" id="bottom-nav-auth" title="Profile / Account">
          <span class="hg-bottom-icon" id="bottom-auth-icon-wrap">
            <svg id="bottom-auth-default-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <img id="bottom-auth-avatar" src="books.png" onerror="this.src='logo.png'" alt="Profile" style="display:none;" />
          </span>
          <span class="hg-bottom-label" id="bottom-auth-label">Account</span>
        </a>
      </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Scroll effect for header
    const header = document.getElementById('books-nav-header');
    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 15) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }
  }

  window.focusBookSearch = function () {
    const searchInput = document.getElementById('book-search-input') || document.getElementById('search-input') || document.querySelector('.search-input');
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => searchInput.focus(), 250);
    } else {
      window.scrollToSection('step-box-class');
    }
  };

  window.scrollToSection = function (id) {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.focusBookSearch();
      }
    });
  }

  function setupUrlParamHandlers() {
    const params = new URLSearchParams(window.location.search);
    const classParam = params.get('class');
    const searchParam = params.get('search');

    if (classParam && typeof window.selectBookClass === 'function') {
      setTimeout(() => window.selectBookClass(classParam), 300);
    }
    if (searchParam) {
      const input = document.getElementById('book-search-input');
      if (input) {
        input.value = searchParam;
        input.dispatchEvent(new Event('input'));
      }
    }
  }

  function setupScrollSpy() {
    // Optional smooth section highlighting
  }

})();
