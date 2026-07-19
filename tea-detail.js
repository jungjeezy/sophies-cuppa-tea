/* Sophie's Cuppa Tea — Product Detail Page */
(function () {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const teaName = params.get('name');
  if (!teaName) { document.querySelector('.pdp').innerHTML = '<p style="padding:200px 60px;text-align:center">No tea selected. <a href="find.html">Find your tea &rarr;</a></p>'; return; }

  const videoMap = {
    'Golden Osmanthus': 'https://youtu.be/B2vBEp8vV30',
    'Harmony': 'https://youtu.be/nFRinOngUh0',
    'Iron Goddess Roasted': 'https://youtu.be/aU_iEf2T4vI',
    'White Orchid': 'https://youtu.be/nXkf2gUZFZ0',
    'Golden Goddess': 'https://youtu.be/eZnDC39BeAM',
    'Golden Resurrection': 'https://youtu.be/VX0CmPTRsEM',
    'White Peony': 'https://youtu.be/gTuFmf9q2C4',
    'Plush Peak': 'https://youtu.be/t2Ai7Hs4vHI'
  };

  const typeColors = {
    'Green': '#4a7c4e', 'Red': '#b84033', 'Wulong': '#7a6a55',
    'Cliff Tea': '#7a6a55', 'White': '#9a8e7a', 'Yellow': '#c9a020',
    'Raw Black': '#5a4e3e', 'Fermented': '#3d3530'
  };

  const typeGradients = {
    'Green': 'linear-gradient(135deg, #e8efe5 0%, #d4e4cf 50%, #c5dabe 100%)',
    'Red': 'linear-gradient(135deg, #f5e8e4 0%, #ebd4cc 50%, #e0c0b4 100%)',
    'Wulong': 'linear-gradient(135deg, #f8f2e8 0%, #ede3d2 50%, #e0d3be 100%)',
    'Cliff Tea': 'linear-gradient(135deg, #edeae5 0%, #e0dbd2 50%, #d3cbbf 100%)',
    'White': 'linear-gradient(135deg, #f5f2ed 0%, #ebe6dd 50%, #e0d9cd 100%)',
    'Yellow': 'linear-gradient(135deg, #f7f0de 0%, #f0e5c8 50%, #e8d9b2 100%)',
    'Raw Black': 'linear-gradient(135deg, #eae6df 0%, #ddd7cc 50%, #d0c7b8 100%)',
    'Fermented': 'linear-gradient(135deg, #e8e5e2 0%, #dbd6d0 50%, #cec7be 100%)'
  };

  const typeMarks = {
    'Green': { bg: '#dfe9de', line: 'rgba(74,122,80,0.38)' },
    'Red': { bg: '#efe1db', line: 'rgba(176,72,56,0.36)' },
    'Wulong': { bg: '#e8e3d5', line: 'rgba(138,106,56,0.4)' },
    'Cliff Tea': { bg: '#e8e3d5', line: 'rgba(138,106,56,0.4)' },
    'White': { bg: '#e7ebe8', line: 'rgba(138,128,104,0.36)' },
    'Yellow': { bg: '#f0e5c8', line: 'rgba(192,144,48,0.36)' },
    'Raw Black': { bg: '#e5dfd4', line: 'rgba(90,78,62,0.34)' },
    'Fermented': { bg: '#e2ddd8', line: 'rgba(61,53,48,0.34)' }
  };

  const visualNameMap = {
    'Golden Osmanthus': 'osmanthus',
    'Harmony': 'balance',
    'Iron Goddess Roasted': 'goddess',
    'Iron Goddess Special': 'goddess',
    'White Orchid': 'orchid',
    'Golden Goddess': 'goddess',
    'Golden Resurrection': 'resurrection',
    'White Peony': 'peony',
    'Plush Peak': 'peak',
    'Hale and Hearty': 'hale',
    'Silver Tip': 'silver tip',
    'Red Border': 'border',
    'Black Peony': 'peony'
  };

  fetch('./teas.json')
    .then(r => r.json())
    .then(teas => {
      const tea = teas.find(t => t.name.toLowerCase() === teaName.toLowerCase());
      if (!tea) { document.querySelector('.pdp').innerHTML = '<p style="padding:200px 60px;text-align:center">Tea not found. <a href="find.html">Find your tea &rarr;</a></p>'; return; }

      const color = typeColors[tea.type] || '#7d766b';

      // Page title
      document.title = tea.name + ' — Sophie\'s Cuppa Tea';

      // Breadcrumb
      document.getElementById('breadcrumbName').textContent = tea.name;

      // Symbolic product visual. Story images can be generated later per tea.
      const imgEl = document.querySelector('.pdp-image-placeholder');
      const mark = typeMarks[tea.type] || typeMarks['Wulong'];
      imgEl.classList.add('pdp-symbol');
      imgEl.style.setProperty('--pdp-mark-bg', mark.bg);
      imgEl.style.setProperty('--pdp-mark-line', mark.line);
      document.getElementById('pdpTypeIcon').textContent = visualNameMap[tea.name] || tea.name;
      document.getElementById('pdpTypeIcon').style.color = color;
      if (tea.name === 'Plush Peak') {
        document.body.classList.add('is-plush-peak-session');
        imgEl.classList.add('pdp-story-art', 'pdp-story-art--plush-peak');
        document.getElementById('pdpTypeIcon').textContent = 'Plush Peak';
        document.getElementById('pdpTaste').textContent = 'A Fujian green tea session on renewal, altitude, and gentle toast.';
        document.getElementById('pdpTasteDetail').textContent = 'Spring meadow, rain-wet grass, gentle toast';
        document.querySelector('.pdp-price-note').textContent = 'per ounce · USDA certified organic';
        document.querySelector('.pdp-trust').innerHTML =
          '<div class="pdp-trust-item"><strong>USDA Certified Organic</strong><p>Grown in central Fujian, with other plants intentionally left between rows to support flavor.</p></div>' +
          '<div class="pdp-trust-item"><strong>Farm Relationship</strong><p>John describes visiting the area, seeing the certified farms, and getting to know the farmers behind this tea.</p></div>' +
          '<div class="pdp-trust-item"><strong>Not Lesser, Just Accessible</strong><p>The favorable price comes from Sophie’s sourcing arrangement, not from lower quality.</p></div>';
      }
      if (tea.name === 'Golden Osmanthus') {
        imgEl.classList.add('pdp-story-art', 'pdp-story-art--golden-osmanthus');
        document.getElementById('pdpTypeIcon').textContent = 'Golden Osmanthus';
      }

      // Info
      const badge = document.getElementById('pdpTypeBadge');
      badge.textContent = tea.type;
      badge.style.color = color;
      badge.style.background = color + '14';

      document.getElementById('pdpTitle').textContent = tea.name;
      document.getElementById('pdpRegion').textContent = tea.region ? tea.region + ' Province, China' : 'China';
      document.getElementById('pdpTaste').textContent = tea.taste;
      document.getElementById('pdpTemp').textContent = tea.temp ? tea.temp + '°F' : '—';
      document.getElementById('pdpSteep').textContent = tea.steep || '—';
      document.getElementById('pdpTasteDetail').textContent = tea.taste;

      // Flavors
      const flavorsEl = document.getElementById('pdpFlavors');
      flavorsEl.innerHTML = tea.flavors.map(f => '<span class="pdp-flavor-tag">' + f + '</span>').join('');

      // Moods
      const moodsEl = document.getElementById('pdpMoods');
      moodsEl.innerHTML = tea.moods.map(m => '<span class="pdp-mood-tag">' + m + '</span>').join('');

      // Video
      const videoUrl = videoMap[tea.name];
      if (videoUrl) {
        document.getElementById('pdpVideoSection').style.display = 'block';
        document.getElementById('pdpVideoLink').href = videoUrl;
      }

      // Sticky bar
      document.getElementById('stickyName').textContent = tea.name;

      // Similar teas (same taste family, different tea)
      const similar = teas.filter(t => t.taste === tea.taste && t.name !== tea.name).slice(0, 4);
      const simEl = document.getElementById('pdpSimilar');
      simEl.innerHTML = similar.map(s =>
        '<a href="tea.html?name=' + encodeURIComponent(s.name) + '" class="pdp-similar-card">' +
        '<span class="pdp-similar-type" style="color:' + (typeColors[s.type] || '#7d766b') + '">' + s.type + '</span>' +
        '<strong>' + s.name + '</strong>' +
        '<span class="pdp-similar-region">' + (s.region || 'China') + '</span>' +
        '</a>'
      ).join('');

      // Show sticky bar on scroll past add button
      const addBtn = document.getElementById('pdpAdd');
      const stickyBar = document.getElementById('stickyBuy');
      if (addBtn && stickyBar) {
        const obs = new IntersectionObserver(([e]) => {
          stickyBar.classList.toggle('is-visible', !e.isIntersecting);
        }, { threshold: 0 });
        obs.observe(addBtn);
      }
    });

  // Quantity controls
  let qty = 1;
  const qtyNum = document.getElementById('qtyNum');
  document.getElementById('qtyMinus').addEventListener('click', () => {
    if (qty > 1) { qty--; qtyNum.textContent = qty; }
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    if (qty < 10) { qty++; qtyNum.textContent = qty; }
  });

  // Size selector
  document.querySelectorAll('.pdp-size').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pdp-size').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
    });
  });

  // Add to cart (placeholder)
  function addToCart() {
    const btn = document.getElementById('pdpAdd');
    const originalText = btn.textContent;
    btn.textContent = 'Added!';
    btn.style.background = '#4a7c4e';
    setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; }, 1500);
  }
  document.getElementById('pdpAdd').addEventListener('click', addToCart);
  document.getElementById('stickyAdd').addEventListener('click', addToCart);
})();
