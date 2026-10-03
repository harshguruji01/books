/**
 * ============================================================================
 * WebGuruJi Books Engine (js/books-engine.js)
 * Dynamic NCERT Textbook Library & Universal Search Engine
 * Displays ONLY books published from Admin Books Studio (adminbooks.html).
 * Dual-sync: Supabase `ncert_books` + localStorage['wg_admin_books'].
 * ============================================================================
 */
(function () {
  'use strict';

  // Master published books catalog - starts empty, strictly populated by admin
  let allBooks = [];
  let filteredBooks = [];

  // DOM Elements - Finder & Search
  const searchInput = document.getElementById('book-search-input');
  const searchClear = document.getElementById('book-search-clear');
  const searchTagsHint = document.getElementById('search-tags-hint');
  const searchLiveStatus = document.getElementById('search-live-status');
  const searchStatusText = document.getElementById('search-status-text');
  const btnClearSearchStatus = document.getElementById('btn-clear-search-status');

  const selectClass = document.getElementById('select-class');
  const selectSubject = document.getElementById('select-subject');
  const selectBook = document.getElementById('select-book');
  const selectSubbook = document.getElementById('select-subbook');
  const classPillsRow = document.getElementById('class-pills-row');
  const btnReset = document.getElementById('btn-reset-finder');
  const finderSummary = document.getElementById('finder-summary');
  const summaryText = document.getElementById('summary-text');
  const catalogTitle = document.getElementById('catalog-title');

  // Step box wrappers
  const stepBoxClass = document.getElementById('step-box-class');
  const stepBoxSubject = document.getElementById('step-box-subject');
  const stepBoxBook = document.getElementById('step-box-book');
  const stepBoxSubbook = document.getElementById('step-box-subbook');

  // Grid & Counter
  const booksGrid = document.getElementById('books-grid');
  const resultsCount = document.getElementById('results-count');

  // Modal Elements
  const pdfModal = document.getElementById('pdf-modal-overlay');
  const pdfModalTitle = document.getElementById('pdf-modal-book-title');
  const pdfViewerFrame = document.getElementById('pdf-viewer-frame');
  const pdfModalNewtab = document.getElementById('pdf-modal-newtab');
  const pdfModalDownload = document.getElementById('pdf-modal-download');
  const pdfModalClose = document.getElementById('pdf-modal-close');

  // Curated Verified NCERT Textbooks Seed (Available immediately out-of-the-box)
  const DEFAULT_NCERT_BOOKS = [
    {
      id: 'ncert_10_science_ch1',
      class: '10',
      subject: 'Science',
      book: 'Science - Class 10 Textbook',
      book_title: 'Science - Class 10 Textbook',
      subbook: 'Chapter 1: Chemical Reactions and Equations',
      chapter_name: 'Chapter 1: Chemical Reactions and Equations',
      edition: 'Rationalised 2024-25 Edition',
      language: 'English',
      pdf_url: 'https://ncert.nic.in/textbook/pdf/jesc101.pdf',
      cover_url: 'https://ncert.nic.in/textbook/pdf/jesc1cc.jpg',
      color: '#4f46e5',
      file_size: '4.2 MB',
      created_at: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 'ncert_10_maths_ch1',
      class: '10',
      subject: 'Mathematics',
      book: 'Mathematics - Class 10 Textbook',
      book_title: 'Mathematics - Class 10 Textbook',
      subbook: 'Chapter 1: Real Numbers',
      chapter_name: 'Chapter 1: Real Numbers',
      edition: 'Rationalised 2024-25 Edition',
      language: 'English',
      pdf_url: 'https://ncert.nic.in/textbook/pdf/jemh101.pdf',
      cover_url: 'https://ncert.nic.in/textbook/pdf/jemh1cc.jpg',
      color: '#0ea5e9',
      file_size: '3.8 MB',
      created_at: '2026-01-02T00:00:00.000Z'
    },
    {
      id: 'ncert_12_physics_ch1',
      class: '12',
      subject: 'Physics',
      book: 'Physics Part I - Class 12',
      book_title: 'Physics Part I - Class 12',
      subbook: 'Chapter 1: Electric Charges and Fields',
      chapter_name: 'Chapter 1: Electric Charges and Fields',
      edition: 'Rationalised 2024-25 Edition',
      language: 'English',
      pdf_url: 'https://ncert.nic.in/textbook/pdf/leph101.pdf',
      cover_url: 'https://ncert.nic.in/textbook/pdf/leph1cc.jpg',
      color: '#8b5cf6',
      file_size: '5.6 MB',
      created_at: '2026-01-03T00:00:00.000Z'
    },
    {
      id: 'ncert_12_chemistry_ch1',
      class: '12',
      subject: 'Chemistry',
      book: 'Chemistry Part I - Class 12',
      book_title: 'Chemistry Part I - Class 12',
      subbook: 'Chapter 1: Solutions',
      chapter_name: 'Chapter 1: Solutions',
      edition: 'Rationalised 2024-25 Edition',
      language: 'English',
      pdf_url: 'https://ncert.nic.in/textbook/pdf/lech101.pdf',
      cover_url: 'https://ncert.nic.in/textbook/pdf/lech1cc.jpg',
      color: '#10b981',
      file_size: '4.9 MB',
      created_at: '2026-01-04T00:00:00.000Z'
    },
    {
      id: 'ncert_11_biology_ch1',
      class: '11',
      subject: 'Biology',
      book: 'Biology - Class 11 Textbook',
      book_title: 'Biology - Class 11 Textbook',
      subbook: 'Chapter 1: The Living World',
      chapter_name: 'Chapter 1: The Living World',
      edition: 'Rationalised 2024-25 Edition',
      language: 'English',
      pdf_url: 'https://ncert.nic.in/textbook/pdf/kebo101.pdf',
      cover_url: 'https://ncert.nic.in/textbook/pdf/kebo1cc.jpg',
      color: '#059669',
      file_size: '3.5 MB',
      created_at: '2026-01-05T00:00:00.000Z'
    },
    {
      id: 'ncert_9_social_ch1',
      class: '9',
      subject: 'Social Science',
      book: 'India and Contemporary World - I',
      book_title: 'India and Contemporary World - I',
      subbook: 'Chapter 1: The French Revolution',
      chapter_name: 'Chapter 1: The French Revolution',
      edition: 'Rationalised 2024-25 Edition',
      language: 'English',
      pdf_url: 'https://ncert.nic.in/textbook/pdf/iess301.pdf',
      cover_url: 'https://ncert.nic.in/textbook/pdf/iess3cc.jpg',
      color: '#f59e0b',
      file_size: '6.1 MB',
      created_at: '2026-01-06T00:00:00.000Z'
    }
  ];

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', async () => {
    setupEventListeners();
    await loadPublishedBooks();
    refreshClassControls();
    applyFilters();
  });

  // Listen for storage events (if admin publishes/uploads a book in another tab)
  window.addEventListener('storage', async (e) => {
    if (e.key === 'wg_admin_books') {
      await loadPublishedBooks();
      refreshClassControls();
      applyFilters();
    }
  });

  // Listen for BroadcastChannel instant cross-tab live sync
  try {
    const bc = new BroadcastChannel('harshguruji_books_sync');
    bc.onmessage = async () => {
      await loadPublishedBooks();
      refreshClassControls();
      applyFilters();
    };
  } catch(e) {}

  // Helper to obtain initialized Supabase client
  function getSupabase() {
    return window.supabaseClient || (window.supabase && typeof window.supabase.createClient === 'function' ?
      window.supabase.createClient(window.SUPABASE_URL || 'https://wumdbpyhpblvgjttsbpv.supabase.co', window.SUPABASE_ANON_KEY || 'sb_publishable_xLqKY9N62MXb6ELG-5trig_RlJs_n-l') : null);
  }

  // --- 1. LOAD STRICTLY PUBLISHED BOOKS ---
  async function loadPublishedBooks() {
    let published = [];
    let localBooks = [];

    // 1. Read LocalStorage (cached/synced books)
    try {
      const local = localStorage.getItem('wg_admin_books');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) localBooks = parsed;
      }
    } catch (e) {
      console.warn('[BooksEngine] Error reading local admin books:', e);
    }

    // 2. Fetch from Supabase `ncert_books` table (primary source of truth)
    try {
      const supabase = getSupabase();
      if (supabase) {
        const { data, error } = await supabase.from('ncert_books').select('*').order('created_at', { ascending: false });
        if (!error && Array.isArray(data) && data.length > 0) {
          published = data.map(item => ({
            id: item.id,
            class: String(item.class),
            subject: item.subject,
            book: item.book_title || item.book,
            book_title: item.book_title || item.book,
            subbook: item.subbook || item.chapter_name || 'Full Book',
            chapter_name: item.chapter_name || item.subbook || 'Full Book',
            edition: item.edition || 'Rationalised 2024-25 Edition',
            language: item.language || 'English',
            pdf_url: item.pdf_url || item.download_url,
            cover_url: item.cover_url || '',
            color: item.color || '#6366f1',
            file_size: item.file_size || 'PDF Document',
            created_at: item.created_at
          }));
        }
      }
    } catch (err) {
      console.warn('[BooksEngine] Supabase fetch notice:', err);
    }

    // 3. Merge: Local books (especially newly added uploads) take top priority
    let merged = [];
    const seenIds = new Set();

    // First add local books (latest uploads)
    localBooks.forEach(b => {
      if (b && b.id && !seenIds.has(String(b.id))) {
        seenIds.add(String(b.id));
        merged.push({
          ...b,
          book: b.book || b.book_title,
          subbook: b.subbook || b.chapter_name || 'Full Book'
        });
      }
    });

    // Then add cloud books
    published.forEach(b => {
      if (b && b.id && !seenIds.has(String(b.id))) {
        seenIds.add(String(b.id));
        merged.push(b);
      }
    });

    // If completely empty, seed with verified NCERT defaults
    if (merged.length === 0) {
      merged = DEFAULT_NCERT_BOOKS;
      try {
        localStorage.setItem('wg_admin_books', JSON.stringify(merged));
      } catch(e) {}
    }

    allBooks = merged;
  }

  // --- 2. DYNAMICALLY REFRESH CLASS CONTROLS ---
  function refreshClassControls() {
    // 1. Refresh Step 1 Select Options based on available published books
    if (selectClass) {
      const previousValue = selectClass.value;
      selectClass.innerHTML = '<option value="">All Classes (Choose Class)...</option>';

      if (allBooks.length === 0) {
        selectClass.innerHTML = '<option value="">No published books yet</option>';
        selectClass.disabled = true;
      } else {
        selectClass.disabled = false;
        // Group and count books per class
        const classCounts = {};
        allBooks.forEach(b => {
          const c = String(b.class).trim();
          classCounts[c] = (classCounts[c] || 0) + 1;
        });

        // Numeric sort classes high-to-low (e.g. 12, 11, 10, 9...)
        const sortedClasses = Object.keys(classCounts).sort((a, b) => {
          const numA = parseInt(a, 10);
          const numB = parseInt(b, 10);
          if (!isNaN(numA) && !isNaN(numB)) return numB - numA;
          return a.localeCompare(b);
        });

        sortedClasses.forEach(cls => {
          const opt = document.createElement('option');
          opt.value = cls;
          opt.textContent = `Class ${cls} (${classCounts[cls]} book${classCounts[cls] > 1 ? 's' : ''})`;
          selectClass.appendChild(opt);
        });

        if (previousValue && classCounts[previousValue]) {
          selectClass.value = previousValue;
        }
      }
    }

    // 2. Refresh Quick Class Pills Row
    if (classPillsRow) {
      if (allBooks.length === 0) {
        classPillsRow.innerHTML = `<button type="button" class="class-pill active" data-class="all">All Classes (0)</button>`;
      } else {
        const classCounts = {};
        allBooks.forEach(b => {
          const c = String(b.class).trim();
          classCounts[c] = (classCounts[c] || 0) + 1;
        });

        const sortedClasses = Object.keys(classCounts).sort((a, b) => {
          const numA = parseInt(a, 10);
          const numB = parseInt(b, 10);
          if (!isNaN(numA) && !isNaN(numB)) return numB - numA;
          return a.localeCompare(b);
        });

        let pillsHtml = `<button type="button" class="class-pill active" data-class="all">All Books (${allBooks.length})</button>`;
        sortedClasses.forEach(cls => {
          pillsHtml += `<button type="button" class="class-pill" data-class="${escapeHtml(cls)}">Class ${escapeHtml(cls)} (${classCounts[cls]})</button>`;
        });
        classPillsRow.innerHTML = pillsHtml;
      }
    }
  }

  // --- 3. EVENT LISTENERS ---
  function setupEventListeners() {
    // Universal Search Bar input
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim();
        if (searchClear) searchClear.style.display = q ? 'flex' : 'none';
        applyFilters();
      });

      // Enter key submits search smoothly
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyFilters();
        }
      });
    }

    // Dedicated Search Books Button
    const btnBookSearch = document.getElementById('btn-book-search');
    if (btnBookSearch) {
      btnBookSearch.addEventListener('click', () => {
        applyFilters();
        if (booksGrid) {
          booksGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Search clear button
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchClear.style.display = 'none';
        applyFilters();
        if (searchInput) searchInput.focus();
      });
    }

    // Quick Search Tags (e.g. Class 10, Science, Maths, Physics)
    if (searchTagsHint) {
      searchTagsHint.addEventListener('click', (e) => {
        const chip = e.target.closest('.search-chip');
        if (!chip) return;
        const queryTerm = chip.getAttribute('data-search') || chip.textContent.trim();
        if (searchInput) {
          searchInput.value = queryTerm;
          if (searchClear) searchClear.style.display = 'flex';
          applyFilters();
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }

    // Live Search Reset button in status bar
    if (btnClearSearchStatus) {
      btnClearSearchStatus.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.style.display = 'none';
        applyFilters();
      });
    }

    // 4-Step Finder Dropdowns
    if (selectClass) {
      selectClass.addEventListener('change', () => {
        onClassSelected(selectClass.value);
      });
    }

    if (selectSubject) {
      selectSubject.addEventListener('change', () => {
        onSubjectSelected(selectSubject.value);
      });
    }

    if (selectBook) {
      selectBook.addEventListener('change', () => {
        onBookSelected(selectBook.value);
      });
    }

    if (selectSubbook) {
      selectSubbook.addEventListener('change', () => {
        applyFilters();
      });
    }

    // Class Pills click delegation
    if (classPillsRow) {
      classPillsRow.addEventListener('click', (e) => {
        const pill = e.target.closest('.class-pill');
        if (!pill) return;
        document.querySelectorAll('.class-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cVal = pill.dataset.class;
        if (selectClass) selectClass.value = (cVal === 'all') ? '' : cVal;
        onClassSelected(selectClass ? selectClass.value : '');
      });
    }

    // Reset All Finder Filters
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        window.resetBookFinder();
      });
    }

    // PDF Modal Close events
    if (pdfModalClose) pdfModalClose.addEventListener('click', closePdfModal);
    if (pdfModal) {
      pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) closePdfModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pdfModal && pdfModal.classList.contains('active')) {
        closePdfModal();
      }
    });
  }

  // --- STEP 1: CLASS SELECTION ---
  function onClassSelected(classVal) {
    if (classVal) {
      if (stepBoxClass) stepBoxClass.classList.add('completed');
      if (stepBoxSubject) stepBoxSubject.classList.add('active');
    } else {
      if (stepBoxClass) stepBoxClass.classList.remove('completed');
      if (stepBoxSubject) stepBoxSubject.classList.remove('active', 'completed');
      if (stepBoxBook) stepBoxBook.classList.remove('active', 'completed');
      if (stepBoxSubbook) stepBoxSubbook.classList.remove('active', 'completed');
    }

    if (selectSubject) {
      selectSubject.innerHTML = '<option value="">All Subjects...</option>';
    }
    if (selectBook) {
      selectBook.innerHTML = '<option value="">Choose Subject First</option>';
      selectBook.disabled = true;
    }
    if (selectSubbook) {
      selectSubbook.innerHTML = '<option value="">Choose Book First</option>';
      selectSubbook.disabled = true;
    }

    if (!classVal) {
      if (selectSubject) {
        selectSubject.disabled = true;
        selectSubject.innerHTML = '<option value="">Choose Class First</option>';
      }
      syncPillState('all');
    } else {
      if (selectSubject) {
        selectSubject.disabled = false;
        const subjects = getUniqueValues(allBooks.filter(b => String(b.class) === String(classVal)), 'subject');
        subjects.forEach(sub => {
          const opt = document.createElement('option');
          opt.value = sub;
          opt.textContent = sub;
          selectSubject.appendChild(opt);
        });
      }
      syncPillState(classVal);
    }

    applyFilters();
  }

  // --- STEP 2: SUBJECT SELECTION ---
  function onSubjectSelected(subjectVal) {
    if (subjectVal) {
      if (stepBoxSubject) stepBoxSubject.classList.add('completed');
      if (stepBoxBook) stepBoxBook.classList.add('active');
    } else {
      if (stepBoxSubject) stepBoxSubject.classList.remove('completed');
      if (stepBoxBook) stepBoxBook.classList.remove('active', 'completed');
      if (stepBoxSubbook) stepBoxSubbook.classList.remove('active', 'completed');
    }

    if (selectBook) {
      selectBook.innerHTML = '<option value="">All Books...</option>';
    }
    if (selectSubbook) {
      selectSubbook.innerHTML = '<option value="">Choose Book First</option>';
      selectSubbook.disabled = true;
    }

    if (!subjectVal) {
      if (selectBook) selectBook.disabled = true;
    } else {
      if (selectBook) {
        selectBook.disabled = false;
        const classVal = selectClass ? selectClass.value : '';
        const booksInSub = getUniqueValues(allBooks.filter(b => (!classVal || String(b.class) === String(classVal)) && b.subject === subjectVal), 'book');
        booksInSub.forEach(bk => {
          const opt = document.createElement('option');
          opt.value = bk;
          opt.textContent = bk;
          selectBook.appendChild(opt);
        });
      }
    }

    applyFilters();
  }

  // --- STEP 3: BOOK SELECTION ---
  function onBookSelected(bookVal) {
    if (bookVal) {
      if (stepBoxBook) stepBoxBook.classList.add('completed');
      if (stepBoxSubbook) stepBoxSubbook.classList.add('active');
    } else {
      if (stepBoxBook) stepBoxBook.classList.remove('completed');
      if (stepBoxSubbook) stepBoxSubbook.classList.remove('active', 'completed');
    }

    if (selectSubbook) {
      selectSubbook.innerHTML = '<option value="">All Chapters / Sub-books...</option>';
      if (!bookVal) {
        selectSubbook.disabled = true;
      } else {
        selectSubbook.disabled = false;
        const classVal = selectClass ? selectClass.value : '';
        const subjectVal = selectSubject ? selectSubject.value : '';
        const subbooks = getUniqueValues(allBooks.filter(b =>
          (!classVal || String(b.class) === String(classVal)) &&
          (!subjectVal || b.subject === subjectVal) &&
          b.book === bookVal
        ), 'subbook');

        subbooks.forEach(sb => {
          const opt = document.createElement('option');
          opt.value = sb;
          opt.textContent = sb;
          selectSubbook.appendChild(opt);
        });
      }
    }

    applyFilters();
  }

  // --- 4. UNIVERSAL SEARCH & FILTER ENGINE ---
  function applyFilters() {
    const rawQuery = (searchInput ? searchInput.value : '').trim();
    const query = rawQuery.toLowerCase();
    const isSearching = !!query;

    const selectedClass = selectClass ? selectClass.value : '';
    const selectedSubject = selectSubject ? selectSubject.value : '';
    const selectedBook = selectBook ? selectBook.value : '';
    const selectedSubbook = selectSubbook ? selectSubbook.value : '';

    // Filter books
    filteredBooks = allBooks.filter(item => {
      // If user typed in search bar or clicked Search Books, search across ALL books in the catalog!
      if (isSearching) {
        return matchesUniversalSearch(item, query);
      }

      // If user has chosen guided finder filters (and query is empty)
      if (selectedClass && String(item.class) !== String(selectedClass)) return false;
      if (selectedSubject && item.subject !== selectedSubject) return false;
      if (selectedBook && (item.book !== selectedBook && item.book_title !== selectedBook)) return false;
      if (selectedSubbook && (item.subbook !== selectedSubbook && item.chapter_name !== selectedSubbook)) return false;

      return true;
    });

    // Update live search status banner
    if (searchLiveStatus && searchStatusText) {
      if (isSearching) {
        searchLiveStatus.style.display = 'flex';
        searchStatusText.innerHTML = `🔍 Universal Search: <strong>"${escapeHtml(rawQuery)}"</strong> &mdash; <span>${filteredBooks.length} book${filteredBooks.length !== 1 ? 's' : ''} found across entire library</span>`;
      } else {
        searchLiveStatus.style.display = 'none';
      }
    }

    updateSummaryBar(selectedClass, selectedSubject, selectedBook, selectedSubbook, isSearching, rawQuery);
    renderGrid(filteredBooks);
  }

  /**
   * Smart Universal Search Matcher:
   * Searches Class, Book Title, Subject, Chapter, Language, Edition, or any keyword.
   */
  function matchesUniversalSearch(item, query) {
    if (!query) return true;

    const cls = String(item.class || '').trim();
    const sub = String(item.subject || '').trim().toLowerCase();
    const bk = String(item.book || item.book_title || '').trim().toLowerCase();
    const ch = String(item.subbook || item.chapter_name || '').trim().toLowerCase();
    const ed = String(item.edition || '').trim().toLowerCase();
    const lang = String(item.language || '').trim().toLowerCase();
    const size = String(item.file_size || '').trim().toLowerCase();

    // Generate class search aliases (e.g. 10, class 10, class10, 10th)
    const classAliases = [
      cls,
      `class ${cls}`,
      `class-${cls}`,
      `class${cls}`,
      `grade ${cls}`,
      `std ${cls}`,
      `${cls}th`,
      `${cls}st`,
      `${cls}nd`,
      `${cls}rd`
    ].join(' ').toLowerCase();

    // Map common subject aliases (e.g. maths -> mathematics, sci -> science)
    let extraSubjectAliases = '';
    if (sub.includes('math') || bk.includes('math')) extraSubjectAliases += ' maths mathematics math arithmetic algebra geometry';
    if (sub.includes('science') || bk.includes('science')) extraSubjectAliases += ' sci science natural science';
    if (sub.includes('physics') || bk.includes('physics')) extraSubjectAliases += ' phy physics';
    if (sub.includes('chemistry') || bk.includes('chemistry')) extraSubjectAliases += ' chem chemistry';
    if (sub.includes('biology') || bk.includes('biology')) extraSubjectAliases += ' bio biology';
    if (sub.includes('social') || sub.includes('history') || sub.includes('geography')) extraSubjectAliases += ' sst social science history civics geography economics';
    if (sub.includes('english') || bk.includes('english')) extraSubjectAliases += ' eng english honeycomb beehive hornbill flamingo first flight footprint';
    if (sub.includes('hindi') || bk.includes('hindi')) extraSubjectAliases += ' hin hindi sparsh sanchayan kshitij kritika vasant rimjhim';
    if (sub.includes('computer') || bk.includes('computer')) extraSubjectAliases += ' cs computer science informatics practices it';
    if (sub.includes('sanskrit') || bk.includes('sanskrit')) extraSubjectAliases += ' sanskrit shemushi ruchira';

    const haystack = `${classAliases} ${sub} ${extraSubjectAliases} ${bk} ${ch} ${ed} ${lang} ${size}`.toLowerCase();

    // 1. Direct whole-string match
    if (haystack.includes(query)) return true;

    // 2. Multi-word token match (every word must match something in the book record)
    const tokens = query.split(/\s+/).filter(Boolean);
    if (tokens.length > 1) {
      const allTokensPresent = tokens.every(tok => {
        // Special case for class tokens like "10" or "class"
        if (tok === 'class' || tok === 'book' || tok === 'ncert' || tok === 'cbse') return true;
        return haystack.includes(tok);
      });
      if (allTokensPresent) return true;
    }

    return false;
  }

  // Update Summary Headline
  function updateSummaryBar(c, s, b, sb, isSearching, query) {
    if (!resultsCount) return;
    resultsCount.textContent = `${filteredBooks.length} book${filteredBooks.length !== 1 ? 's' : ''} available`;

    const parts = [];
    if (c) parts.push(`Class ${c}`);
    if (s) parts.push(`Subject: ${s}`);
    if (b) parts.push(`Book: ${b}`);
    if (sb) parts.push(`Chapter: ${sb}`);

    if (isSearching) {
      if (catalogTitle) catalogTitle.textContent = `Search Results for "${query}"`;
      if (finderSummary) {
        finderSummary.style.display = 'block';
        summaryText.textContent = `Searching entire library for "${query}"` + (parts.length ? ` in ${parts.join(' ➔ ')}` : '');
      }
    } else if (parts.length > 0) {
      if (finderSummary) {
        finderSummary.style.display = 'block';
        summaryText.textContent = parts.join(' ➔ ');
      }
      if (catalogTitle) catalogTitle.textContent = `Results for ${parts[0]}` + (s ? ` (${s})` : '');
    } else {
      if (finderSummary) finderSummary.style.display = 'none';
      if (catalogTitle) catalogTitle.textContent = 'All Published NCERT Textbooks & Chapters';
    }
  }

  // --- 5. RENDER BOOKS GRID ---
  function renderGrid(books) {
    if (!booksGrid) return;

    if (allBooks.length === 0) {
      booksGrid.innerHTML = `
        <div class="empty-books-state">
          <div class="icon">📚</div>
          <h4>No Books Published Yet</h4>
          <p>Currently, there are no books published in the library. As soon as books or chapters are uploaded via <strong>Admin Books Studio</strong>, they will instantly appear here for reading and downloading.</p>
          <a href="index.html" class="btn-book-read" style="display:inline-flex; width:auto; margin:0 auto; text-decoration:none;">
            ← Back to Home
          </a>
        </div>
      `;
      return;
    }

    if (books.length === 0) {
      booksGrid.innerHTML = `
        <div class="empty-books-state">
          <div class="icon">🔍</div>
          <h4>No matching books found</h4>
          <p>We couldn't find any published textbooks matching your search criteria. Try a different class number, book name, or reset your filters.</p>
          <button type="button" class="btn-book-read" style="display:inline-flex; width:auto; margin:0 auto;" onclick="window.resetBookFinder()">
            ↺ Clear Filters &amp; Show All Books
          </button>
        </div>
      `;
      return;
    }

    booksGrid.innerHTML = books.map(book => {
      const coverHtml = book.cover_url ?
        `<div class="book-cover-art" style="background-image:url('${escapeHtml(book.cover_url)}');"></div>` :
        `<div class="book-cover-art" style="background: linear-gradient(135deg, ${book.color || '#4f46e5'}, #1e1b4b);">
           <span class="book-cover-badge">NCERT • Class ${escapeHtml(book.class)}</span>
           <div class="book-cover-title">${escapeHtml(book.book)}</div>
         </div>`;

      return `
        <article class="book-card" data-id="${escapeHtml(book.id)}">
          <div class="book-cover-area">
            ${coverHtml}
            <span class="book-badge-verified">✓ Published</span>
          </div>

          <div class="book-body">
            <div class="book-tags">
              <span class="tag-chip class-tag">Class ${escapeHtml(book.class)}</span>
              <span class="tag-chip subject-tag">${escapeHtml(book.subject)}</span>
              <span class="tag-chip">${escapeHtml(book.language || 'English')}</span>
            </div>

            <h4 class="book-title">${escapeHtml(book.book)}</h4>
            <div class="book-chapter-name">${escapeHtml(book.subbook)}</div>

            <div class="book-meta-footer">
              <span>📅 ${escapeHtml(book.edition || 'NCERT')}</span>
              <span>💾 ${escapeHtml(book.file_size || 'PDF Document')}</span>
            </div>

            <div class="book-actions">
              <button type="button" class="btn-book-read" onclick="window.openBookReader('${escapeHtml(book.id)}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                Read Online
              </button>
              <a href="${escapeHtml(book.pdf_url)}" target="_blank" rel="noopener noreferrer" download class="btn-book-download" onclick="window.onBookDownload(event, '${escapeHtml(book.id)}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // --- 6. PDF READER MODAL ---
  window.openBookReader = function (bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;

    if (pdfModalTitle) {
      pdfModalTitle.textContent = `Class ${book.class} • ${book.book} (${book.subbook})`;
    }
    if (pdfModalNewtab) pdfModalNewtab.href = book.pdf_url;
    if (pdfModalDownload) pdfModalDownload.href = book.pdf_url;

    // Direct embed or Google Docs viewer wrapper for external URLs
    let viewerSrc = book.pdf_url;
    if (viewerSrc.startsWith('http') && !viewerSrc.includes(window.location.hostname)) {
      viewerSrc = `https://docs.google.com/viewer?url=${encodeURIComponent(book.pdf_url)}&embedded=true`;
    }

    if (pdfViewerFrame) pdfViewerFrame.src = viewerSrc;
    if (pdfModal) pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closePdfModal() {
    if (pdfModal) pdfModal.classList.remove('active');
    if (pdfViewerFrame) pdfViewerFrame.src = 'about:blank';
    document.body.style.overflow = '';
  }

  window.onBookDownload = function (e, bookId) {
    showToast('Download started for NCERT PDF!');
  };

  // --- 7. RESET FILTERS ---
  window.resetBookFinder = function () {
    if (selectClass) selectClass.value = '';
    if (selectSubject) {
      selectSubject.innerHTML = '<option value="">Choose Class First</option>';
      selectSubject.disabled = true;
    }
    if (selectBook) {
      selectBook.innerHTML = '<option value="">Choose Subject First</option>';
      selectBook.disabled = true;
    }
    if (selectSubbook) {
      selectSubbook.innerHTML = '<option value="">Choose Book First</option>';
      selectSubbook.disabled = true;
    }

    if (stepBoxClass) stepBoxClass.className = 'step-box active';
    if (stepBoxSubject) stepBoxSubject.className = 'step-box';
    if (stepBoxBook) stepBoxBook.className = 'step-box';
    if (stepBoxSubbook) stepBoxSubbook.className = 'step-box';

    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.style.display = 'none';

    syncPillState('all');
    applyFilters();
  };

  function syncPillState(classVal) {
    if (!classPillsRow) return;
    document.querySelectorAll('.class-pill').forEach(p => {
      if (p.dataset.class === classVal) p.classList.add('active');
      else p.classList.remove('active');
    });
  }

  function getUniqueValues(list, key) {
    const set = new Set();
    list.forEach(item => {
      if (item[key]) set.add(item[key]);
    });
    return Array.from(set).sort();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

})();
