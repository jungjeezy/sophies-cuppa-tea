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

  const editorialPages = {
    'Plush Peak': {
      themeClass: 'is-plush-peak-session',
      type: 'Green Tea',
      originTag: 'Central Fujian',
      altitude: '4,500 ft',
      title: 'Plush Peak',
      deck: 'A bright organic green tea with spring meadow, rain-wet grass, juicy sweetness, and a soft toasted finish. The point is not drama. The point is clarity.',
      guideTitle: 'Read the leaf before you brew it.',
      guideIntro: 'These notes give the quick version of what matters: how the tea tastes, how it is made, why the region matters, and how to brew it without flattening the cup.',
      tasteTitle: 'Spring meadow, rain-wet grass, gentle toast.',
      tasteBody: 'The cup opens green and clean, then moves toward juicy sweetness and a quiet toasted-hay note. It is approachable without being plain, and its best quality is how clearly it shows what careful green tea can taste like.',
      brewTitle: '175°F. Four minutes. Pour beside the leaf.',
      brewBody: 'Warm the cup first. Let the water cool slightly after boiling. Pour along the side of the cup instead of directly onto the leaves. The goal is brightness without bitterness.',
      processTitle: 'Picked by hand, then heated, rolled, and dried.',
      processBody: 'Plush Peak is a green tea, so the leaf is handled to preserve freshness and prevent full oxidation. The careful drying keeps moisture low enough for clean storage and a stable cup.',
      originTitle: 'Central Fujian, high elevation, organic cultivation.',
      originBody: 'Plush Peak comes from a USDA-certified organic green tea operation in central Fujian. Other plants are intentionally left between rows of tea bushes, part of an agricultural environment that supports a cleaner, more expressive leaf.',
      contextLabel: 'Tea Culture Context',
      contextTitle: 'A clean green tea often described as cooling.',
      contextBody: 'In traditional Chinese tea culture, green tea is often discussed as a cooling tea, especially in warmer weather. We include that as cultural context for how the cup is understood, not as a medical claim.',
      valueLabel: 'Why The Price Is Approachable',
      valueTitle: 'Accessible does not mean lesser.',
      valueBody: 'Plush Peak is priced as an approachable entry point, but that does not make it a lesser tea. The value is in the combination: organic cultivation, clean flavor, careful brewing, and a clear sense of place.',
      photoTitle: 'The actual dry leaf.',
      photoBody: 'A practical reference point after the field notes. Click the image to open the larger product photo and inspect the leaf more closely.',
      photoSrc: './img/plush-peak-live-tea.png',
      photoAlt: 'Plush Peak dry tea leaves',
      hiddenArt: './img/plush-peak-story-art-transparent.png',
      deepTitle: 'The full field note belongs here.',
      deepBody: 'Use this space for the longer blog: Fujian green tea history, why this region exports so much tea, the Japanese matcha connection, brewing mistakes, and what to notice as the cup changes.'
    },
    'Golden Osmanthus': {
      themeClass: 'is-golden-osmanthus-session',
      type: 'Wulong Tea',
      originTag: 'Anxi, Fujian',
      altitude: 'Osmanthus scent',
      title: 'Golden Osmanthus',
      deck: 'A honeyed Fujian wulong with golden floral lift, sweet potato warmth, and a soft corn-sweet finish. It should feel fragrant without becoming perfume.',
      guideTitle: 'Let the fragrance arrive before the sweetness.',
      guideIntro: 'Golden Osmanthus is built around aroma first: flower, honey, warm starch, and a rounded wulong body. These notes keep the cup grounded so the floral character stays elegant.',
      tasteTitle: 'Honey, osmanthus blossom, sweet potato, soft corn.',
      tasteBody: 'The first impression is floral and golden, but the center of the cup is warmer than that: honey sweetness, sweet potato, and a popcorn-like grain note that keeps the aroma from floating away.',
      brewTitle: '200°F. Two minutes. Give the rolled leaf room.',
      brewBody: 'Use hotter water than a green tea and let the rolled wulong open. A two-minute first steep keeps the fragrance intact while giving the body enough time to round out.',
      processTitle: 'Rolled wulong, made to hold aroma.',
      processBody: 'The tightly rolled leaf slowly releases fragrance as it opens. That unfolding is part of the session: aroma first, then sweetness, then a warmer body as the cup settles.',
      originTitle: 'Anxi, Fujian, a wulong region with deep craft memory.',
      originBody: 'The page should treat Anxi as a real place, not just a romantic backdrop. It is one of Fujian’s important wulong regions, and the sourcing story should be filled in further once the transcript notes are reviewed.',
      contextLabel: 'Fragrance',
      contextTitle: 'Osmanthus reads as golden, floral, and quietly sweet.',
      contextBody: 'In Chinese tea culture, floral fragrance is not decoration. It is part of how a tea announces itself. Here, the osmanthus cue gives the cup a luminous top note while the wulong keeps it grounded.',
      valueLabel: 'Why This Price Makes Sense',
      valueTitle: 'The luxury is in restraint.',
      valueBody: 'This tea should not be sold as loud flavoring. The premium feeling comes from balance: fragrance that is clear, sweetness that is warm, and a cup that changes without needing explanation.',
      photoTitle: 'The actual rolled leaf.',
      photoBody: 'A practical reference point after the field notes. Click the image to open the larger product photo and inspect the rolled wulong leaf more closely.',
      photoSrc: './img/golden-osmanthus.jpg',
      photoAlt: 'Golden Osmanthus dry rolled tea leaves',
      hiddenArt: './img/golden-osmanthus-story-art-transparent.png',
      deepTitle: 'The full osmanthus field note belongs here.',
      deepBody: 'Use this space for the longer blog: Anxi wulong, osmanthus fragrance, how rolled leaves open in the cup, brewing with hotter water, and how to notice honey, sweet potato, and corn sweetness.'
    }
  };

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined) el.textContent = value;
  }

  function applyEditorialPage(tea, page) {
    document.body.classList.add('is-plush-peak-session');
    if (page.themeClass) document.body.classList.add(page.themeClass);
    setText('editorialType', page.type);
    setText('editorialOriginTag', page.originTag);
    setText('editorialAltitude', page.altitude);
    setText('editorialTitle', page.title);
    setText('editorialDeck', page.deck);
    setText('editorialGuideTitle', page.guideTitle);
    setText('editorialGuideIntro', page.guideIntro);
    setText('editorialTasteTitle', page.tasteTitle);
    setText('editorialTasteBody', page.tasteBody);
    setText('editorialBrewTitle', page.brewTitle);
    setText('editorialBrewBody', page.brewBody);
    setText('editorialProcessTitle', page.processTitle);
    setText('editorialProcessBody', page.processBody);
    setText('editorialOriginTitle', page.originTitle);
    setText('editorialOriginBody', page.originBody);
    setText('editorialContextLabel', page.contextLabel);
    setText('editorialContextTitle', page.contextTitle);
    setText('editorialContextBody', page.contextBody);
    setText('editorialValueLabel', page.valueLabel);
    setText('editorialValueTitle', page.valueTitle);
    setText('editorialValueBody', page.valueBody);
    setText('editorialPhotoTitle', page.photoTitle);
    setText('editorialPhotoBody', page.photoBody);
    setText('editorialDeepTitle', page.deepTitle);
    setText('editorialDeepBody', page.deepBody);

    const hiddenArt = document.getElementById('editorialHiddenArt');
    if (hiddenArt) hiddenArt.src = page.hiddenArt;
    const photoLink = document.getElementById('editorialPhotoLink');
    const photoImage = document.getElementById('editorialPhotoImage');
    if (photoLink) photoLink.href = page.photoSrc;
    if (photoImage) {
      photoImage.src = page.photoSrc;
      photoImage.alt = page.photoAlt;
    }
    const videoLink = document.getElementById('editorialVideoLink');
    if (videoLink && videoMap[tea.name]) videoLink.href = videoMap[tea.name];
  }

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
      if (editorialPages[tea.name]) {
        applyEditorialPage(tea, editorialPages[tea.name]);
      }
      if (tea.name === 'Plush Peak') {
        imgEl.classList.add('pdp-story-art', 'pdp-story-art--plush-peak');
        document.getElementById('pdpTypeIcon').textContent = 'Plush Peak';
        document.getElementById('pdpTaste').textContent = 'A Fujian green tea session on renewal, altitude, and gentle toast.';
        document.getElementById('pdpTasteDetail').textContent = 'Spring meadow, rain-wet grass, gentle toast';
        document.querySelector('.pdp-price-note').textContent = 'per ounce · USDA certified organic';
        document.querySelector('.pdp-trust').innerHTML =
          '<div class="pdp-trust-item"><strong>USDA Certified Organic</strong><p>Grown in central Fujian, with other plants intentionally left between rows to support flavor.</p></div>' +
          '<div class="pdp-trust-item"><strong>Farm Relationship</strong><p>Selected through direct familiarity with the area, certified farms, and farming practices behind this tea.</p></div>' +
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
      if (tea.name === 'Plush Peak') {
        document.getElementById('pdpTaste').textContent = 'A Fujian green tea session on renewal, altitude, and gentle toast.';
        document.getElementById('pdpTasteDetail').textContent = 'Spring meadow, rain-wet grass, gentle toast';
      }

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
  function addToCart(event) {
    const btn = event && event.currentTarget ? event.currentTarget : document.getElementById('pdpAdd');
    const originalText = btn.textContent;
    btn.textContent = 'Added!';
    btn.style.background = '#4a7c4e';
    setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; }, 1500);
  }
  document.getElementById('pdpAdd').addEventListener('click', addToCart);
  document.getElementById('stickyAdd').addEventListener('click', addToCart);
  document.querySelectorAll('.plush-add').forEach(btn => {
    btn.addEventListener('click', addToCart);
  });
  document.querySelectorAll('.plush-size-row button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.plush-size-row button').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
    });
  });
})();
