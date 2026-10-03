document.addEventListener('DOMContentLoaded', () => {

  // Remove existing hardcoded footers
  document.querySelectorAll('footer.footer, footer.hg-global-footer').forEach(el => el.remove());
  const oldFooterPlaceholder = document.getElementById('footer-placeholder');
  if (oldFooterPlaceholder) oldFooterPlaceholder.remove();

  const currentYear = new Date().getFullYear();

  const footerHTML = `
    <footer class="hg-global-footer">
      <div class="hg-footer-grid">
        <div class="hg-footer-brand">
          <a href="books.html" style="display:flex; align-items:center; gap:0.75rem; text-decoration:none; margin-bottom: 1.25rem;">
            <img src="logo.png" alt="WebGuruJi Books Logo" style="height: 44px; width: auto; border-radius: 10px;" />
            <span style="font-family:'Space Grotesk',sans-serif; font-weight:800; font-size:1.45rem; background:linear-gradient(135deg,#6366f1,#a855f7,#ec4899); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">WebGuruJi Books</span>
          </a>
          <p>Official NCERT Textbooks &amp; Solutions Library for Classes 1 to 12. Instant chapter-by-chapter reading, verified PDF downloads, and interactive book discovery engine.</p>
          
          <div class="hg-footer-search">
            <input type="text" id="hg-footer-search-input" placeholder="Search NCERT books, chapters..." aria-label="Search the book library">
            <button type="button" id="hg-footer-search-btn" aria-label="Search">Search</button>
          </div>

          <div class="hg-footer-socials">
            <a href="https://www.youtube.com/@TESVLOG1" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" /></svg>
            </a>
            <a href="https://www.instagram.com/harshguruji1/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3c1.3-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4A6.2 6.2 0 0012 5.8zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z" /></svg>
            </a>
            <a href="https://t.me/webgurujiofficial" id="footer-social-telegram" target="_blank" rel="noopener noreferrer" aria-label="Telegram" title="Telegram Channel">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
            </a>
          </div>
        </div>

        <nav class="hg-footer-navs" aria-label="Footer Navigation">
          <div class="hg-footer-col">
            <h5>Senior Classes</h5>
            <ul>
              <li><a href="javascript:void(0)" onclick="window.selectBookClass('12')">Class 12 NCERT</a></li>
              <li><a href="javascript:void(0)" onclick="window.selectBookClass('11')">Class 11 NCERT</a></li>
              <li><a href="javascript:void(0)" onclick="window.selectBookClass('10')">Class 10 Board Books</a></li>
              <li><a href="javascript:void(0)" onclick="window.selectBookClass('9')">Class 9 NCERT</a></li>
              <li><a href="javascript:void(0)" onclick="window.selectBookClass('8')">Class 8 NCERT</a></li>
            </ul>
          </div>
          <div class="hg-footer-col">
            <h5>Middle &amp; Primary</h5>
            <ul>
              <li><a href="javascript:void(0)" onclick="window.selectBookClass('7')">Class 7 NCERT</a></li>
              <li><a href="javascript:void(0)" onclick="window.selectBookClass('6')">Class 6 NCERT</a></li>
              <li><a href="javascript:void(0)" onclick="window.selectBookClass('5')">Class 5 Textbooks</a></li>
              <li><a href="javascript:void(0)" onclick="window.selectBookClass('4')">Class 4 Textbooks</a></li>
              <li><a href="javascript:void(0)" onclick="window.selectBookClass('all')">All Classes View</a></li>
            </ul>
          </div>
          <div class="hg-footer-col">
            <h5>Quick Discovery</h5>
            <ul>
              <li><a href="#step-box-class" onclick="window.scrollToSection('step-box-class')">4-Step Book Finder</a></li>
              <li><a href="#books-grid" onclick="window.scrollToSection('books-grid')">Available Textbooks</a></li>
              <li><a href="javascript:void(0)" onclick="window.focusBookSearch()">Search Library</a></li>
              <li><a href="#class-pills-row" onclick="window.scrollToSection('class-pills-row')">NCERT Quick Filter</a></li>
            </ul>
          </div>
          <div class="hg-footer-col">
            <h5>WebGuruJi Network</h5>
            <ul>
              <li><a href="https://www.webguruji.online" target="_blank" rel="noopener noreferrer">Main Portal ↗</a></li>
              <li><a href="https://store.webguruji.online" target="_blank" rel="noopener noreferrer">Apps &amp; Software Store ↗</a></li>
              <li><a href="https://chat.webguruji.online" target="_blank" rel="noopener noreferrer">ChatBase AI ↗</a></li>
              <li><a href="https://www.webguruji.online/privacy-policy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a href="https://www.webguruji.online/terms-and-conditions.html" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="hg-footer-bottom">
        <div style="display: flex; align-items: center; gap: 1.25rem;">
          <img src="harshlogo.png" loading="lazy" alt="Harsh Patel – Founder" style="height: 52px; width: auto; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);" />
          <div>
            <strong style="color: var(--text-primary, #fff); font-size: 1.05rem; display: block; margin-bottom: 0.2rem;">Harsh Patel</strong>
            <span style="color: var(--bnav-primary, #6366f1); font-size: 0.82rem; font-weight: 600; display: block;">Founder &amp; Developer</span>
          </div>
        </div>
        
        <p style="color: var(--text-secondary, #a1a1aa); font-size: 0.85rem; margin: 0;">
          &copy; <span id="hg-footer-year">${currentYear}</span> WebGuruJi. All Rights Reserved. <br>
          Dedicated NCERT Books &amp; Study Library.
        </p>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Footer Search logic: seamlessly triggers in-page book search
  const searchBtn = document.getElementById('hg-footer-search-btn');
  const searchInput = document.getElementById('hg-footer-search-input');
  
  if (searchBtn && searchInput) {
    const handleFooterSearch = () => {
      const val = searchInput.value.trim();
      if (val) {
        const mainInput = document.getElementById('book-search-input');
        if (mainInput) {
          mainInput.value = val;
          mainInput.dispatchEvent(new Event('input', { bubbles: true }));
          window.scrollToSection('books-grid');
        } else {
          window.location.href = `books.html?search=${encodeURIComponent(val)}`;
        }
      }
    };

    searchBtn.addEventListener('click', handleFooterSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') handleFooterSearch();
    });
  }
});
