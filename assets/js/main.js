/**
 * Workshop Repair Manual - Main JavaScript
 * Handles: Theme toggle, search, mobile menu, year tabs, wiring interactivity
 */

(function() {
  'use strict';

  // ============================================
  // THEME TOGGLE
  // ============================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const STORAGE_KEY = 'repair-manual-theme';

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark') {
      html.setAttribute('data-theme', 'dark');
      updateThemeIcon(true);
    } else if (saved === 'light') {
      html.removeAttribute('data-theme');
      updateThemeIcon(false);
    } else {
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
      }
    }
  }

  function updateThemeIcon(isDark) {
    if (!themeToggle) return;
    themeToggle.innerHTML = isDark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      if (isDark) {
        html.removeAttribute('data-theme');
        localStorage.setItem(STORAGE_KEY, 'light');
        updateThemeIcon(false);
      } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem(STORAGE_KEY, 'dark');
        updateThemeIcon(true);
      }
    });
  }

  initTheme();

  // ============================================
  // MOBILE MENU
  // ============================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      navLinks.style.position = 'absolute';
      navLinks.style.top = 'var(--nav-height)';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'var(--bg-secondary)';
      navLinks.style.flexDirection = 'column';
      navLinks.style.padding = '1rem';
      navLinks.style.boxShadow = 'var(--shadow-lg)';
      navLinks.style.borderBottom = '1px solid var(--border)';
    });
  }

  // ============================================
  // YEAR TABS
  // ============================================
  function initYearTabs() {
    const tabContainers = document.querySelectorAll('.year-tabs');
    tabContainers.forEach(container => {
      const tabs = container.querySelectorAll('.year-tab');
      const panels = container.parentElement.querySelectorAll('.year-panel');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.target;
          
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          
          panels.forEach(p => {
            if (p.dataset.panel === target) {
              p.classList.add('active');
            } else {
              p.classList.remove('active');
            }
          });
        });
      });
    });
  }

  initYearTabs();

  // ============================================
  // SEARCH
  // ============================================
  const searchInput = document.getElementById('searchInput');
  
  if (searchInput) {
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.toLowerCase().trim();
      
      searchTimeout = setTimeout(() => {
        if (query.length < 2) {
          // Clear highlights
          document.querySelectorAll('.search-highlight').forEach(el => {
            el.outerHTML = el.innerHTML;
          });
          return;
        }
        
        performSearch(query);
      }, 300);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length >= 2) {
          // Navigate to relevant page based on search
          navigateFromSearch(query);
        }
      }
    });
  }

  function performSearch(query) {
    const content = document.querySelector('.main-content');
    if (!content) return;
    
    // Simple in-page search highlight
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
    const matches = [];
    let node;
    
    while (node = walker.nextNode()) {
      if (node.textContent.toLowerCase().includes(query)) {
        matches.push(node);
      }
    }
    
    // Could scroll to first match
    if (matches.length > 0) {
      matches[0].parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function navigateFromSearch(query) {
    // Map common search terms to pages
    const searchMap = {
      'engine': { vw: 'vw-golf-mk2/systems/engine.html', honda: 'honda-hrv/systems/engine.html' },
      'fuel': { vw: 'vw-golf-mk2/systems/fuel.html', honda: 'honda-hrv/systems/fuel.html' },
      'ignition': { vw: 'vw-golf-mk2/systems/ignition.html', honda: 'honda-hrv/systems/ignition.html' },
      'cooling': { vw: 'vw-golf-mk2/systems/cooling.html', honda: 'honda-hrv/systems/cooling.html' },
      'brake': { vw: 'vw-golf-mk2/systems/brakes.html', honda: 'honda-hrv/systems/brakes.html' },
      'suspension': { vw: 'vw-golf-mk2/systems/suspension.html', honda: 'honda-hrv/systems/suspension.html' },
      'electrical': { vw: 'vw-golf-mk2/systems/electrical.html', honda: 'honda-hrv/systems/electrical.html' },
      'wiring': { vw: 'vw-golf-mk2/wiring/', honda: 'honda-hrv/wiring/' },
      'transmission': { vw: 'vw-golf-mk2/systems/transmission.html', honda: 'honda-hrv/systems/transmission.html' },
      'clutch': { vw: 'vw-golf-mk2/systems/clutch.html', honda: 'honda-hrv/systems/clutch.html' },
      'timing': { vw: 'vw-golf-mk2/systems/engine.html', honda: 'honda-hrv/systems/engine.html' },
      'piston': { vw: 'vw-golf-mk2/systems/engine.html', honda: 'honda-hrv/systems/engine.html' },
      'alternator': { vw: 'vw-golf-mk2/systems/electrical.html', honda: 'honda-hrv/systems/electrical.html' },
      'starter': { vw: 'vw-golf-mk2/systems/electrical.html', honda: 'honda-hrv/systems/electrical.html' },
      'injector': { vw: 'vw-golf-mk2/systems/fuel.html', honda: 'honda-hrv/systems/fuel.html' },
      'sensor': { vw: 'vw-golf-mk2/systems/electrical.html', honda: 'honda-hrv/systems/electrical.html' },
      'headlight': { vw: 'vw-golf-mk2/wiring/lighting.html', honda: 'honda-hrv/wiring/lighting.html' },
      'relay': { vw: 'vw-golf-mk2/systems/electrical.html', honda: 'honda-hrv/systems/electrical.html' },
    };

    let targetPage = null;
    for (const [key, pages] of Object.entries(searchMap)) {
      if (query.includes(key)) {
        // Determine which vehicle
        const isVw = query.includes('golf') || query.includes('vw') || query.includes('volkswagen') || query.includes('jetta');
        const isHonda = query.includes('honda') || query.includes('hrv') || query.includes('h-rv');
        
        if (isHonda) {
          targetPage = pages.honda;
        } else if (isVw) {
          targetPage = pages.vw;
        } else {
          // Default to VW if on VW page, Honda if on Honda page
          const currentPath = window.location.pathname;
          if (currentPath.includes('honda')) {
            targetPage = pages.honda;
          } else {
            targetPage = pages.vw;
          }
        }
        break;
      }
    }

    if (targetPage) {
      window.location.href = '/' + targetPage;
    }
  }

  // ============================================
  // WIRING DIAGRAM INTERACTIVITY
  // ============================================
  function initWiringDiagrams() {
    // Component hover tooltips
    document.querySelectorAll('.wiring-comp').forEach(comp => {
      comp.addEventListener('mouseenter', (e) => {
        const tooltip = comp.querySelector('.wiring-tooltip');
        if (tooltip) tooltip.style.display = 'block';
      });
      comp.addEventListener('mouseleave', (e) => {
        const tooltip = comp.querySelector('.wiring-tooltip');
        if (tooltip) tooltip.style.display = 'none';
      });
    });

    // Wire click to highlight
    document.querySelectorAll('.wire-path').forEach(wire => {
      wire.addEventListener('click', () => {
        const wireId = wire.dataset.wireId;
        const isActive = wire.classList.contains('active');
        
        // Clear all active
        document.querySelectorAll('.wire-path').forEach(w => w.classList.remove('active'));
        
        if (!isActive) {
          // Highlight this wire and all connected
          document.querySelectorAll(`[data-wire-id="${wireId}"]`).forEach(w => {
            w.classList.add('active');
          });
        }
      });
    });
  }

  initWiringDiagrams();

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // ACTIVE NAV LINK HIGHLIGHTING
  // ============================================
  function highlightActiveNav() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a, .sidebar a').forEach(link => {
      if (link.getAttribute('href') === currentPath || 
          currentPath.includes(link.getAttribute('href').replace(/^\//, ''))) {
        link.classList.add('active');
      }
    });
  }

  highlightActiveNav();

  // ============================================
  // BACK TO TOP
  // ============================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.style.display = 'flex';
      } else {
        backToTop.style.display = 'none';
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  console.log('[Repair Manual] Initialized successfully');
})();
