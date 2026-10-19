document.addEventListener('DOMContentLoaded', () => {

  // Auto-Ensure Google AdSense Token & Script
  if (!document.querySelector('meta[name="google-adsense-account"]')) {
    const meta = document.createElement('meta');
    meta.name = 'google-adsense-account';
    meta.content = 'ca-pub-7706204118195419';
    document.head.appendChild(meta);
  }
  if (!document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7706204118195419';
    document.head.appendChild(script);
  }

  // Remove existing hardcoded footers
  document.querySelectorAll('footer.footer, footer.hg-global-footer').forEach(el => el.remove());
  const oldFooterPlaceholder = document.getElementById('footer-placeholder');
  if (oldFooterPlaceholder) oldFooterPlaceholder.remove();

  const currentYear = new Date().getFullYear();

  const footerHTML = `
    <footer class="hg-global-footer">
      <!-- Massive Auto-Twinkling Stars Canvas -->
      <canvas id="hg-footer-stars-canvas" class="hg-footer-stars-canvas" aria-hidden="true"></canvas>

      <div class="hg-footer-grid">
        <div class="hg-footer-brand">
          <a href="books.html" style="display:flex; align-items:center; gap:0.75rem; text-decoration:none; margin-bottom: 1.25rem;">
            <img src="books.png" onerror="this.src='logo.png'" alt="HarshGuruJi Books Logo" style="height: 36px; width: auto; max-width: 44px; border-radius: 8px; object-fit: contain;" />
            <span style="font-family:'Space Grotesk',sans-serif; font-weight:800; font-size:1.45rem; background:linear-gradient(135deg,#a855f7,#c084fc,#ec4899); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">HarshGuruJi Books</span>
          </a>
          <p>Official NCERT Textbooks &amp; Solutions Library for Classes 1 to 12. Instant chapter-by-chapter reading, verified PDF downloads, and interactive book discovery engine.</p>
          
          <div class="hg-footer-search">
            <input type="text" id="hg-footer-search-input" placeholder="Search NCERT books, chapters..." aria-label="Search the book library">
            <button type="button" id="hg-footer-search-btn" aria-label="Search">Search</button>
          </div>

          <div class="hg-footer-socials">
            <a href="https://youtube.com/@harshguruji1" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" /></svg>
            </a>
            <a href="https://www.instagram.com/harshguruji1/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3c1.3-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4A6.2 6.2 0 0012 5.8zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z" /></svg>
            </a>
            <a href="https://t.me/officialharshguruji1" id="footer-social-telegram" target="_blank" rel="noopener noreferrer" aria-label="Telegram" title="Telegram Channel">
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
            <h5>HarshGuruJi Network</h5>
            <ul>
              <li><a href="https://www.webguruji.online" target="_blank" rel="noopener noreferrer">Main Portal ↗</a></li>
              <li><a href="https://store.webguruji.online" target="_blank" rel="noopener noreferrer">Apps &amp; Software Store ↗</a></li>
              <li><a href="https://tube.webguruji.online" target="_blank" rel="noopener noreferrer">GuruTube Video Player ↗</a></li>
              <li><a href="https://chat.webguruji.online" target="_blank" rel="noopener noreferrer">ChatBase AI ↗</a></li>
              <li><a href="https://www.webguruji.online/privacy-policy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a href="https://www.webguruji.online/terms-and-conditions.html" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="hg-footer-bottom">
        <a href="owner.html" class="hg-founder-link" title="Meet the Owner: Harsh Patel" aria-label="Harsh Patel Founder Profile">
          <div class="hg-founder-avatar-wrap">
            <img src="harshlogo.png" loading="lazy" alt="Harsh Patel – Founder" class="hg-founder-avatar" />
          </div>
          <div class="hg-founder-info">
            <span class="hg-founder-name-animated">Harsh Patel <span class="hg-golden-tick" title="Verified Creator & Founder">✓</span></span>
            <span class="hg-founder-badge">Founder &amp; Owner</span>
          </div>
        </a>
        
        <p style="color: var(--text-secondary, #a1a1aa); font-size: 0.85rem; margin: 0;">
          &copy; <span id="hg-footer-year">${currentYear}</span> HarshGuruJi. All Rights Reserved. <br>
          Official NCERT Books Library — <a href="https://www.webguruji.online" target="_blank" rel="noopener noreferrer" style="color:#c084fc; text-decoration:none;">www.webguruji.online</a>
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
          if (typeof window.scrollToSection === 'function') {
            window.scrollToSection('books-grid');
          }
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

  // =========================================================================
  // MASSIVE AUTO-TWINKLING STARS & SCROLL-TRIGGERED REVEAL ANIMATION SYSTEM
  // =========================================================================
  function initFooterStarsAndScrollAnimation() {
    const footer = document.querySelector('.hg-global-footer');
    const canvas = document.getElementById('hg-footer-stars-canvas');
    if (!footer || !canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let stars = [];
    let shootingStars = [];
    let mouse = { x: -1000, y: -1000, active: false };
    let animationFrameId = null;
    let isFooterVisible = false;

    // High DPI Canvas Scaling & Massive Stars Initialization
    function resizeCanvas() {
      const rect = footer.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      createStars();
    }

    function createStars() {
      stars = [];
      const starCount = Math.max(140, Math.min(280, Math.floor((width * height) / 3000)));

      // Purple / Violet / Indigo Celestial Palette
      const colors = [
        { r: 255, g: 255, b: 255 }, // Diamond White
        { r: 216, g: 180, b: 254 }, // Soft Lavender (#d8b4fe)
        { r: 192, g: 132, b: 252 }, // Neon Violet (#c084fc)
        { r: 244, g: 114, b: 182 }, // Cosmic Pink (#f472b6)
        { r: 254, g: 240, b: 138 }  // Radiant Warm Gold (#fef08a)
      ];

      for (let i = 0; i < starCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isBright = Math.random() < 0.18;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isBright ? Math.random() * 1.4 + 1.2 : Math.random() * 0.9 + 0.45,
          baseAlpha: Math.random() * 0.35 + 0.2,
          twinkleSpeed: Math.random() * 0.045 + 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleRange: Math.random() * 0.55 + 0.35,
          color: color,
          isBright: isBright
        });
      }
    }

    // Dynamic Shooting Star / Meteor Spawner
    function spawnShootingStar() {
      if (shootingStars.length >= 2 || !isFooterVisible) return;
      const startX = Math.random() * width * 0.85;
      const startY = Math.random() * height * 0.45;
      const length = Math.random() * 85 + 75;
      const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1);
      const speed = Math.random() * 6 + 5;

      shootingStars.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length: length,
        life: 0,
        maxLife: Math.random() * 45 + 35,
        opacity: 1
      });
    }

    let meteorInterval = setInterval(() => {
      if (isFooterVisible && Math.random() < 0.65) {
        spawnShootingStar();
      }
    }, 4200);

    // Continuous 60fps Star Drawing Engine
    function drawStars() {
      if (!isFooterVisible) return;
      ctx.clearRect(0, 0, width, height);

      const time = performance.now() * 0.001;

      // 1. Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const pulse = Math.sin(time * s.twinkleSpeed * 60 + s.twinklePhase);
        let alpha = s.baseAlpha + pulse * s.twinkleRange;
        alpha = Math.max(0.08, Math.min(1, alpha));

        if (mouse.active) {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            alpha = Math.min(1, alpha + (1 - dist / 130) * 0.65);
          }
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha})`;
        ctx.shadowColor = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha * 0.8})`;
        ctx.shadowBlur = s.isBright ? 9 : 4;
        ctx.fill();

        if (s.isBright && alpha > 0.6) {
          const flareLen = s.radius * (2.8 + pulse * 1.5);
          ctx.strokeStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha * 0.75})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(s.x - flareLen, s.y);
          ctx.lineTo(s.x + flareLen, s.y);
          ctx.moveTo(s.x, s.y - flareLen);
          ctx.lineTo(s.x, s.y + flareLen);
          ctx.stroke();
        }
      }
      ctx.shadowBlur = 0;

      // 2. Shooting Stars
      for (let j = shootingStars.length - 1; j >= 0; j--) {
        const m = shootingStars[j];
        m.x += m.dx;
        m.y += m.dy;
        m.life++;

        const progress = m.life / m.maxLife;
        m.opacity = progress < 0.2 ? progress / 0.2 : (1 - progress);

        if (progress >= 1 || m.x > width + 100 || m.y > height + 100) {
          shootingStars.splice(j, 1);
          continue;
        }

        const tailX = m.x - (m.dx / Math.hypot(m.dx, m.dy)) * m.length;
        const tailY = m.y - (m.dy / Math.hypot(m.dx, m.dy)) * m.length;

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, 'rgba(168, 85, 247, 0)');
        grad.addColorStop(0.7, `rgba(236, 72, 153, ${m.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${m.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.opacity})`;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.9)';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(drawStars);
    }

    footer.addEventListener('mousemove', (e) => {
      const rect = footer.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    footer.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isFooterVisible = true;
          footer.classList.add('hg-footer-visible');
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(drawStars);
          }
        } else {
          isFooterVisible = false;
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      });
    }, { threshold: 0.05, rootMargin: '100px' });

    observer.observe(footer);
    resizeCanvas();
  }

  initFooterStarsAndScrollAnimation();
});
