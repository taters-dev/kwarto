(function () {
  const CID = "0";
  const RATE = 57;
  const DEST = [
    { keys: ["cebu city"], kind: "local", cityId: 4001, areaId: 26695, label: "Cebu City" },
    { keys: ["mactan"], kind: "local", cityId: 4001, areaId: 493921, label: "Mactan Island" },
    { keys: ["cebu"], kind: "local", cityId: 4001, label: "Cebu, Philippines" },
    { keys: ["manila"], kind: "agoda", cityId: 1622, label: "Manila, Philippines" },
    { keys: ["boracay"], kind: "agoda", cityId: 15903, label: "Boracay, Philippines" },
    { keys: ["siargao"], kind: "agoda", cityId: 18041, label: "Siargao, Philippines" },
    { keys: ["bohol"], kind: "agoda", cityId: 16429, label: "Bohol, Philippines" },
    { keys: ["el nido"], kind: "agoda", cityId: 16185, areaId: 539836, label: "El Nido, Palawan" },
    { keys: ["coron"], kind: "agoda", cityId: 16185, areaId: 538237, label: "Coron, Palawan" },
    { keys: ["palawan"], kind: "agoda", cityId: 16185, label: "Palawan, Philippines" },
    { keys: ["bangkok"], kind: "agoda", cityId: 9395, label: "Bangkok, Thailand" },
    { keys: ["tokyo"], kind: "agoda", cityId: 5085, label: "Tokyo, Japan" },
    { keys: ["singapore"], kind: "agoda", cityId: 4064, label: "Singapore" },
    { keys: ["seoul"], kind: "agoda", cityId: 14690, label: "Seoul, South Korea" },
    { keys: ["hong kong"], kind: "agoda", cityId: 16808, label: "Hong Kong" },
    { keys: ["taipei"], kind: "agoda", cityId: 4951, label: "Taipei, Taiwan" },
    { keys: ["dubai"], kind: "agoda", cityId: 2994, label: "Dubai, UAE" },
    { keys: ["baguio"], kind: "agoda", cityId: 17196, label: "Baguio, Philippines" },
    { keys: ["davao"], kind: "agoda", cityId: 9360, label: "Davao, Philippines" },
    { keys: ["iloilo"], kind: "agoda", cityId: 2085, label: "Iloilo, Philippines" },
    { keys: ["dumaguete"], kind: "agoda", cityId: 18871, label: "Dumaguete, Philippines" },
    { keys: ["camiguin"], kind: "agoda", cityId: 105961, label: "Camiguin, Philippines" },
    { keys: ["batanes"], kind: "agoda", cityId: 690284, label: "Batanes, Philippines" },
    { keys: ["tagaytay"], kind: "agoda", cityId: 18218, label: "Tagaytay, Philippines" },
    { keys: ["clark"], kind: "agoda", cityId: 18875, label: "Clark, Philippines" },
    { keys: ["puerto galera"], kind: "agoda", cityId: 18874, label: "Puerto Galera, Philippines" },
    { keys: ["bacolod"], kind: "agoda", cityId: 10562, label: "Bacolod, Philippines" },
    { keys: ["cagayan de oro", "cdo"], kind: "agoda", cityId: 18869, label: "Cagayan de Oro, Philippines" },
    { keys: ["subic"], kind: "agoda", cityId: 18217, label: "Subic, Philippines" },
    { keys: ["vigan"], kind: "agoda", cityId: 390245, areaId: 378699, label: "Vigan, Philippines" },
    { keys: ["legazpi"], kind: "agoda", cityId: 23740, label: "Legazpi, Philippines" }
  ];

  const CITY_HOTELS = {
    manila: ["Okada Manila", "Shangri-La The Fort", "Sofitel Philippine Plaza", "Conrad Manila", "Solaire Resort", "The Manila Hotel", "Grand Hyatt Manila"],
    boracay: ["Henann Palm Beach", "Crimson Boracay", "Discovery Shores", "The Lind Boracay", "Shangri-La Boracay", "Henann Lagoon"],
    siargao: ["Nay Palad Hideaway", "Bravo Beach Resort", "Kalinaw Resort", "Club Tara Resort", "Kermit Surf Resort"],
    bohol: ["Henann Resort Alona", "Amorita Resort", "South Palms Resort Panglao", "The Bellevue Resort", "Panglao Bluewater"],
    "el nido": ["El Nido Garden Resort", "Lime Resort El Nido", "Seda Lio", "The Funny Lion El Nido", "Cauayan Island Resort"],
    coron: ["Two Seasons Coron Island Resort", "Sunlight Guest Hotel", "Barefoot Coron", "Club Paradise Palawan"],
    palawan: ["Astoria Palawan", "Sheridan Beach Resort", "Princesa Garden Island", "Hue Hotels Palawan"],
    bangkok: ["Mandarin Oriental Bangkok", "Shangri-La Bangkok", "Lebua at State Tower", "Siam Kempinski", "The Sukhothai Bangkok"],
    tokyo: ["Park Hyatt Tokyo", "The Peninsula Tokyo", "Mandarin Oriental Tokyo", "Shangri-La Tokyo", "Hotel Gracery Shinjuku"],
    singapore: ["Marina Bay Sands", "Raffles Singapore", "The Fullerton Hotel", "Capella Singapore", "Marina Mandarin Singapore"],
    seoul: ["Signiel Seoul", "Park Hyatt Seoul", "Lotte Hotel Seoul", "Grand Hyatt Seoul", "The Shilla Seoul"],
    "hong kong": ["The Peninsula Hong Kong", "Mandarin Oriental Hong Kong", "Island Shangri-La", "Rosewood Hong Kong"],
    taipei: ["Grand Hyatt Taipei", "W Taipei", "Mandarin Oriental Taipei", "Shangri-La Far Eastern Plaza"],
    dubai: ["Burj Al Arab", "Atlantis The Palm", "Address Downtown", "Jumeirah Beach Hotel", "Armani Hotel Dubai"],
    baguio: ["The Manor at Camp John Hay", "Baguio Country Club", "Hotel Elizabeth Baguio", "The Forest Lodge"],
    davao: ["Seda Abreeza", "Marco Polo Davao", "Waterfront Insular Hotel", "Park Inn Davao"],
    iloilo: ["Seda Atria", "Richmonde Hotel Iloilo", "Courtyard by Marriott Iloilo", "Smallville 21"],
    dumaguete: ["Atmosphere Resort", "Bahura Resort and Spa", "Hotel Essencia", "Bethel Guest House"],
    camiguin: ["Paras Beach Resort", "Secret Cove Beach Resort", "Camiguin Highland Resort"],
    batanes: ["Fundacion Pacita", "Batanes Seaside Lodge", "Fundacion Casa Real"],
    tagaytay: ["Taal Vista Hotel", "Crosswinds Tagaytay", "Nurture Spa Village", "Hotel Kimberly Tagaytay"],
    clark: ["Hilton Clark Sun Valley", "Quest Hotel Clark", "Widus Hotel Clark", "Solaire Resort North"],
    "puerto galera": ["Atlantis Dive Resort", "El Galleon Dive Resort", "Marco Vincent Dive Resort", "Infinity Resort"],
    bacolod: ["Seda Capitol Central", "L'Fisher Hotel", "Park Inn Bacolod", "Sugarland Hotel"],
    "cagayan de oro": ["Seda Centrio", "Limketkai Luxe Hotel", "Mallberry Suites", "N Hotel"],
    cdo: ["Seda Centrio", "Limketkai Luxe Hotel", "Mallberry Suites"],
    subic: ["Lighthouse Marina Resort", "Boardwalk Subic", "Camayan Beach Resort"],
    vigan: ["Hotel Luna", "Grandpa's Inn", "Villa Angela Heritage House", "Hotel Felicidad"],
    legazpi: ["The Oriental Legazpi", "Hotel St. Ellis", "Pepperland Hotel", "Hotel Venezia"]
  };

  function curatedHotels(place) {
    const q = String(place || "").trim().toLowerCase();
    if (!q) return [];
    const out = [];
    const seen = new Set();
    for (const d of DEST) {
      const hit = d.keys.some((k) => q.indexOf(k) !== -1) ||
        (d.label && d.label.toLowerCase().indexOf(q.split(",")[0].trim()) !== -1);
      if (!hit) continue;
      for (const key of d.keys) {
        const list = CITY_HOTELS[key];
        if (!list) continue;
        list.forEach((name) => {
          const k = name.toLowerCase();
          if (seen.has(k)) return;
          seen.add(k);
          out.push(name);
        });
      }
    }
    return out;
  }

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
    btn.addEventListener("click", () => setCur(btn.getAttribute("data-cur")));
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

  function tpWrap(destUrl, campaignId, p) {
    const u = new URL("https://tp.media/r");
    u.searchParams.set("campaign_id", String(campaignId));
    u.searchParams.set("marker", "771660");
    u.searchParams.set("p", String(p));
    u.searchParams.set("trs", "568222");
    u.searchParams.set("u", destUrl);
    return u.toString();
  }

  function klookDest(query) {
    const { checkIn, checkOut, guests, children } = stayDates();
    const u = new URL("https://www.klook.com/hotels/");
    if (query) u.searchParams.set("keyword", query);
    if (checkIn) u.searchParams.set("check_in", checkIn);
    if (checkOut) u.searchParams.set("check_out", checkOut);
    u.searchParams.set("adult_num", String(guests || 2));
    u.searchParams.set("child_num", String(children || 0));
    u.searchParams.set("room_num", "1");
    return u.toString();
  }

  function klookWrap(query) {
    return tpWrap(klookDest(query), 137, 4110);
  }

  function kkdayDest(query) {
    const { checkIn, checkOut } = stayDates();
    const u = new URL("https://www.kkday.com/en/hotels");
    if (query) u.searchParams.set("keyword", query);
    if (checkIn) u.searchParams.set("check_in", checkIn);
    if (checkOut) u.searchParams.set("check_out", checkOut);
    return u.toString();
  }

  function kkdayWrap(query) {
    return tpWrap(kkdayDest(query), 633, 9074);
  }

  function destQuery(dest, typed) {
    if (dest && dest.label) return dest.label;
    if (dest && dest.text) return dest.text;
    return (typed || "").trim();
  }

  function isCebuLocal(dest, typed) {
    if (dest && dest.kind === "local") return true;
    if (dest && Number(dest.cityId) === 4001) return true;
    const q = String((dest && (dest.label || dest.text)) || typed || "").toLowerCase();
    if (!q) return false;
    return q.indexOf("cebu") !== -1 || q.indexOf("mactan") !== -1;
  }

  function fetchSuggest(typed, signal, extra) {
    let url = "/api/dest?q=" + encodeURIComponent(typed);
    if (extra && extra.hotels) url += "&hotels=1";
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
      if (ready && ready.hotelId) {
        location.href = resultsListHref(ready, typed);
        return;
      }
      if (isCebuLocal(ready, typed)) {
        location.href = cebuListHref();
        return;
      }
      location.href = resultsListHref(ready, typed);
    });
  }

  function destCardQuery(a) {
    const href = a.getAttribute("href") || "";
    if (/cebu(\.html)?/i.test(href) && href.indexOf("agoda.com") === -1 && href.indexOf("klook.com") === -1) return "";
    const city = (a.getAttribute("data-city") || "").trim();
    if (city) return city;
    const h3 = a.querySelector("h3");
    if (!h3) return "";
    return String(h3.textContent || "").replace(/^Hotels in\s+/i, "").trim();
  }

  function bindDestCards() {
    document.querySelectorAll("a.dest-card").forEach((a) => {
      const q = destCardQuery(a);
      if (!q) return;
      a.href = klookWrap(q);
      a.target = "_blank";
      a.rel = "noopener";
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

  function cebuListHref() {
    const u = new URL("cebu.html", location.href);
    u.searchParams.set("city", "Cebu, Philippines");
    return "cebu.html" + stayQuery(u);
  }

  function resultsListHref(dest, typed) {
    const u = new URL("results.html", location.href);
    const label = destQuery(dest, typed);
    u.searchParams.set("city", label || typed || "");
    if (dest && dest.hotelId && dest.label) u.searchParams.set("hotel", dest.label);
    return "results.html" + stayQuery(u);
  }

  function bindCebuCard() {
    document.querySelectorAll("a.dest-card").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href.indexOf("cebu") === -1) return;
      if (href.indexOf("agoda.com") !== -1) return;
      if (href.indexOf("klook.com") !== -1 || href.indexOf("tp.media") !== -1) return;
      a.href = cebuListHref();
      a.removeAttribute("target");
    });
  }
  bindCebuCard();

  function pillHref(a) {
    const provider = a.getAttribute("data-provider");
    const hotelName = (a.getAttribute("data-hotel-name") || "").trim();
    if (provider === "klook") return klookWrap(hotelName);
    if (provider === "kkday") return kkdayWrap(hotelName);
    return a.href;
  }

  function bindHotelPills() {
    document.querySelectorAll(".hotel-pill[data-provider]").forEach((a) => {
      a.href = pillHref(a);
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  function hotelCardName(card) {
    if (!card) return "";
    const fromData = (card.getAttribute("data-hotel-name") || "").trim();
    if (fromData) return fromData;
    const h3 = card.querySelector("h3");
    return h3 ? String(h3.textContent || "").trim() : "";
  }

  function bindHotelCards() {
    document.querySelectorAll(".hotel-list .dest-card").forEach((card) => {
      const name = hotelCardName(card);
      if (name && !card.getAttribute("data-hotel-name")) card.setAttribute("data-hotel-name", name);
      if (card.getAttribute("data-bound-hotel") === "1") return;
      card.setAttribute("data-bound-hotel", "1");
      card.addEventListener("click", (e) => {
        if (e.target && e.target.closest && e.target.closest(".hotel-pill")) return;
        const hotelName = hotelCardName(card);
        if (!hotelName) return;
        e.preventDefault();
        window.open(klookWrap(hotelName), "_blank", "noopener");
      });
    });
  }

  const HOTEL_PHOTOS = [
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63ea5b5?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=80"
  ];

  function hotelPhoto(name) {
    const s = String(name || "");
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return HOTEL_PHOTOS[h % HOTEL_PHOTOS.length];
  }

  function displayHotelName(row) {
    const label = String((row && row.label) || "").trim();
    if (row && row.hotelId && label.indexOf(",") !== -1) {
      return label.split(",")[0].trim() || label;
    }
    return label;
  }

  function hotelsFrom(j) {
    const fromField = Array.isArray(j && j.hotels) ? j.hotels : [];
    const fromSug = Array.isArray(j && j.suggestions)
      ? j.suggestions.filter((s) => s && (s.hotelId || s.kind === "hotel"))
      : [];
    const out = [];
    const seen = new Set();
    fromField.concat(fromSug).forEach((h) => {
      if (!destOk(h)) return;
      const key = h.hotelId ? "h" + h.hotelId : String(h.label || "").toLowerCase();
      if (!key || seen.has(key)) return;
      seen.add(key);
      out.push(h);
    });
    return out;
  }

  function renderHotelArticle(name) {
    const safe = escapeHtml(name);
    return '<article class="dest-card" data-hotel-name="' + safe + '">' +
      '<img src="' + hotelPhoto(name) + '" alt="" />' +
      '<div class="meta">' +
      "<h3>" + safe + "</h3>" +
      '<div class="hotel-pills">' +
      '<a class="hotel-pill" data-provider="klook" data-hotel-name="' + safe + '" href="#">Klook</a>' +
      '<a class="hotel-pill" data-provider="kkday" data-hotel-name="' + safe + '" href="#">KKday</a>' +
      "</div></div></article>";
  }

  function paintHotelNames(names) {
    const list = document.querySelector("[data-results-list]") || document.querySelector(".hotel-list");
    const countEl = document.querySelector("[data-hotel-count]");
    if (!list) return;
    const unique = [];
    const seen = new Set();
    (names || []).forEach((n) => {
      const name = String(n || "").trim();
      const key = name.toLowerCase();
      if (!name || seen.has(key)) return;
      seen.add(key);
      unique.push(name);
    });
    if (!unique.length) {
      list.innerHTML = '<p class="hotel-list-status">No hotels yet. Try another city, or tap Search.</p>';
      if (countEl) countEl.textContent = "0 hotels";
      return;
    }
    list.innerHTML = unique.map(renderHotelArticle).join("");
    if (countEl) countEl.textContent = unique.length + (unique.length === 1 ? " hotel" : " hotels");
    bindHotelPills();
    bindHotelCards();
  }

  function fillResults() {
    const list = document.querySelector("[data-results-list]");
    if (!list) return;
    const place = (params.get("hotel") || params.get("city") || "").trim();
    const short = place.split(",")[0].trim() || place || "Hotels";
    const crumb = document.querySelector("[data-results-place]");
    const heading = document.querySelector("[data-results-heading]");
    if (crumb) crumb.textContent = short;
    if (heading) heading.textContent = "Hotels in " + short;
    if (head) {
      head.textContent = short;
      document.title = short + " hotels — Kwarto";
    }
    const pickedHotel = (params.get("hotel") || "").trim();
    const q = pickedHotel || place;
    if (!q) {
      paintHotelNames([]);
      return;
    }
    fetchSuggest(q, null, { hotels: true })
      .then((j) => {
        const names = [];
        if (pickedHotel) names.push(pickedHotel.split(",")[0].trim() || pickedHotel);
        const cityId = j && j.dest && j.dest.cityId;
        hotelsFrom(j).forEach((h) => {
          if (cityId && h.cityId && Number(h.cityId) !== Number(cityId)) return;
          const n = displayHotelName(h);
          if (n) names.push(n);
        });
        curatedHotels(place).forEach((n) => names.push(n));
        if (!names.length && place) names.push(place);
        paintHotelNames(names);
      })
      .catch(() => {
        const names = [];
        if (pickedHotel) names.push(pickedHotel);
        curatedHotels(place).forEach((n) => names.push(n));
        if (!names.length && place) names.push(place);
        paintHotelNames(names);
      });
  }

  bindHotelPills();
  bindHotelCards();
  fillResults();
  ["checkin", "checkout", "guests", "children", "childages"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("change", bindHotelPills);
    el.addEventListener("input", bindHotelPills);
    el.addEventListener("change", bindHotelCards);
    el.addEventListener("input", bindHotelCards);
    el.addEventListener("change", bindCebuCard);
    el.addEventListener("input", bindCebuCard);
    el.addEventListener("change", bindDestCards);
    el.addEventListener("input", bindDestCards);
  });
  document.addEventListener("pointerdown", (e) => {
    const card = e.target && e.target.closest ? e.target.closest("a.dest-card") : null;
    if (card) {
      const q = destCardQuery(card);
      if (q) {
        card.href = klookWrap(q);
        card.target = "_blank";
        card.rel = "noopener";
      }
    }
    const pill = e.target && e.target.closest ? e.target.closest(".hotel-pill[data-provider]") : null;
    if (!pill) return;
    pill.href = pillHref(pill);
  }, true);

  document.querySelectorAll("[data-continue]").forEach((el) => {
    const q = (el.getAttribute("data-hotel-name") || el.getAttribute("data-city") || "Cebu").trim();
    const url = klookWrap(q);
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
})();
