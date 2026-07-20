(function () {
  'use strict';

  const posts = window.SOPHIES_BLOG_POSTS || [];
  const archive = document.querySelector('[data-blog-archive]');
  const article = document.querySelector('[data-blog-post]');

  if (archive) {
    archive.innerHTML = posts.map((post) => `
      <a href="blog.html?post=${encodeURIComponent(post.slug)}" class="learn-card blog-archive-card reveal">
        <div class="learn-num">${post.number}</div>
        <div class="blog-card-meta">${post.category}</div>
        <h3>${post.title}</h3>
        <p>${post.dek}</p>
        <span class="learn-arrow">Read draft &rarr;</span>
      </a>
    `).join('');
  }

  if (!article) return;

  const requested = new URLSearchParams(window.location.search).get('post');
  const post = posts.find((item) => item.slug === requested) || posts[0];
  if (!post) return;

  document.title = `${post.title} — Sophie's Cuppa Tea`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', post.dek);

  article.innerHTML = `
    <div class="blog-post-grid">
      <article class="blog-article reveal">
        <a href="learn.html" class="blog-back">&larr; Back to Blog</a>
        <div class="blog-kicker">${post.category} / Draft ${post.number}</div>
        <h1>${post.title}</h1>
        <p class="blog-dek">${post.dek}</p>
        <div class="blog-body">
          ${post.sections ? post.sections.map((section) => `
            <section class="blog-section">
              <h2>${section.heading}</h2>
              ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
            </section>
          `).join('') : post.body.map((paragraph) => `<p>${paragraph}</p>`).join('')}
        </div>
        <div class="blog-post-actions">
          <a href="${post.ctaHref}" class="btn btn-dark">${post.ctaLabel}</a>
          <a href="${post.secondaryHref}" class="btn btn-ghost">${post.secondaryLabel}</a>
        </div>
      </article>

      <aside class="blog-sidebar reveal">
        <span class="label">All Drafts</span>
        <div class="blog-list">
          ${posts.map((item) => `
            <a href="blog.html?post=${encodeURIComponent(item.slug)}" class="${item.slug === post.slug ? 'is-current' : ''}">
              <span>${item.number}</span>
              <strong>${item.title}</strong>
            </a>
          `).join('')}
        </div>
      </aside>
    </div>
  `;
})();
