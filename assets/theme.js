document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Transparent header overlay on hero ---------- */
  var heroSection = document.querySelector('#MainContent .hero');
  var siteHeader = document.querySelector('.site-header');
  if (heroSection && siteHeader) {
    siteHeader.classList.add('site-header--overlay');
  }

  /* ---------- Mobile menu toggle ---------- */
  var toggle = document.querySelector('.navbar__mobile-toggle');
  var mobileMenu = document.getElementById('MobileMenu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ---------- Quantity selectors (used on product cards + PDP) ---------- */
  document.querySelectorAll('.qty-selector').forEach(function (selector) {
    var input = selector.querySelector('[data-qty-input]');
    var display = selector.querySelector('[data-qty-value]');
    var minus = selector.querySelector('[data-qty-minus]');
    var plus = selector.querySelector('[data-qty-plus]');
    if (!input || !display) return;

    function update(newVal) {
      newVal = Math.max(1, newVal);
      input.value = newVal;
      display.textContent = newVal;
    }

    if (minus) minus.addEventListener('click', function () { update(parseInt(input.value || '1', 10) - 1); });
    if (plus) plus.addEventListener('click', function () { update(parseInt(input.value || '1', 10) + 1); });
  });

  /* ---------- Hero carousel ---------- */
  document.querySelectorAll('.hero').forEach(function (hero) {
    var slides = hero.querySelectorAll('.hero__slide');
    var dots = hero.querySelectorAll('.hero__dot');
    if (slides.length < 2) return;
    var current = 0;

    function goTo(index) {
      slides[current].classList.remove('is-active');
      if (dots[current]) dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    setInterval(function () { goTo(current + 1); }, 6000);
  });

  /* ---------- Horizontal carousel nav buttons ---------- */
  document.querySelectorAll('[data-carousel-prev]').forEach(function (btn) {
    var targetId = btn.getAttribute('data-carousel-prev');
    btn.addEventListener('click', function () {
      var track = document.getElementById(targetId);
      if (track) track.scrollBy({ left: -320, behavior: 'smooth' });
    });
  });
  document.querySelectorAll('[data-carousel-next]').forEach(function (btn) {
    var targetId = btn.getAttribute('data-carousel-next');
    btn.addEventListener('click', function () {
      var track = document.getElementById(targetId);
      if (track) track.scrollBy({ left: 320, behavior: 'smooth' });
    });
  });

  /* ---------- Product page thumbnail swap ---------- */
  document.querySelectorAll('.product-page__thumbs').forEach(function (thumbs) {
    var mainImageWrap = thumbs.closest('.product-page__gallery').querySelector('.product-page__main-image img');
    thumbs.querySelectorAll('.product-page__thumb').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        thumbs.querySelectorAll('.product-page__thumb').forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
        if (mainImageWrap) mainImageWrap.setAttribute('src', thumb.getAttribute('data-image-src'));
      });
    });
  });

  /* ---------- Add-to-cart via AJAX for favorite product cards ---------- */
  document.querySelectorAll('favorite-product-form form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(form);
      fetch('/cart/add.js', { method: 'POST', body: formData })
        .then(function (res) { return res.json(); })
        .then(function () {
          return fetch('/cart.js').then(function (r) { return r.json(); });
        })
        .then(function (cart) {
          var cartIcon = document.getElementById('header-cart-icon');
          if (cartIcon) {
            var span = cartIcon.querySelector('span');
            if (span) span.textContent = 'Cart (' + cart.item_count + ')';
          }
          var btn = form.querySelector('.btn--add-to-cart span');
          if (btn) {
            var original = btn.textContent;
            btn.textContent = 'Added!';
            setTimeout(function () { btn.textContent = original; }, 1500);
          }
        })
        .catch(function (err) { console.error('Add to cart failed', err); form.submit(); });
    });
  });
});
