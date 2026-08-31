(function () {
  var root = document.getElementById("cal-root");
  var inEl = document.getElementById("checkin");
  var outEl = document.getElementById("checkout");
  if (!inEl || !outEl) return;
  if (!root) {
    root = document.createElement("div");
    root.id = "cal-root";
    root.className = "cal-root";
    root.hidden = true;
    root.innerHTML =
      '<div class="cal-backdrop" data-cal-close></div>' +
      '<div class="cal-panel" role="dialog" aria-modal="true" aria-label="Stay dates">' +
      '<div class="cal-handle" aria-hidden="true"></div>' +
      '<div class="cal-top"><p class="cal-summary" data-cal-summary></p>' +
      '<button type="button" class="cal-x" data-cal-close aria-label="Close">×</button></div>' +
      '<div class="cal-navrow">' +
      '<button type="button" class="cal-nav" data-cal-prev aria-label="Previous month">&#8249;</button>' +
      '<p class="cal-nav-spacer" aria-hidden="true"></p>' +
      '<button type="button" class="cal-nav" data-cal-next aria-label="Next month">&#8250;</button></div>' +
      '<div class="cal-months">' +
      '<div class="cal-monthcol">' +
      '<p class="cal-month" data-cal-month></p>' +
      '<div class="cal-week" aria-hidden="true"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>' +
      '<div class="cal-grid" data-cal-grid></div></div>' +
      '<div class="cal-monthcol">' +
      '<p class="cal-month" data-cal-month-next></p>' +
      '<div class="cal-week" aria-hidden="true"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>' +
      '<div class="cal-grid" data-cal-grid-next></div></div>' +
      '</div></div>';
    var host = document.querySelector(".nc-search-wrap") || document.body;
    host.appendChild(root);
  }

  var grid = root.querySelector("[data-cal-grid]");
  var gridNext = root.querySelector("[data-cal-grid-next]");
  var monthEl = root.querySelector("[data-cal-month]");
  var monthNextEl = root.querySelector("[data-cal-month-next]");
  var summaryEl = root.querySelector("[data-cal-summary]");
  var view = parseYmd(inEl.value || "2026-09-12");
  view.setDate(1);
  var start = inEl.value || "2026-09-12";
  var end = outEl.value || "2026-09-15";
  var picking = "in";

  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function ymd(d) {
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function parseYmd(s) {
    var p = (s || "").split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }
  function pretty(s) {
    if (!s) return "";
    return parseYmd(s).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  function todayYmd() {
    var n = new Date();
    return ymd(new Date(n.getFullYear(), n.getMonth(), n.getDate()));
  }
  function rangeLabel() {
    if (start && end) return pretty(start) + " – " + pretty(end);
    if (start) return pretty(start) + " – …";
    return "Add dates";
  }
  function paintTriggers() {
    document.querySelectorAll(".date-trigger").forEach(function (btn) {
      btn.textContent = rangeLabel();
    });
    inEl.value = start;
    outEl.value = end;
  }
  function paintSummary() {
    if (!summaryEl) return;
    if (start && end) summaryEl.textContent = pretty(start) + " – " + pretty(end);
    else if (start) summaryEl.textContent = pretty(start) + " – Check-out";
    else summaryEl.textContent = "Pick check-in";
  }
  function fillGrid(gridEl, monthTitleEl, y, m) {
    var cursor = new Date(y, m, 1);
    monthTitleEl.textContent = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    gridEl.innerHTML = "";
    var startPad = cursor.getDay();
    var dim = new Date(y, m + 1, 0).getDate();
    var today = todayYmd();
    var i;
    for (i = 0; i < startPad; i++) {
      var blank = document.createElement("span");
      blank.className = "cal-blank";
      gridEl.appendChild(blank);
    }
    for (i = 1; i <= dim; i++) {
      var d = new Date(y, m, i);
      var key = ymd(d);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = String(i);
      btn.setAttribute("data-day", key);
      btn.className = "cal-day";
      if (key < today) btn.disabled = true;
      var inSel = !!(start && end && key >= start && key <= end);
      if (key === start) btn.classList.add("is-start");
      if (key === end) btn.classList.add("is-end");
      if (start && end && key > start && key < end) btn.classList.add("is-range");
      if (inSel) {
        var dow = d.getDay();
        if (dow === 0 || key === start) btn.classList.add("is-range-start-row");
        if (dow === 6 || key === end) btn.classList.add("is-range-end-row");
      }
      gridEl.appendChild(btn);
    }
  }
  function render() {
    var y = view.getFullYear();
    var m = view.getMonth();
    fillGrid(grid, monthEl, y, m);
    fillGrid(gridNext, monthNextEl, y, m + 1);
    paintSummary();
  }
  function placePanel() {
    var panel = root.querySelector(".cal-panel");
    if (!panel) return;
    if (window.matchMedia("(max-width: 720px)").matches) {
      root.style.position = "";
      panel.style.position = "";
      panel.style.left = "";
      panel.style.top = "";
      panel.style.right = "";
      return;
    }
    var trigger = document.querySelector(".date-trigger") || document.querySelector(".nc-hero-search, form.search");
    if (!trigger) return;
    var inset = 16;
    var tBox = trigger.getBoundingClientRect();
    var wrap = document.querySelector(".nc-hero-search, form.search, .nc-search-wrap");
    var leftBase = wrap ? wrap.getBoundingClientRect().left : tBox.left;
    var pw = panel.offsetWidth || 680;
    var ph = panel.offsetHeight || 420;
    var left = leftBase;
    var top = tBox.bottom + 8;
    var findBtn = document.querySelector('.nc-hero-search button[type="submit"], .search button[type="submit"]');
    if (findBtn) {
      var fBox = findBtn.getBoundingClientRect();
      var gap = 12;
      if (left + pw > fBox.left - gap) {
        var shifted = fBox.left - gap - pw;
        if (shifted >= inset) left = shifted;
      }
    }
    var maxLeft = Math.max(inset, window.innerWidth - pw - inset);
    if (left > maxLeft) left = maxLeft;
    if (left < inset) left = inset;
    var maxTop = Math.max(inset, window.innerHeight - ph - inset);
    if (top > maxTop) top = maxTop;
    if (top < inset) top = inset;
    panel.style.position = "fixed";
    panel.style.left = Math.round(left) + "px";
    panel.style.top = Math.round(top) + "px";
    panel.style.right = "auto";
  }
  function openCal() {
    var guestRoot = document.getElementById("guest-root");
    if (guestRoot && !guestRoot.hidden) {
      var gx = guestRoot.querySelector("[data-guest-close]");
      if (gx) gx.click();
    }
    picking = "in";
    view = parseYmd(start || todayYmd());
    view.setDate(1);
    root.hidden = false;
    document.body.classList.add("cal-open");
    render();
    placePanel();
    requestAnimationFrame(placePanel);
  }
  function closeCal() {
    ensureNight();
    root.hidden = true;
    document.body.classList.remove("cal-open");
    paintTriggers();
  }
  function addDay(s) {
    var d = parseYmd(s);
    d.setDate(d.getDate() + 1);
    return ymd(d);
  }
  function ensureNight() {
    if (start && (!end || end <= start)) end = addDay(start);
  }
  function pickDay(key) {
    if (picking !== "out" || !start || (start && end && picking === "in")) {
      start = key;
      end = "";
      picking = "out";
      inEl.value = start;
      outEl.value = end;
      paintTriggers();
      render();
      return;
    }
    if (key <= start) {
      start = key;
      end = "";
      picking = "out";
      inEl.value = start;
      outEl.value = end;
      paintTriggers();
      render();
      return;
    }
    end = key;
    picking = "in";
    ensureNight();
    inEl.value = start;
    outEl.value = end;
    paintTriggers();
    closeCal();
  }

  paintTriggers();
  document.querySelectorAll(".date-trigger").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (root.hidden) openCal();
    });
  });
  root.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest("[data-cal-close]")) closeCal();
    else if (t.closest("[data-cal-prev]")) { view.setMonth(view.getMonth() - 1); render(); }
    else if (t.closest("[data-cal-next]")) { view.setMonth(view.getMonth() + 1); render(); }
    else if (t.getAttribute && t.getAttribute("data-day") && !t.disabled) pickDay(t.getAttribute("data-day"));
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !root.hidden) closeCal();
  });
  document.addEventListener("mousedown", function (e) {
    if (root.hidden) return;
    if (root.contains(e.target)) return;
    if (e.target.closest && e.target.closest(".date-trigger")) return;
    closeCal();
  });
  window.addEventListener("resize", function () {
    if (!root.hidden) placePanel();
  });
  window.addEventListener("scroll", function () {
    if (!root.hidden) placePanel();
  }, true);
})();
