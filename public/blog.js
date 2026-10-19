/* Kwarto blog renderer.
   - /blog (blog.html): featured post + filterable card grid.
   - /blog/<slug> or blog-post.html?post=<slug>: full article, "Where to book" box, related posts.
   - index.html: "Latest from the blog" row ([data-blog-latest]).
   CTAs: posts spotted on nitecrawler.com link to their nitecrawler listing (post.sourceUrl) with the
   reader's stay appended as arrival/departure/adults/kids — the params nitecrawler's own /results
   search URLs use. The Philippine editor's pick has no nitecrawler listing, so it keeps Booking.com
   via app.js window.Kwarto.bookingUrl(). Depends on blog-posts.js (window.KWARTO_POSTS) and app.js. */
(function () {
  var POSTS = Array.isArray(window.KWARTO_POSTS) ? window.KWARTO_POSTS.slice() : [];
  var K = window.Kwarto || {};
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function esc(s) {
    if (K.escapeHtml) return K.escapeHtml(s);
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function parseYmd(s) {
    var p = String(s || "").split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function prettyDate(s) {
    var d = parseYmd(s);
    if (isNaN(d.getTime())) return "";
    return MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }

  function shortDate(s) {
    var d = parseYmd(s);
    if (isNaN(d.getTime())) return "";
    return MONTHS[d.getMonth()] + " " + d.getDate();
  }

  function catSlug(cat) {
    return String(cat || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  function wordCount(post) {
    var n = 0;
    (post.body || []).forEach(function (b) {
      if (b.text) n += String(b.text).split(/\s+/).length;
      if (b.items) b.items.forEach(function (t) { n += String(t).split(/\s+/).length; });
      if (b.rows) b.rows.forEach(function (r) { n += String(r[1] || "").split(/\s+/).length; });
    });
    return n;
  }

  function readTime(post) {
    return Math.max(2, Math.round(wordCount(post) / 200)) + " min read";
  }

  function priceLabel(post) {
    if (!post.priceFrom) return "";
    var cur = K.currency ? K.currency() : "PHP";
    var rate = K.RATE || 57;
    var shown = cur === "USD"
      ? "$" + Number(post.priceFrom).toLocaleString("en-US")
      : "\u20b1" + Math.round(Number(post.priceFrom) * rate).toLocaleString("en-PH");
    // app.js re-renders every [data-usd] when the header currency toggle flips.
    return '<span class="blog-price">from <b data-usd="' + Number(post.priceFrom) + '">' + shown + '</b></span>';
  }

  function postHref(post) {
    return "/blog/" + encodeURIComponent(post.slug);
  }

  function bookHref(hotel, city) {
    if (K.bookingUrl) return K.bookingUrl(hotel, city);
    var u = new URL("https://www.booking.com/searchresults.html");
    u.searchParams.set("ss", [hotel, city].filter(Boolean).join(" "));
    return u.toString();
  }

  /* nitecrawler listing + the reader's stay. Param names match nitecrawler's /results URLs
     (?adults=2&arrival=YYYY-MM-DD&departure=YYYY-MM-DD&kids=0). Falls back to the bare listing URL. */
  function nitecrawlerHref(sourceUrl) {
    try {
      var u = new URL(sourceUrl);
      var s = K.stayDates ? K.stayDates() : null;
      if (s && s.checkIn && s.checkOut) {
        u.searchParams.set("arrival", s.checkIn);
        u.searchParams.set("departure", s.checkOut);
        u.searchParams.set("adults", String(Number(s.guests) || 2));
        u.searchParams.set("kids", String(Number(s.children) || 0));
      }
      return u.toString();
    } catch (e) {
      return sourceUrl;
    }
  }

  /* Sourced posts go to nitecrawler unless the block names a different hotel/area (then Booking.com). */
  function ctaTarget(block, post) {
    if (post.sourceUrl && !(block && block.hotel)) {
      return { partner: "nitecrawler", label: "nitecrawler.com", href: nitecrawlerHref(post.sourceUrl), source: post.sourceUrl };
    }
    var hotel = (block && block.hotel) || post.hotelName || post.city;
    var city = (block && block.city) || post.city;
    return { partner: "booking", label: "Booking.com", href: bookHref(hotel, city), hotel: hotel, city: city };
  }

  function ctaAttrs(t) {
    return t.partner === "nitecrawler"
      ? ' data-book-source="' + esc(t.source) + '"'
      : ' data-book-hotel="' + esc(t.hotel) + '" data-book-city="' + esc(t.city) + '"';
  }

  function sorted() {
    return POSTS.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
  }

  function sourceHost(url) {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch (e) { return ""; }
  }

  /* "Spotted on nitecrawler.com" for sourced posts; the Philippine editor's pick says so instead. */
  function sourceHtml(post) {
    if (post.sourceUrl) {
      return '<span class="blog-source-k">Spotted on</span> <a href="' + esc(post.sourceUrl) + '" target="_blank" rel="noopener nofollow">' + esc(sourceHost(post.sourceUrl) || "the source") + '</a>';
    }
    if (post.editorsPick) {
      return '<span class="blog-source-k">Kwarto editor\u2019s pick</span> \u00b7 not listed on nitecrawler.com yet';
    }
    return "";
  }

  function locLabel(post) {
    return post.location + (post.country && post.location.indexOf(post.country) === -1 ? ", " + post.country : "");
  }

  function cardHtml(post, opts) {
    var big = opts && opts.featured;
    var img = big ? post.heroImage.replace(/w=\d+/, "w=1400") : post.heroImage.replace(/w=\d+/, "w=800");
    return '<a class="blog-card' + (big ? " blog-card-featured" : "") + '" href="' + postHref(post) + '" data-cat="' + esc(catSlug(post.category)) + '">' +
      '<div class="blog-card-media"><img src="' + esc(img) + '" alt="' + esc(post.heroAlt || "") + '" loading="' + (big ? "eager" : "lazy") + '" decoding="async" />' +
      '<span class="blog-chip blog-chip-' + esc(catSlug(post.category)) + '">' + esc(post.category) + '</span></div>' +
      '<div class="blog-card-body">' +
      '<p class="blog-card-loc">' + (post.editorsPick ? '<span class="blog-pick">Editor\u2019s pick</span> \u00b7 ' : "") + esc(locLabel(post)) + '</p>' +
      '<h3>' + esc(post.title) + '</h3>' +
      '<p class="blog-card-dek">' + esc(post.dek) + '</p>' +
      '<div class="blog-card-foot"><time datetime="' + esc(post.date) + '">' + esc(big ? prettyDate(post.date) : shortDate(post.date)) + '</time>' +
      '<span class="blog-card-read">' + esc(readTime(post)) + '</span>' + priceLabel(post) + '</div>' +
      '</div></a>';
  }

  function ctaHtml(block, post) {
    var t = ctaTarget(block, post);
    return '<div class="blog-cta">' +
      '<a class="btn btn-red blog-book" href="' + esc(t.href) + '" target="_blank" rel="noopener"' + ctaAttrs(t) + '>' + esc(block.label || ("See rates on " + (t.partner === "nitecrawler" ? "nitecrawler" : "Booking.com"))) + '</a>' +
      (block.note ? '<p class="blog-cta-note">' + esc(block.note) + '</p>' : "") +
      '</div>';
  }

  function blockHtml(block, post) {
    switch (block.type) {
      case "h2": return "<h2>" + esc(block.text) + "</h2>";
      case "p": return "<p>" + esc(block.text) + "</p>";
      case "ul": return "<ul>" + (block.items || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
      case "img":
        return '<figure class="blog-figure"><img src="' + esc(block.src) + '" alt="' + esc(block.alt || "") + '" loading="lazy" decoding="async" />' +
          (block.caption ? "<figcaption>" + esc(block.caption) + "</figcaption>" : "") + "</figure>";
      case "deal":
        return '<div class="blog-deal"><p class="blog-deal-h">' + esc(block.title || "The deal") + "</p><dl>" +
          (block.rows || []).map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") +
          "</dl></div>";
      case "cta": return ctaHtml(block, post);
      default: return "";
    }
  }

  function refreshBookLinks() {
    document.querySelectorAll("[data-book-source]").forEach(function (a) {
      a.href = nitecrawlerHref(a.getAttribute("data-book-source"));
    });
    document.querySelectorAll("[data-book-hotel]").forEach(function (a) {
      a.href = bookHref(a.getAttribute("data-book-hotel"), a.getAttribute("data-book-city"));
    });
    var stayEl = document.querySelector("[data-book-stay]");
    if (stayEl && K.stayDates) {
      var s = K.stayDates();
      var guests = Number(s.guests || 2) + Number(s.children || 0);
      stayEl.textContent = shortDate(s.checkIn) + " \u2013 " + shortDate(s.checkOut) + " \u00b7 " + guests + (guests === 1 ? " guest" : " guests");
    }
  }

  function bindStayRefresh() {
    ["checkin", "checkout", "guests", "children", "childages"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("change", refreshBookLinks);
      el.addEventListener("input", refreshBookLinks);
    });
  }

  /* ---------- Listing ---------- */
  function renderListing() {
    var grid = document.querySelector("[data-blog-grid]");
    if (!grid) return;
    var featuredHost = document.querySelector("[data-blog-featured]");
    var chips = document.querySelectorAll("[data-blog-filter]");
    var countEl = document.querySelector("[data-blog-count]");
    var all = sorted();
    var featured = all.filter(function (p) { return p.featured; })[0] || all[0];

    function paint(cat) {
      var list = cat === "all" ? all : all.filter(function (p) { return catSlug(p.category) === cat; });
      var showFeatured = cat === "all" && featured;
      if (featuredHost) {
        featuredHost.innerHTML = showFeatured ? cardHtml(featured, { featured: true }) : "";
        featuredHost.hidden = !showFeatured;
      }
      var rest = showFeatured ? list.filter(function (p) { return p.slug !== featured.slug; }) : list;
      grid.innerHTML = rest.length
        ? rest.map(function (p) { return cardHtml(p); }).join("")
        : '<p class="blog-empty">Nothing in this category yet. Check back soon.</p>';
      if (countEl) countEl.textContent = list.length + (list.length === 1 ? " post" : " posts");
      chips.forEach(function (c) {
        var on = (c.getAttribute("data-blog-filter") || "all") === cat;
        c.classList.toggle("is-on", on);
        c.setAttribute("aria-pressed", on ? "true" : "false");
      });
      try {
        var u = new URL(location.href);
        if (cat === "all") u.searchParams.delete("cat"); else u.searchParams.set("cat", cat);
        history.replaceState(null, "", u.pathname + u.search + u.hash);
      } catch (e) {}
    }

    chips.forEach(function (c) {
      c.addEventListener("click", function () { paint(c.getAttribute("data-blog-filter") || "all"); });
    });
    var start = new URLSearchParams(location.search).get("cat") || "all";
    var known = Array.prototype.some.call(chips, function (c) { return c.getAttribute("data-blog-filter") === start; });
    paint(known ? start : "all");
  }

  /* ---------- Homepage row ---------- */
  function renderLatest() {
    var host = document.querySelector("[data-blog-latest]");
    if (!host) return;
    host.innerHTML = sorted().slice(0, 3).map(function (p) { return cardHtml(p); }).join("");
  }

  /* ---------- Article ---------- */
  function slugFromUrl() {
    var q = new URLSearchParams(location.search).get("post");
    if (q) return decodeURIComponent(q).trim();
    var m = String(location.pathname || "").match(/^\/blog\/([^/?#]+)/i);
    return m ? decodeURIComponent(m[1]).trim() : "";
  }

  function setMeta(name, content) {
    var el = document.querySelector('meta[name="' + name + '"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function relatedFor(post) {
    var all = sorted().filter(function (p) { return p.slug !== post.slug; });
    var same = all.filter(function (p) { return p.country === post.country || p.category === post.category; });
    var out = [];
    same.concat(all).forEach(function (p) {
      if (out.length < 3 && out.indexOf(p) === -1) out.push(p);
    });
    return out;
  }

  function renderArticle() {
    var root = document.querySelector("[data-post-root]");
    if (!root) return;
    var slug = slugFromUrl();
    var post = POSTS.filter(function (p) { return p.slug === slug; })[0];
    var missing = document.querySelector("[data-post-missing]");
    if (!post) {
      root.hidden = true;
      var related = document.querySelector(".blog-related");
      if (related) related.hidden = true;
      if (missing) {
        missing.hidden = false;
        var list = missing.querySelector("[data-blog-missing-grid]");
        if (list) list.innerHTML = sorted().slice(0, 3).map(function (p) { return cardHtml(p); }).join("");
      }
      document.title = "Post not found \u2014 Kwarto Blog";
      return;
    }
    root.hidden = false;
    if (missing) missing.hidden = true;

    document.title = post.title + " \u2014 Kwarto Blog";
    setMeta("description", post.dek);

    var set = function (sel, fn) {
      document.querySelectorAll(sel).forEach(fn);
    };
    set("[data-post-title]", function (el) { el.textContent = post.title; });
    set("[data-post-dek]", function (el) { el.textContent = post.dek; });
    set("[data-post-cat]", function (el) {
      el.textContent = post.category;
      el.className = "blog-chip blog-chip-" + catSlug(post.category);
    });
    set("[data-post-cat-link]", function (el) {
      el.textContent = post.category;
      el.href = "/blog?cat=" + catSlug(post.category);
    });
    set("[data-post-location]", function (el) { el.textContent = locLabel(post); });
    set("[data-post-source]", function (el) {
      var html = sourceHtml(post);
      el.innerHTML = html;
      el.hidden = !html;
    });
    set("[data-post-date]", function (el) {
      el.textContent = prettyDate(post.date);
      el.setAttribute("datetime", post.date);
    });
    set("[data-post-author]", function (el) { el.textContent = post.author || "Kwarto Editors"; });
    set("[data-post-read]", function (el) { el.textContent = readTime(post); });
    set("[data-post-hero]", function (el) {
      el.src = post.heroImage;
      el.alt = post.heroAlt || "";
    });
    set("[data-post-body]", function (el) {
      el.innerHTML = (post.body || []).map(function (b) { return blockHtml(b, post); }).join("");
    });
    set("[data-book-title]", function (el) { el.textContent = post.hotelName || ("Hotels in " + post.city); });
    set("[data-book-place]", function (el) { el.textContent = locLabel(post); });
    set("[data-book-price]", function (el) {
      el.innerHTML = post.priceFrom ? priceLabel(post) + '<span class="blog-book-per"> / night, indicative</span>' : "";
      el.hidden = !post.priceFrom;
    });
    var primary = ctaTarget(null, post);
    set("[data-book-primary]", function (el) {
      el.removeAttribute("data-book-source");
      el.removeAttribute("data-book-hotel");
      el.removeAttribute("data-book-city");
      if (primary.partner === "nitecrawler") {
        el.setAttribute("data-book-source", primary.source);
        el.textContent = "See rates on nitecrawler";
      } else {
        el.setAttribute("data-book-hotel", primary.hotel);
        el.setAttribute("data-book-city", primary.city);
        el.textContent = post.hotelName ? "See rates on Booking.com" : "See hotels on Booking.com";
      }
      el.href = primary.href;
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
    set("[data-book-partner]", function (el) { el.textContent = primary.label; });
    set("[data-book-partner-note]", function (el) {
      el.textContent = primary.partner === "nitecrawler"
        ? "This is the listing we spotted. Your dates carry over."
        : "Our editor\u2019s pick isn\u2019t on nitecrawler yet, so this one opens Booking.com with your dates.";
    });
    set("[data-book-city-link]", function (el) {
      var slugCity = post.citySlug || String(post.city || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
      el.href = "/" + slugCity;
      el.textContent = "All " + post.city + " hotels on Kwarto";
    });
    set("[data-post-related]", function (el) {
      el.innerHTML = relatedFor(post).map(function (p) { return cardHtml(p); }).join("");
    });
    refreshBookLinks();
  }

  renderListing();
  renderLatest();
  renderArticle();
  bindStayRefresh();
  refreshBookLinks();
})();
