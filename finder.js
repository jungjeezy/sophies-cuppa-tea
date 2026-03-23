/* Sophie's Cuppa Tea — Find Your Tea */
(function () {
  'use strict';

  let teas = [];
  const filters = { taste: 'all', mood: 'all', type: 'all', region: 'all' };
  let searchQuery = '';

  const results = document.getElementById('finderResults');
  const countEl = document.getElementById('resultCount');
  if (!results) return;

  // Load data
  fetch('./teas.json')
    .then(r => r.json())
    .then(data => { teas = data; render(); })
    .catch(() => { results.innerHTML = '<p>Could not load tea data.</p>'; });

  function shopUrl(name) {
    return 'tea.html?name=' + encodeURIComponent(name);
  }

  // Type color
  function typeColor(type) {
    const map = {
      'Green': '#4a7c4e', 'Red': '#b84033', 'Wulong': '#7a6a55',
      'Cliff Tea': '#7a6a55', 'White': '#9a8e7a', 'Yellow': '#c9a020',
      'Raw Black': '#5a4e3e', 'Fermented': '#3d3530'
    };
    return map[type] || '#7d766b';
  }

  // Taste emoji (subtle)
  function tasteIcon(taste) {
    const map = {
      'Sweet & Floral': 'sweet-floral', 'Rich & Warming': 'rich-warming',
      'Bright & Crisp': 'bright-crisp', 'Roasted & Deep': 'roasted-deep',
      'Earthy & Grounding': 'earthy-grounding', 'Smooth & Savory': 'smooth-savory',
      'Complex': 'complex'
    };
    return map[taste] || 'complex';
  }

  function render() {
    let filtered = teas.filter(t => {
      if (filters.taste !== 'all' && t.taste !== filters.taste) return false;
      if (filters.mood !== 'all' && !t.moods.includes(filters.mood)) return false;
      if (filters.type !== 'all' && t.type !== filters.type) return false;
      if (filters.region !== 'all' && t.region !== filters.region) return false;
      if (searchQuery && !t.name.toLowerCase().includes(searchQuery)) return false;
      return true;
    });

    countEl.textContent = filtered.length + (filtered.length === 1 ? ' tea' : ' teas');

    if (filtered.length === 0) {
      results.innerHTML = '<div class="finder-empty"><h3>No teas match those filters.</h3><p>Try broadening your search or resetting filters.</p></div>';
      return;
    }

    // Group by taste family
    const groups = {};
    filtered.forEach(t => {
      if (!groups[t.taste]) groups[t.taste] = [];
      groups[t.taste].push(t);
    });

    let html = '';
    for (const [taste, items] of Object.entries(groups)) {
      html += '<div class="finder-group-section">';
      html += '<h3 class="finder-group-title">' + taste + '</h3>';
      html += '<div class="finder-grid">';
      items.forEach(t => {
        const color = typeColor(t.type);
        const flavorHtml = t.flavors.slice(0, 3).map(f => '<span>' + f + '</span>').join('');
        const moodHtml = t.moods.map(m => '<span class="mood-tag">' + m + '</span>').join('');
        html += `
          <a href="${shopUrl(t.name)}" target="_blank" rel="noopener" class="finder-card">
            <div class="finder-card-top">
              <span class="finder-type" style="color:${color}">${t.type}</span>
              ${t.region ? '<span class="finder-region">' + t.region + '</span>' : ''}
            </div>
            <h4>${t.name}</h4>
            <div class="finder-flavors">${flavorHtml}</div>
            <div class="finder-moods">${moodHtml}</div>
            <div class="finder-card-bottom">
              ${t.temp ? '<span>' + t.temp + '°F</span>' : ''}
              ${t.steep ? '<span>' + t.steep + '</span>' : ''}
            </div>
          </a>`;
      });
      html += '</div></div>';
    }

    results.innerHTML = html;
  }

  // Filter clicks
  document.querySelectorAll('.ftag').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const val = btn.dataset.val;
      filters[key] = val;
      // Update active states within group
      btn.closest('.finder-group').querySelectorAll('.ftag').forEach(b => b.classList.remove('is-on'));
      btn.classList.add('is-on');
      render();
    });
  });

  // Search
  const searchInput = document.getElementById('teaSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.toLowerCase().trim();
      render();
    });
  }

  // Reset
  const resetBtn = document.getElementById('resetAll');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      filters.taste = 'all'; filters.mood = 'all'; filters.type = 'all'; filters.region = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('.ftag').forEach(b => {
        b.classList.toggle('is-on', b.dataset.val === 'all');
      });
      render();
    });
  }
})();
