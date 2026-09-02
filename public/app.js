(function () {
  const CID = "0";
  const RATE = 57;
  const DEST = [
    { keys: ["cebu city"], kind: "local", slug: "cebu", cityId: 4001, areaId: 26695, label: "Cebu City" },
    { keys: ["mactan"], kind: "local", slug: "cebu", cityId: 4001, areaId: 493921, label: "Mactan Island" },
    { keys: ["cebu"], kind: "local", slug: "cebu", cityId: 4001, label: "Cebu, Philippines" },
    { keys: ["manila"], kind: "city", slug: "manila", cityId: 1622, label: "Manila, Philippines" },
    { keys: ["boracay"], kind: "city", slug: "boracay", cityId: 15903, label: "Boracay, Philippines" },
    { keys: ["siargao"], kind: "city", slug: "siargao", cityId: 18041, label: "Siargao, Philippines" },
    { keys: ["bohol"], kind: "city", slug: "bohol", cityId: 16429, label: "Bohol, Philippines" },
    { keys: ["el nido"], kind: "city", slug: "el-nido", cityId: 16185, areaId: 539836, label: "El Nido, Palawan" },
    { keys: ["coron"], kind: "city", slug: "coron", cityId: 16185, areaId: 538237, label: "Coron, Palawan" },
    { keys: ["palawan"], kind: "city", slug: "palawan", cityId: 16185, label: "Palawan, Philippines" },
    { keys: ["bangkok"], kind: "city", slug: "bangkok", cityId: 9395, label: "Bangkok, Thailand" },
    { keys: ["tokyo"], kind: "city", slug: "tokyo", cityId: 5085, label: "Tokyo, Japan" },
    { keys: ["singapore"], kind: "city", slug: "singapore", cityId: 4064, label: "Singapore" },
    { keys: ["seoul"], kind: "city", slug: "seoul", cityId: 14690, label: "Seoul, South Korea" },
    { keys: ["hong kong"], kind: "city", slug: "hong-kong", cityId: 16808, label: "Hong Kong" },
    { keys: ["taipei"], kind: "city", slug: "taipei", cityId: 4951, label: "Taipei, Taiwan" },
    { keys: ["dubai"], kind: "city", slug: "dubai", cityId: 2994, label: "Dubai, UAE" },
    { keys: ["baguio"], kind: "city", slug: "baguio", cityId: 17196, label: "Baguio, Philippines" },
    { keys: ["davao"], kind: "city", slug: "davao", cityId: 9360, label: "Davao, Philippines" },
    { keys: ["iloilo"], kind: "city", slug: "iloilo", cityId: 2085, label: "Iloilo, Philippines" },
    { keys: ["dumaguete"], kind: "city", slug: "dumaguete", cityId: 18871, label: "Dumaguete, Philippines" },
    { keys: ["camiguin"], kind: "city", slug: "camiguin", cityId: 105961, label: "Camiguin, Philippines" },
    { keys: ["batanes"], kind: "city", slug: "batanes", cityId: 690284, label: "Batanes, Philippines" },
    { keys: ["tagaytay"], kind: "city", slug: "tagaytay", cityId: 18218, label: "Tagaytay, Philippines" },
    { keys: ["clark"], kind: "city", slug: "clark", cityId: 18875, label: "Clark, Philippines" },
    { keys: ["puerto galera"], kind: "city", slug: "puerto-galera", cityId: 18874, label: "Puerto Galera, Philippines" },
    { keys: ["bacolod"], kind: "city", slug: "bacolod", cityId: 10562, label: "Bacolod, Philippines" },
    { keys: ["cagayan de oro", "cdo"], kind: "city", slug: "cagayan-de-oro", cityId: 18869, label: "Cagayan de Oro, Philippines" },
    { keys: ["subic"], kind: "city", slug: "subic", cityId: 18217, label: "Subic, Philippines" },
    { keys: ["vigan"], kind: "city", slug: "vigan", cityId: 390245, areaId: 378699, label: "Vigan, Philippines" },
    { keys: ["legazpi"], kind: "city", slug: "legazpi", cityId: 23740, label: "Legazpi, Philippines" }
  ];
  const RESERVED_SLUGS = {
    hotel: 1, results: 1, api: 1, index: 1, search: 1, how: 1, destinations: 1
  };

  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const on = btn.classList.toggle("is-on");
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  });

  const main = document.querySelector("[data-gallery-main]");
  document.querySelectorAll("[data-gallery-thumb]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src");
      if (!main || !src) return;
      main.src = src;
      document.querySelectorAll("[data-gallery-thumb]").forEach((b) => b.classList.remove("is-on"));
      btn.classList.add("is-on");
    });
  });

  const params = new URLSearchParams(location.search);
  const city = params.get("hotel") || params.get("city");
  const head = document.querySelector(".page-head h1");
  if (city && head) {
    const short = String(city).split(",")[0].trim() || city;
    head.textContent = short;
    document.title = short + " hotels — Kwarto";
  }

  const currency = () => document.documentElement.dataset.cur || "PHP";

  const setCur = (cur) => {
    document.documentElement.dataset.cur = cur;
    try { localStorage.setItem("tuloy-cur", cur); } catch (e) {}
    document.querySelectorAll("[data-cur]").forEach((b) => {
      b.classList.toggle("is-on", b.getAttribute("data-cur") === cur);
    });
    document.querySelectorAll("[data-usd]").forEach((el) => {
      const usd = Number(el.getAttribute("data-usd"));
      if (!usd) return;
      el.textContent = cur === "USD"
        ? "$" + usd.toLocaleString("en-US")
        : "₱" + Math.round(usd * RATE).toLocaleString("en-PH");
    });
    document.querySelectorAll("[data-agoda]").forEach((a) => {
      try {
        const u = new URL(a.href);
        u.searchParams.set("currency", cur);
        a.href = u.toString();
      } catch (e) {}
    });
  };
  document.querySelectorAll(".nc-fx [data-cur]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setCur(btn.getAttribute("data-cur"));
      document.dispatchEvent(new CustomEvent("kwarto:cur"));
    });
  });

  // Homepage city rail arrows (NiteCrawler "Don't Skip These Trips" carousel).
  const rail = document.querySelector("#destinations .dest-grid");
  if (rail) {
    const step = () => Math.max(240, Math.round(rail.clientWidth * 0.8));
    document.querySelectorAll("[data-rail-prev]").forEach((b) => b.addEventListener("click", () => rail.scrollBy({ left: -step(), behavior: "smooth" })));
    document.querySelectorAll("[data-rail-next]").forEach((b) => b.addEventListener("click", () => rail.scrollBy({ left: step(), behavior: "smooth" })));
  }

  // Results sidebar: collapse on phones.
  document.querySelectorAll("[data-side-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const side = btn.closest("[data-hotel-side]");
      if (!side) return;
      const open = side.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  let startCur = "PHP";
  try { startCur = localStorage.getItem("tuloy-cur") || "PHP"; } catch (e) {}
  setCur(startCur);

  function destOk(d) {
    return !!(d && (d.cityId || d.areaId || d.hotelId));
  }

  function asSuggest(d) {
    return {
      label: d.label,
      kind: d.hotelId ? "hotel" : d.areaId ? "area" : "city",
      cityId: d.cityId,
      areaId: d.areaId,
      hotelId: d.hotelId
    };
  }

  function localSuggest(raw) {
    const q = (raw || "").trim().toLowerCase();
    if (!q) return [];
    const out = [];
    const seen = new Set();
    for (const d of DEST) {
      const hit = d.keys.some((k) => k.indexOf(q) !== -1 || q.indexOf(k) !== -1) ||
        (d.label && d.label.toLowerCase().indexOf(q) !== -1);
      if (!hit) continue;
      const key = d.hotelId ? "h" + d.hotelId : d.areaId ? "a" + d.areaId : "c" + d.cityId + d.label;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(asSuggest(d));
      if (out.length >= 8) break;
    }
    return out;
  }

  function resolveDest(raw) {
    const q = (raw || "").trim().toLowerCase();
    if (!q) return null;
    for (const d of DEST) {
      if (d.keys.some((k) => q.includes(k))) return d;
    }
    return { kind: "text", text: raw.trim() };
  }

  function stayDates() {
    const form = document.querySelector("form.search");
    const checkIn = (form && form.checkin && form.checkin.value) || params.get("checkin") || "2026-09-12";
    const checkOut = (form && form.checkout && form.checkout.value) || params.get("checkout") || "2026-09-15";
    const guests = (form && form.guests && form.guests.value) || params.get("guests") || "2";
    const children = (form && form.children && form.children.value) || params.get("children") || "0";
    const childages = (form && form.childages && form.childages.value) || params.get("childages") || "";
    return { checkIn, checkOut, guests, children, childages };
  }

  const BOOKING_AFFILIATE_ID = "";

  function bookingUrl(query, city) {
    const { checkIn, checkOut, guests } = stayDates();
    const u = new URL("https://www.booking.com/searchresults.html");
    let searchQuery = query || "";
    if (city && searchQuery.toLowerCase().indexOf(city.toLowerCase()) === -1) {
      searchQuery = searchQuery + " " + city;
    }
    if (searchQuery) u.searchParams.set("ss", searchQuery.trim());
    if (checkIn) u.searchParams.set("checkin", checkIn);
    if (checkOut) u.searchParams.set("checkout", checkOut);
    u.searchParams.set("group_adults", String(guests || 2));
    u.searchParams.set("no_rooms", "1");
    if (BOOKING_AFFILIATE_ID) u.searchParams.set("aid", BOOKING_AFFILIATE_ID);
    return u.toString();
  }

  function destQuery(dest, typed) {
    if (dest && dest.label) return dest.label;
    if (dest && dest.text) return dest.text;
    return (typed || "").trim();
  }

  function slugify(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function isCebuLocal(dest, typed) {
    if (dest && dest.kind === "local") return true;
    if (dest && Number(dest.cityId) === 4001) return true;
    const q = String((dest && (dest.label || dest.text)) || typed || "").toLowerCase();
    if (!q) return false;
    return q.indexOf("cebu") !== -1 || q.indexOf("mactan") !== -1;
  }

  function destSlug(dest, typed) {
    if (dest && dest.slug) return dest.slug;
    if (isCebuLocal(dest, typed)) return "cebu";
    if (dest && dest.cityName) return slugify(String(dest.cityName).split(",")[0]);
    if (dest && dest.hotelId && dest.label && dest.label.indexOf(",") !== -1) {
      return slugify(dest.label.split(",").pop().trim());
    }
    const label = destQuery(dest, typed);
    return slugify(String(label || "").split(",")[0].trim());
  }

  function fetchSuggest(typed, signal) {
    const url = "/api/dest?q=" + encodeURIComponent(typed);
    return fetch(url, signal ? { signal: signal } : undefined)
      .then((r) => r.json())
      .then((j) => {
        const list = Array.isArray(j && j.suggestions) ? j.suggestions.filter(destOk) : [];
        const dest = destOk(j && j.dest) ? j.dest : null;
        const hotels = Array.isArray(j && j.hotels) ? j.hotels.filter(destOk) : [];
        return { dest: dest, suggestions: list, hotels: hotels };
      });
  }

  function resolveTyped(typed) {
    const local = resolveDest(typed);
    const localOk = destOk(local) ? local : null;
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const t = setTimeout(() => { if (ctrl) ctrl.abort(); }, 4000);
    return fetchSuggest(typed, ctrl && ctrl.signal)
      .then((j) => {
        clearTimeout(t);
        if (j.dest) return j.dest;
        if (j.suggestions && j.suggestions[0]) return j.suggestions[0];
        return localOk;
      })
      .catch(() => {
        clearTimeout(t);
        return localOk;
      });
  }

  const searchForm = document.querySelector("form.search");
  const cityInput = searchForm && searchForm.city;
  const whereField = document.querySelector(".search-where");
  let typeahead = document.getElementById("typeahead");
  if (whereField && cityInput && !typeahead) {
    typeahead = document.createElement("div");
    typeahead.id = "typeahead";
    typeahead.className = "typeahead";
    typeahead.hidden = true;
    typeahead.setAttribute("role", "listbox");
    typeahead.setAttribute("aria-label", "Suggestions");
    whereField.appendChild(typeahead);
  }

  let picked = null;
  let suggestCtrl = null;
  let suggestSeq = 0;
  let visibleRows = [];

  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  function highlight(label, q) {
    const text = String(label || "");
    const needle = (q || "").trim();
    if (!needle) return escapeHtml(text);
    const i = text.toLowerCase().indexOf(needle.toLowerCase());
    if (i < 0) return escapeHtml(text);
    return escapeHtml(text.slice(0, i)) +
      "<b>" + escapeHtml(text.slice(i, i + needle.length)) + "</b>" +
      escapeHtml(text.slice(i + needle.length));
  }

  function closeTypeahead() {
    if (!typeahead) return;
    typeahead.hidden = true;
    typeahead.innerHTML = "";
    visibleRows = [];
    if (whereField) whereField.classList.remove("is-open");
    if (cityInput) cityInput.setAttribute("aria-expanded", "false");
  }

  function openTypeahead() {
    if (!typeahead) return;
    typeahead.hidden = false;
    if (whereField) whereField.classList.add("is-open");
    if (cityInput) cityInput.setAttribute("aria-expanded", "true");
  }

  function choose(row) {
    if (!destOk(row) || !cityInput) return;
    picked = {
      label: row.label,
      kind: row.kind,
      cityId: row.cityId,
      areaId: row.areaId,
      hotelId: row.hotelId
    };
    cityInput.value = row.label || "";
    closeTypeahead();
  }

  function renderTypeahead(rows, q, heading) {
    if (!typeahead) return;
    typeahead.innerHTML = "";
    visibleRows = rows && rows.length ? rows.slice() : [];
    if (!rows || !rows.length) {
      closeTypeahead();
      return;
    }
    if (heading) {
      const h = document.createElement("div");
      h.className = "typeahead-head";
      h.textContent = heading;
      typeahead.appendChild(h);
    }
    rows.forEach((row, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "typeahead-row";
      btn.setAttribute("role", "option");
      btn.setAttribute("data-i", String(i));
      btn.innerHTML = highlight(row.label, q);
      typeahead.appendChild(btn);
    });
    openTypeahead();
  }

  function requestSuggest(typed) {
    const q = (typed || "").trim();
    const seq = ++suggestSeq;
    if (suggestCtrl) {
      try { suggestCtrl.abort(); } catch (e) {}
      suggestCtrl = null;
    }
    if (!q) {
      closeTypeahead();
      return;
    }
    const local = localSuggest(q);
    if (local.length) renderTypeahead(local, q, "");
    if (q.length < 2) {
      if (!local.length) closeTypeahead();
      return;
    }
    suggestCtrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    fetchSuggest(q, suggestCtrl && suggestCtrl.signal)
      .then((j) => {
        if (seq !== suggestSeq) return;
        const now = cityInput ? (cityInput.value || "").trim() : q;
        if (now !== q) return;
        if (j.suggestions && j.suggestions.length) {
          renderTypeahead(j.suggestions, q, "");
          return;
        }
        if (local.length) renderTypeahead(local, q, "");
        else closeTypeahead();
      })
      .catch(() => {
        if (seq !== suggestSeq) return;
        const now = cityInput ? (cityInput.value || "").trim() : q;
        if (now !== q) return;
        if (local.length) renderTypeahead(local, q, "");
        else closeTypeahead();
      });
  }

  if (cityInput && typeahead) {
    cityInput.setAttribute("aria-autocomplete", "list");
    cityInput.setAttribute("aria-controls", "typeahead");
    cityInput.setAttribute("aria-expanded", "false");
    function rowFromEvent(e) {
      const btn = e.target && e.target.closest ? e.target.closest(".typeahead-row") : null;
      if (!btn || !typeahead.contains(btn)) return null;
      const i = Number(btn.getAttribute("data-i"));
      return visibleRows[i] || null;
    }
    function onRowHold(e) {
      if (!rowFromEvent(e)) return;
      e.preventDefault();
      e.stopPropagation();
    }
    function onRowActivate(e) {
      const row = rowFromEvent(e);
      if (!row) return;
      e.preventDefault();
      e.stopPropagation();
      choose(row);
    }
    typeahead.addEventListener("pointerdown", onRowHold);
    typeahead.addEventListener("mousedown", onRowHold);
    typeahead.addEventListener("touchstart", onRowHold, { passive: false });
    typeahead.addEventListener("click", onRowActivate);
    typeahead.addEventListener("touchend", onRowActivate, { passive: false });
    cityInput.addEventListener("focus", () => {
      requestSuggest(cityInput.value);
    });
    cityInput.addEventListener("input", () => {
      picked = null;
      requestSuggest(cityInput.value);
    });
    cityInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeTypeahead();
        return;
      }
      if (e.key === "Enter" && typeahead && !typeahead.hidden) {
        e.preventDefault();
        if (visibleRows[0]) choose(visibleRows[0]);
        else closeTypeahead();
        if (searchForm && picked && destOk(picked)) searchForm.requestSubmit();
      }
    });
    document.addEventListener("pointerdown", (e) => {
      if (!typeahead || typeahead.hidden) return;
      if (whereField && whereField.contains(e.target)) return;
      closeTypeahead();
    });
  }

  function destNow(typed) {
    const q = (typed || "").trim();
    if (!q) return null;
    if (picked && destOk(picked) && q.toLowerCase() === String(picked.label || "").toLowerCase()) {
      return picked;
    }
    const local = resolveDest(q);
    if (destOk(local)) return local;
    const rows = localSuggest(q);
    if (rows[0] && destOk(rows[0])) return rows[0];
    return null;
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const typed = ((searchForm.city && searchForm.city.value) || "").trim();
      if (!typed) {
        if (searchForm.city) searchForm.city.focus();
        return;
      }
      const ready = destNow(typed) || resolveDest(typed);
      location.href = cityPageHref(ready, typed);
    });
  }

  function destCardQuery(a) {
    const city = (a.getAttribute("data-city") || "").trim();
    if (city) return city;
    const h3 = a.querySelector("h3");
    if (!h3) return "";
    return String(h3.textContent || "").replace(/^Hotels in\s+/i, "").trim();
  }

  function destCardSlug(a) {
    const fromCity = slugify(destCardQuery(a));
    if (fromCity) return fromCity;
    const href = a.getAttribute("href") || "";
    const m = href.match(/^\/?([a-z0-9-]+)(?:\.html)?(?:[?#]|$)/i);
    if (m && !RESERVED_SLUGS[m[1].toLowerCase()]) return m[1].toLowerCase();
    return "";
  }

  function bindDestCards() {
    document.querySelectorAll("a.dest-card").forEach((a) => {
      const label = destCardQuery(a);
      const slug = destCardSlug(a);
      if (!label && !slug) return;
      const dest = resolveDest(label) || { slug: slug, label: label };
      if (dest && !dest.slug && slug) dest.slug = slug;
      a.href = cityPageHref(dest, label);
      a.removeAttribute("target");
      a.removeAttribute("rel");
    });
  }

  bindDestCards();

  function stayQuery(u) {
    const { checkIn, checkOut, guests, children, childages } = stayDates();
    u.searchParams.set("checkin", checkIn);
    u.searchParams.set("checkout", checkOut);
    u.searchParams.set("guests", String(guests));
    if (Number(children) > 0) {
      u.searchParams.set("children", String(children));
      if (childages) u.searchParams.set("childages", childages);
    }
    return u.search;
  }

  function cityPageHref(dest, typed) {
    const slug = destSlug(dest, typed);
    const path = slug && !RESERVED_SLUGS[slug] ? "/" + slug : "/results";
    const u = new URL(path, location.origin);
    const label = destQuery(dest, typed);
    if (label) u.searchParams.set("city", label);
    if (dest && dest.hotelId && dest.label) u.searchParams.set("hotel", dest.label);
    return path + stayQuery(u);
  }

  function cebuListHref() {
    return cityPageHref({ kind: "local", slug: "cebu", cityId: 4001, label: "Cebu, Philippines" }, "Cebu");
  }

  function bindCebuCard() {
    bindDestCards();
  }
  bindCebuCard();

  function hotelCardName(card) {
    if (!card) return "";
    const fromData = (card.getAttribute("data-hotel-name") || "").trim();
    if (fromData) return fromData;
    const h3 = card.querySelector("h3");
    return h3 ? String(h3.textContent || "").trim() : "";
  }

  function bindGalleries() {
    document.querySelectorAll(".hotel-card-gallery").forEach((gallery) => {
      if (gallery.getAttribute("data-bound-gallery") === "1") return;
      gallery.setAttribute("data-bound-gallery", "1");
      
      const track = gallery.querySelector(".gallery-track");
      const hotelId = gallery.getAttribute("data-hotel-id");
      let photos = [];
      let currentIndex = 0;
      let photosLoaded = false;
      
      function goToSlide(index) {
        if (photos.length <= 1) return;
        if (index < 0) index = photos.length - 1;
        if (index >= photos.length) index = 0;
        currentIndex = index;
        if (track) track.style.transform = "translateX(-" + (currentIndex * 100) + "%)";
        gallery.querySelectorAll(".gallery-dot").forEach((d, i) => d.classList.toggle("active", i === currentIndex));
      }
      
      function loadPhotos() {
        if (photosLoaded || !hotelId) return;
        photosLoaded = true;
        gallery.setAttribute("data-photos-loaded", "loading");
        
        fetch("/api/hotels/photos?hotelId=" + hotelId)
          .then(r => r.json())
          .then(data => {
            if (data.photos && data.photos.length > 1) {
              photos = data.photos;
              
              // Rebuild track with all photos
              track.innerHTML = "";
              photos.forEach((photoUrl, idx) => {
                const slide = document.createElement("div");
                slide.className = "gallery-slide";
                const img = document.createElement("img");
                img.src = photoUrl;
                img.alt = "Photo " + (idx + 1);
                img.loading = idx === 0 ? "eager" : "lazy";
                img.decoding = "async";
                slide.appendChild(img);
                track.appendChild(slide);
              });
              
              // Add dots
              const dots = document.createElement("div");
              dots.className = "gallery-dots";
              photos.forEach((_, idx) => {
                const dot = document.createElement("span");
                dot.className = "gallery-dot" + (idx === 0 ? " active" : "");
                dots.appendChild(dot);
              });
              gallery.appendChild(dots);
              
              // Add navigation
              const prevBtn = document.createElement("button");
              prevBtn.className = "gallery-nav gallery-prev";
              prevBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>';
              gallery.appendChild(prevBtn);
              
              const nextBtn = document.createElement("button");
              nextBtn.className = "gallery-nav gallery-next";
              nextBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>';
              gallery.appendChild(nextBtn);
              
              // Remove swipe hint
              const hint = gallery.querySelector(".gallery-swipe-hint");
              if (hint) hint.remove();
              
              prevBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(currentIndex - 1);
              });
              
              nextBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(currentIndex + 1);
              });
              
              gallery.setAttribute("data-photos-loaded", "true");
            } else {
              gallery.setAttribute("data-photos-loaded", "single");
              const hint = gallery.querySelector(".gallery-swipe-hint");
              if (hint) hint.remove();
            }
          })
          .catch(() => {
            gallery.setAttribute("data-photos-loaded", "error");
            const hint = gallery.querySelector(".gallery-swipe-hint");
            if (hint) hint.remove();
          });
      }
      
      // Touch swipe support - also triggers lazy load
      let touchStartX = 0;
      gallery.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
        loadPhotos();
      }, { passive: true });
      
      gallery.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50 && photos.length > 1) {
          goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
        }
      }, { passive: true });
      
      // Mouse hover also triggers lazy load
      gallery.addEventListener("mouseenter", loadPhotos);
    });
  }

  function bindHotelCards() {
    document.querySelectorAll(".hotel-list .dest-card, .hotel-list .hotel-card-v2").forEach((card) => {
      const name = hotelCardName(card);
      if (name && !card.getAttribute("data-hotel-name")) card.setAttribute("data-hotel-name", name);
      if (card.getAttribute("data-bound-hotel") === "1") return;
      card.setAttribute("data-bound-hotel", "1");
      card.setAttribute("title", "Search for " + name + " on Booking.com");
      card.addEventListener("click", (e) => {
        // Don't navigate if clicking gallery controls
        if (e.target.closest(".gallery-nav") || e.target.closest(".gallery-dot")) return;
        const hotelName = hotelCardName(card);
        if (!hotelName) return;
        e.preventDefault();
        window.open(bookingUrl(hotelName, hotelPlace), "_blank", "noopener");
      });
    });
    bindGalleries();
  }

  function bindContinue() {
    document.querySelectorAll("[data-continue]").forEach((el) => {
      if (el.getAttribute("data-bound-continue") === "1") return;
      el.setAttribute("data-bound-continue", "1");
      const q = (el.getAttribute("data-hotel-name") || el.getAttribute("data-city") || "Cebu").trim();
      const city = el.getAttribute("data-city") || hotelPlace || "Cebu";
      const url = bookingUrl(q, city);
      if (el.tagName === "A") {
        el.href = url;
        el.target = "_blank";
        el.rel = "noopener";
      } else {
        el.addEventListener("click", (ev) => {
          ev.preventDefault();
          window.open(url, "_blank", "noopener");
        });
      }
    });
  }

  function displayHotelName(row) {
    if (!row) return "";
    if (typeof row === "string") return row.trim();
    const name = String(row.name || row.label || "").trim();
    if (row.hotelId && name.indexOf(",") !== -1) {
      return name.split(",")[0].trim() || name;
    }
    return name;
  }

  function hotelsFrom(j) {
    const fromField = Array.isArray(j && j.hotels) ? j.hotels : [];
    const out = [];
    const seen = new Set();
    fromField.forEach((h) => {
      const name = displayHotelName(h);
      if (!name) return;
      const key = String((h && (h.id || h.hotelId)) || name).toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      
      const priceUSD = h && h.priceUSD ? Number(h.priceUSD) : null;
      if (!priceUSD) return;
      out.push({
        id: h && (h.id || h.hotelId) ? String(h.id || h.hotelId) : "",
        name: name,
        image: h && h.photo ? String(h.photo) : (h && h.image ? String(h.image) : ""),
        deepLink: h && h.deepLink ? String(h.deepLink) : "",
        provider: h && h.provider ? String(h.provider) : "",
        stars: h && h.stars ? Number(h.stars) : 0,
        rating: h && h.rating ? Number(h.rating) : null,
        reviewCount: h && h.reviewCount ? Number(h.reviewCount) : 0,
        priceUSD: priceUSD,
        district: h && h.district ? String(h.district) : "",
        city: h && h.city ? String(h.city) : "",
        hasFreeCancellation: !!(h && h.hasFreeCancellation),
        hasFreeParking: !!(h && h.hasFreeParking)
      });
    });
    return out;
  }

  const HOTEL_PAGE_SIZE = 12;
  let hotelNames = [];
  let hotelPlace = "";
  let hotelPage = 1;

  function renderHotelArticle(hotel) {
    const name = displayHotelName(hotel);
    const safe = escapeHtml(name);
    const hotelId = hotel && hotel.id ? hotel.id : "";
    
    // Start with single photo - more photos loaded lazily on interaction
    const initialPhoto = (hotel && hotel.image) || "";
    
    // Build gallery HTML with single photo and swipe hint
    let galleryHtml = '<div class="hotel-card-gallery" data-hotel-id="' + hotelId + '" data-photos-loaded="false">';
    galleryHtml += '<div class="gallery-track">';
    if (initialPhoto) {
      galleryHtml += '<div class="gallery-slide"><img src="' + escapeHtml(initialPhoto) + '" alt="' + safe + '" loading="eager" decoding="async" /></div>';
    }
    galleryHtml += '</div>';
    galleryHtml += '<div class="gallery-swipe-hint"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></div>';
    galleryHtml += '</div>';
    
    let locationHtml = "";
    if (hotel && (hotel.district || hotel.city)) {
      locationHtml = '<p class="hotel-card-location">' + escapeHtml(hotel.district || hotel.city) + '</p>';
    } else if (hotelPlace) {
      locationHtml = '<p class="hotel-card-location">' + escapeHtml(hotelPlace) + '</p>';
    }
    
    let starsHtml = "";
    if (hotel && hotel.stars && hotel.stars > 0) {
      const starCount = Math.min(hotel.stars, 5);
      const filledStar = '<svg class="star-filled" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0.8l1.5 3.2 3.5.4-2.6 2.4.7 3.4L6 8.6 2.9 10.2l.7-3.4L1 4.4l3.5-.4z"/></svg>';
      const emptyStar = '<svg class="star-empty" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0.8l1.5 3.2 3.5.4-2.6 2.4.7 3.4L6 8.6 2.9 10.2l.7-3.4L1 4.4l3.5-.4z"/></svg>';
      let stars = "";
      for (let i = 0; i < 5; i++) {
        stars += i < starCount ? filledStar : emptyStar;
      }
      starsHtml = '<div class="hotel-card-stars">' + stars + '</div>';
    }
    
    let badgesHtml = "";
    const badges = [];
    if (hotel && hotel.hasFreeCancellation) {
      badges.push('<span class="hotel-badge badge-cancel">Free cancellation</span>');
    }
    if (hotel && hotel.hasFreeParking) {
      badges.push('<span class="hotel-badge badge-parking">Free parking</span>');
    }
    if (badges.length > 0) {
      badgesHtml = '<div class="hotel-card-badges">' + badges.join("") + '</div>';
    }
    
    let footerHtml = "";
    const footerParts = [];
    if (hotel && hotel.priceUSD) {
      const cur = currency();
      const priceText = cur === "USD"
        ? "$" + hotel.priceUSD.toLocaleString("en-US")
        : "₱" + Math.round(hotel.priceUSD * RATE).toLocaleString("en-PH");
      footerParts.push('<span class="hotel-card-price" data-usd="' + hotel.priceUSD + '">from ' + priceText + '</span>');
    }
    if (hotel && hotel.rating) {
      let ratingText = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0.8l1.5 3.2 3.5.4-2.6 2.4.7 3.4L6 8.6 2.9 10.2l.7-3.4L1 4.4l3.5-.4z"/></svg> ' + hotel.rating;
      if (hotel.reviewCount) {
        ratingText += ' <span class="review-count">(' + hotel.reviewCount.toLocaleString() + ')</span>';
      }
      footerParts.push('<span class="hotel-card-rating">' + ratingText + '</span>');
    }
    if (footerParts.length > 0) {
      footerHtml = '<div class="hotel-card-footer">' + footerParts.join("") + '</div>';
    }
    
    return '<a class="hotel-card-v2" href="' + escapeHtml(bookingUrl(name, hotelPlace)) + '" target="_blank" rel="noopener" data-hotel-name="' + safe + '" title="Search for ' + safe + ' on Booking.com">' +
      galleryHtml +
      '<div class="hotel-card-content">' +
      '<h3 class="hotel-card-name">' + safe + '</h3>' +
      locationHtml +
      starsHtml +
      badgesHtml +
      footerHtml +
      '<span class="hotel-card-cta">See Rates on Booking.com</span>' +
      '</div></a>';
  }

  // Sidebar sort + filters (results pages). Prices compare in the displayed currency.
  const hotelView = { sort: "recommended", min: null, max: null, cancel: false };

  function priceShown(usd) {
    if (!usd) return null;
    return currency() === "USD" ? usd : Math.round(usd * RATE);
  }

  function applyHotelView(list) {
    let out = list.slice();
    const priced = hotelView.min != null || hotelView.max != null;
    if (priced) {
      out = out.filter((h) => {
        const p = priceShown(h.priceUSD);
        if (p == null) return false;
        if (hotelView.min != null && p < hotelView.min) return false;
        if (hotelView.max != null && p > hotelView.max) return false;
        return true;
      });
    }
    if (hotelView.cancel) out = out.filter((h) => h.hasFreeCancellation);
    const num = (v) => (v == null || isNaN(v) ? null : Number(v));
    const desc = (get) => (a, b) => (num(get(b)) || 0) - (num(get(a)) || 0);
    if (hotelView.sort === "stars") out.sort(desc((h) => h.stars));
    else if (hotelView.sort === "rating") out.sort(desc((h) => h.rating));
    else if (hotelView.sort === "price-asc") {
      out.sort((a, b) => (num(a.priceUSD) == null ? Infinity : a.priceUSD) - (num(b.priceUSD) == null ? Infinity : b.priceUSD));
    } else if (hotelView.sort === "price-desc") out.sort(desc((h) => h.priceUSD));
    return out;
  }

  function hotelViewActive() {
    return hotelView.sort !== "recommended" || hotelView.min != null || hotelView.max != null || hotelView.cancel;
  }

  function renderFilterEmpty() {
    return '<div class="hotel-empty" data-city-empty>' +
      '<p class="hotel-list-status">No hotels match these filters. Loosen the price range or turn off free cancellation.</p>' +
      '<button type="button" class="cta" data-filter-clear>Clear All Filters</button>' +
      "</div>";
  }

  function bindHotelView() {
    document.querySelectorAll("[data-sort]").forEach((btn) => {
      if (btn.getAttribute("data-bound-sort") === "1") return;
      btn.setAttribute("data-bound-sort", "1");
      btn.addEventListener("click", () => {
        hotelView.sort = btn.getAttribute("data-sort") || "recommended";
        document.querySelectorAll("[data-sort]").forEach((b) => {
          const on = b === btn;
          b.classList.toggle("is-on", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        hotelPage = 1;
        paintHotelPage();
      });
    });
    let priceTimer = 0;
    const readPrice = (el) => {
      const v = parseFloat(el.value);
      return isNaN(v) || el.value === "" ? null : v;
    };
    document.querySelectorAll("[data-price-min], [data-price-max]").forEach((el) => {
      if (el.getAttribute("data-bound-price") === "1") return;
      el.setAttribute("data-bound-price", "1");
      el.addEventListener("input", () => {
        clearTimeout(priceTimer);
        priceTimer = setTimeout(() => {
          const minEl = document.querySelector("[data-price-min]");
          const maxEl = document.querySelector("[data-price-max]");
          hotelView.min = minEl ? readPrice(minEl) : null;
          hotelView.max = maxEl ? readPrice(maxEl) : null;
          hotelPage = 1;
          paintHotelPage();
        }, 250);
      });
    });
    document.querySelectorAll("[data-filter-cancel]").forEach((el) => {
      if (el.getAttribute("data-bound-cancel") === "1") return;
      el.setAttribute("data-bound-cancel", "1");
      el.addEventListener("change", () => {
        hotelView.cancel = !!el.checked;
        hotelPage = 1;
        paintHotelPage();
      });
    });
    document.querySelectorAll("[data-filter-clear]").forEach((el) => {
      if (el.getAttribute("data-bound-clear") === "1") return;
      el.setAttribute("data-bound-clear", "1");
      el.addEventListener("click", (e) => {
        e.preventDefault();
        hotelView.sort = "recommended";
        hotelView.min = null;
        hotelView.max = null;
        hotelView.cancel = false;
        document.querySelectorAll("[data-sort]").forEach((b) => {
          const on = b.getAttribute("data-sort") === "recommended";
          b.classList.toggle("is-on", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        document.querySelectorAll("[data-price-min], [data-price-max]").forEach((i) => { i.value = ""; });
        document.querySelectorAll("[data-filter-cancel]").forEach((i) => { i.checked = false; });
        hotelPage = 1;
        paintHotelPage();
      });
    });
    document.querySelectorAll("[data-price-cur]").forEach((el) => { el.textContent = currency(); });
  }
  document.addEventListener("kwarto:cur", () => {
    document.querySelectorAll("[data-price-cur]").forEach((el) => { el.textContent = currency(); });
    if (hotelNames.length && (hotelView.min != null || hotelView.max != null)) paintHotelPage();
  });

  function renderEmptyCity(place, hotelName) {
    const q = hotelName || place;
    const safeQ = escapeHtml(q);
    const { checkIn, checkOut } = stayDates();
    const dates = checkIn && checkOut ? " for " + checkIn + " to " + checkOut : "";
    let status;
    if (hotelName) {
      status = "You searched " + escapeHtml(hotelName) + ". Compare that stay on Booking.com.";
    } else if (lastHotelError === "City not found") {
      status = "Could not look up " + escapeHtml(place) + " on Booking.com. Try again in a moment, or compare on Booking.com.";
    } else if (lastHotelError === "Failed to fetch hotels" || lastHotelError === "network") {
      status = "Booking.com availability is unavailable right now. Try again in a moment, or compare on Booking.com.";
    } else {
      status = "No hotels available on Booking.com in " + escapeHtml(place) + dates + ". Try different dates, or compare on Booking.com.";
    }
    return '<div class="hotel-empty" data-city-empty>' +
      '<p class="hotel-list-status">' + status + "</p>" +
      '<a class="cta" data-continue data-hotel-name="' + safeQ + '" href="#">Continue on Booking.com</a>' +
      "</div>";
  }

  function uniqueHotelNames(names) {
    const unique = [];
    const seen = new Set();
    (names || []).forEach((n) => {
      const hotel = typeof n === "string" ? { name: n } : (n || {});
      const name = displayHotelName(hotel);
      const key = name.toLowerCase();
      if (!name || seen.has(key)) return;
      seen.add(key);
      unique.push(hotel);
    });
    return unique;
  }

  function pageFromUrl() {
    const n = Number(params.get("page"));
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
  }

  function setPageUrl(n) {
    try {
      const u = new URL(location.href);
      if (n <= 1) u.searchParams.delete("page");
      else u.searchParams.set("page", String(n));
      history.replaceState(null, "", u.pathname + u.search + u.hash);
    } catch (e) {}
  }

  function paintHotelPage() {
    const list = document.querySelector("[data-results-list]") || document.querySelector(".hotel-list");
    const countEl = document.querySelector("[data-hotel-count]");
    const pager = document.querySelector("[data-hotel-pager]");
    const prev = document.querySelector("[data-page-prev]");
    const next = document.querySelector("[data-page-next]");
    const status = document.querySelector("[data-page-status]");
    if (!list) return;
    bindHotelView();
    if (!hotelNames.length) {
      const pickedHotel = (params.get("hotel") || "").trim();
      list.innerHTML = renderEmptyCity(hotelPlace || "this city", pickedHotel.split(",")[0].trim());
      if (countEl) countEl.textContent = "Compare on Booking.com";
      if (pager) pager.hidden = true;
      bindContinue();
      return;
    }
    const unique = applyHotelView(hotelNames);
    if (!unique.length) {
      list.innerHTML = renderFilterEmpty();
      if (countEl) countEl.textContent = "0 of " + hotelNames.length + " hotels";
      if (pager) pager.hidden = true;
      bindHotelView();
      return;
    }
    const pages = Math.max(1, Math.ceil(unique.length / HOTEL_PAGE_SIZE));
    if (hotelPage > pages) hotelPage = pages;
    if (hotelPage < 1) hotelPage = 1;
    const start = (hotelPage - 1) * HOTEL_PAGE_SIZE;
    const slice = unique.slice(start, start + HOTEL_PAGE_SIZE);
    list.innerHTML = slice.map(renderHotelArticle).join("");
    if (countEl) {
      countEl.textContent = hotelViewActive() && unique.length !== hotelNames.length
        ? unique.length + " of " + hotelNames.length + " hotels"
        : unique.length + (unique.length === 1 ? " hotel" : " hotels");
    }
    if (pager) pager.hidden = unique.length <= HOTEL_PAGE_SIZE;
    if (status) {
      const from = start + 1;
      const to = start + slice.length;
      status.textContent = from + "–" + to + " of " + unique.length;
    }
    if (prev) prev.disabled = hotelPage <= 1;
    if (next) next.disabled = hotelPage >= pages;
    setPageUrl(hotelPage);
    bindHotelCards();
    bindContinue();
  }

  function paintHotelNames(names, resetPage) {
    hotelNames = uniqueHotelNames(names);
    hotelPage = resetPage ? 1 : pageFromUrl();
    paintHotelPage();
  }

  function bindHotelPager() {
    const prev = document.querySelector("[data-page-prev]");
    const next = document.querySelector("[data-page-next]");
    function go(delta) {
      const pages = Math.max(1, Math.ceil(hotelNames.length / HOTEL_PAGE_SIZE));
      const nextPage = hotelPage + delta;
      if (nextPage < 1 || nextPage > pages) return;
      hotelPage = nextPage;
      paintHotelPage();
      const list = document.querySelector("[data-results-list]");
      if (list) list.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (prev && prev.getAttribute("data-bound-pager") !== "1") {
      prev.setAttribute("data-bound-pager", "1");
      prev.addEventListener("click", () => go(-1));
    }
    if (next && next.getAttribute("data-bound-pager") !== "1") {
      next.setAttribute("data-bound-pager", "1");
      next.addEventListener("click", () => go(1));
    }
  }

  function localCityId(place) {
    const q = String(place || "").trim().toLowerCase();
    if (!q) return 0;
    for (const d of DEST) {
      if (d.keys.some((k) => q.indexOf(k) !== -1)) return d.cityId || 0;
    }
    return 0;
  }

  function isCebuPage() {
    return /cebu\.html?$/i.test(location.pathname) || /(^|\/)cebu\/?$/i.test(location.pathname);
  }

  function placeFromPath() {
    const path = String(location.pathname || "").replace(/\/+$/, "");
    const slug = path.replace(/^\//, "").replace(/\.html$/i, "").toLowerCase();
    if (!slug || slug === "results" || slug === "index") return "";
    for (const d of DEST) {
      if (d.slug === slug || d.keys.some((k) => slugify(k) === slug)) return d.label;
    }
    return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }

  // Pull the first few Booking.com pages so the sidebar has a real pool to
  // sort, filter, and paginate locally (each API page is ~20–30 hotels).
  const HOTEL_FETCH_PAGES = 2;
  let lastHotelError = "";

  function fetchHotels(place) {
    const { checkIn, checkOut, guests, children, childages } = stayDates();
    let base = "/api/hotels?city=" + encodeURIComponent(place);
    if (checkIn) base += "&checkIn=" + encodeURIComponent(checkIn);
    if (checkOut) base += "&checkOut=" + encodeURIComponent(checkOut);
    if (guests) base += "&guests=" + encodeURIComponent(guests);
    if (Number(children) > 0) {
      base += "&children=" + encodeURIComponent(children);
      if (childages) base += "&childages=" + encodeURIComponent(childages);
    }
    const pages = [];
    for (let p = 0; p < HOTEL_FETCH_PAGES; p++) {
      pages.push(
        fetch(base + "&page=" + p)
          .then((r) => r.json())
          .then((j) => ({ hotels: hotelsFrom(j), error: j && j.error ? String(j.error) : "" }))
          .catch(() => ({ hotels: [], error: "network" }))
      );
    }
    return Promise.all(pages).then((packs) => {
      const seen = new Set();
      const out = [];
      let error = "";
      packs.forEach((pack) => {
        if (pack.error && !error) error = pack.error;
        (pack.hotels || []).forEach((h) => {
          const key = (h.id || h.name).toLowerCase();
          if (seen.has(key)) return;
          seen.add(key);
          out.push(h);
        });
      });
      return { hotels: out, error: error };
    });
  }

  function syncStayUrl() {
    try {
      const u = new URL(location.href);
      const { checkIn, checkOut, guests, children, childages } = stayDates();
      if (checkIn) u.searchParams.set("checkin", checkIn);
      if (checkOut) u.searchParams.set("checkout", checkOut);
      if (guests) u.searchParams.set("guests", String(guests));
      if (Number(children) > 0) {
        u.searchParams.set("children", String(children));
        if (childages) u.searchParams.set("childages", childages);
      } else {
        u.searchParams.delete("children");
        u.searchParams.delete("childages");
      }
      history.replaceState(null, "", u.pathname + u.search + u.hash);
    } catch (e) {}
  }

  function fillResults(opts) {
    const list = document.querySelector("[data-results-list]");
    if (!list) return;
    bindHotelPager();
    syncStayUrl();
    const place = (params.get("city") || placeFromPath() || (isCebuPage() ? "Cebu, Philippines" : "")).trim();
    const short = place.split(",")[0].trim() || place || "Hotels";
    hotelPlace = short;
    const crumb = document.querySelector("[data-results-place]");
    const heading = document.querySelector("[data-results-heading]");
    if (crumb) crumb.textContent = short;
    if (heading) heading.textContent = "Hotels in " + short;
    if (head) {
      head.textContent = short;
      document.title = short + " hotels — Kwarto";
    }
    if (place && searchForm && searchForm.city && !searchForm.city.value) {
      searchForm.city.value = place;
    }
    const pickedHotel = (params.get("hotel") || "").trim();
    if (!place && !pickedHotel) {
      paintHotelNames([]);
      return;
    }
    list.innerHTML = '<p class="hotel-list-status">Finding hotels available for your dates…</p>';
    fetchHotels(place || short)
      .then((result) => {
        lastHotelError = result && result.error ? result.error : "";
        paintHotelNames(result && result.hotels ? result.hotels : [], !!(opts && opts.resetPage));
      })
      .catch(() => {
        lastHotelError = "network";
        paintHotelNames([], true);
      });
  }

  let hotelRefreshTimer = 0;
  function scheduleHotelRefresh() {
    const list = document.querySelector("[data-results-list]");
    if (!list) return;
    const { checkIn, checkOut } = stayDates();
    if (!checkIn || !checkOut) return;
    clearTimeout(hotelRefreshTimer);
    hotelRefreshTimer = setTimeout(() => fillResults({ resetPage: true }), 80);
  }

  bindHotelCards();
  bindContinue();
  fillResults();
  ["checkin", "checkout", "guests", "children", "childages"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("change", bindHotelCards);
    el.addEventListener("input", bindHotelCards);
    el.addEventListener("change", bindCebuCard);
    el.addEventListener("input", bindCebuCard);
    el.addEventListener("change", bindDestCards);
    el.addEventListener("input", bindDestCards);
    el.addEventListener("change", scheduleHotelRefresh);
  });
  document.addEventListener("pointerdown", (e) => {
    const card = e.target && e.target.closest ? e.target.closest("a.dest-card") : null;
    if (card && card.closest && !card.closest(".hotel-list")) {
      const label = destCardQuery(card);
      const slug = destCardSlug(card);
      if (label || slug) {
        const dest = resolveDest(label) || { slug: slug, label: label };
        if (dest && !dest.slug && slug) dest.slug = slug;
        card.href = cityPageHref(dest, label);
        card.removeAttribute("target");
        card.removeAttribute("rel");
      }
    }
  }, true);
})();
