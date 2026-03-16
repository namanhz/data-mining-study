document.addEventListener('DOMContentLoaded', () => {
  const state = {
    mode: 'theory',
    activeSection: 'home',
    checked: JSON.parse(localStorage.getItem('dm_checked') || '{}'),
    solutionsShown: {}
  };

  // Navigation
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');
  const modeTabs = document.querySelectorAll('.mode-tab');
  const headerTitle = document.getElementById('header-title');
  const headerBadge = document.getElementById('header-badge');

  function navigateTo(sectionId) {
    state.activeSection = sectionId;
    sections.forEach(s => s.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0 });
    }
    const activeNav = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
    if (activeNav) {
      activeNav.classList.add('active');
      headerTitle.textContent = activeNav.querySelector('.nav-text')?.textContent || 'Data Mining';
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      if (section) navigateTo(section);
      // Close mobile sidebar
      document.querySelector('.sidebar')?.classList.remove('open');
    });
  });

  // Mode tabs (theory vs practice)
  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.mode;
      state.mode = mode;
      modeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show/hide nav items based on mode
      navItems.forEach(item => {
        const itemMode = item.dataset.mode;
        if (!itemMode || itemMode === 'both') {
          item.style.display = '';
        } else if (itemMode === mode) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });

      // Navigate to first visible item or home
      navigateTo('home');
    });
  });

  // Exercise toggle
  document.querySelectorAll('.exercise-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.exercise-card');
      card.classList.toggle('open');
    });
  });

  // Solution toggle
  document.querySelectorAll('.solution-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const content = btn.nextElementSibling;
      if (content) {
        content.classList.toggle('visible');
        btn.textContent = content.classList.contains('visible') ? '🔒 Ẩn lời giải' : '💡 Xem lời giải';
      }
    });
  });

  // Copy code
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const block = btn.closest('.code-block');
      const code = block.querySelector('pre').textContent;
      navigator.clipboard.writeText(code).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
      });
    });
  });

  // Checklist
  document.querySelectorAll('.checklist li').forEach(item => {
    const key = item.dataset.key;
    if (key && state.checked[key]) {
      item.classList.add('checked');
    }
    item.addEventListener('click', () => {
      const k = item.dataset.key;
      if (!k) return;
      item.classList.toggle('checked');
      state.checked[k] = item.classList.contains('checked');
      localStorage.setItem('dm_checked', JSON.stringify(state.checked));
      updateProgress();
    });
  });

  // Progress
  function updateProgress() {
    const total = document.querySelectorAll('.checklist li[data-key]').length;
    const done = Object.values(state.checked).filter(Boolean).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const bar = document.getElementById('progress-bar');
    const label = document.getElementById('progress-pct');
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = pct + '%';
  }

  // Mobile menu
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      document.querySelector('.sidebar').classList.toggle('open');
    });
  }

  // Init
  updateProgress();
  navigateTo('home');
});
