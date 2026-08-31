(function () {
  var root = document.getElementById("guest-root");
  var trigger = document.getElementById("guests-trigger");
  var guestsEl = document.getElementById("guests");
  var childrenEl = document.getElementById("children");
  var agesEl = document.getElementById("childages");
  if (!root || !trigger || !guestsEl) return;

  var adults = clamp(parseInt(guestsEl.value || "2", 10) || 2, 1, 4);
  var children = clamp(parseInt((childrenEl && childrenEl.value) || "0", 10) || 0, 0, 4);
  var ages = parseAges(agesEl && agesEl.value);
  var picking = -1;

  function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
  }
  function parseAges(raw) {
    var parts = String(raw || "").split(",");
    var list = [];
    var i;
    for (i = 0; i < children; i++) {
      var s = parts[i];
      if (s == null || String(s).trim() === "") {
        list.push(null);
        continue;
      }
      var n = parseInt(s, 10);
      list.push(isNaN(n) ? null : clamp(n, 0, 17));
    }
    return list;
  }
  function total() { return adults + children; }
  function label() {
    var n = total();
    return n === 1 ? "1 Guest" : n + " Guests";
  }
  function ageLabel(age) {
    if (age == null) return "Select";
    if (age === 0) return "Under 1";
    return String(age);
  }
  function agesReady() {
    var i;
    for (i = 0; i < children; i++) {
      if (ages[i] == null) return false;
    }
    return true;
  }
  function syncHidden() {
    guestsEl.value = String(adults);
    if (childrenEl) childrenEl.value = String(children);
    if (agesEl) {
      agesEl.value = ages.slice(0, children).map(function (a) {
        return a == null ? "" : String(a);
      }).join(",");
    }
  }
  function ageListHtml(selected) {
    var html = "";
    var onSelect = selected == null;
    html += '<button type="button" class="guest-age-opt' + (onSelect ? " is-on" : "") + '" role="option" data-age-opt="" aria-selected="' + (onSelect ? "true" : "false") + '">Select</button>';
    html += '<button type="button" class="guest-age-opt' + (selected === 0 ? " is-on" : "") + '" role="option" data-age-opt="0" aria-selected="' + (selected === 0 ? "true" : "false") + '">Under 1</button>';
    var i;
    for (i = 1; i <= 17; i++) {
      html += '<button type="button" class="guest-age-opt' + (selected === i ? " is-on" : "") + '" role="option" data-age-opt="' + i + '" aria-selected="' + (selected === i ? "true" : "false") + '">' + i + "</button>";
    }
    return html;
  }
  function paintAges() {
    var box = root.querySelector("[data-guest-ages]");
    var copy = root.querySelector("[data-guest-price-copy]");
    if (copy) copy.hidden = children < 1;
    if (!box) return;
    if (children < 1) {
      box.hidden = true;
      box.innerHTML = "";
      picking = -1;
      return;
    }
    box.hidden = false;
    var html = "";
    var i;
    for (i = 0; i < children; i++) {
      var age = ages[i];
      var empty = age == null;
      var open = picking === i;
      html += '<div class="guest-age-row' + (open ? " is-open" : "") + '">';
      html += '<label class="guest-age-label" id="child-age-label-' + i + '">Child ' + (i + 1) + ' Age <span class="guest-req" aria-hidden="true">*</span></label>';
      html += '<button type="button" class="guest-age-select' + (empty ? " is-empty" : "") + '" data-child-age="' + i + '" aria-labelledby="child-age-label-' + i + '" aria-haspopup="listbox" aria-expanded="' + (open ? "true" : "false") + '">' + ageLabel(age) + "</button>";
      html += '<div class="guest-age-list" data-age-list="' + i + '" role="listbox" aria-labelledby="child-age-label-' + i + '"' + (open ? "" : " hidden") + ">" + ageListHtml(age) + "</div>";
      html += "</div>";
    }
    box.innerHTML = html;
  }
  function paintSteppers() {
    var a = root.querySelector('[data-guest-count="adults"]');
    var c = root.querySelector('[data-guest-count="children"]');
    if (a) a.textContent = String(adults);
    if (c) c.textContent = String(children);
    var minusA = root.querySelector('[data-guest-minus="adults"]');
    var plusA = root.querySelector('[data-guest-plus="adults"]');
    var minusC = root.querySelector('[data-guest-minus="children"]');
    var plusC = root.querySelector('[data-guest-plus="children"]');
    if (minusA) minusA.disabled = adults <= 1;
    if (plusA) plusA.disabled = adults >= 4;
    if (minusC) minusC.disabled = children <= 0;
    if (plusC) plusC.disabled = children >= 4;
  }
  function paintDone() {
    var done = root.querySelector("[data-guest-done]");
    if (!done) return;
    var ok = agesReady();
    done.disabled = !ok;
    done.setAttribute("aria-disabled", ok ? "false" : "true");
  }
  function paint() {
    paintSteppers();
    paintAges();
    paintDone();
    trigger.textContent = label();
    syncHidden();
  }
  function closeCalIfOpen() {
    var cal = document.getElementById("cal-root");
    if (cal && !cal.hidden) {
      var x = cal.querySelector("[data-cal-close]");
      if (x) x.click();
    }
  }
  function placePanel() {
    var panel = root.querySelector(".guest-panel");
    if (!panel) return;
    if (window.matchMedia("(max-width: 720px)").matches) {
      root.style.position = "";
      panel.style.position = "";
      panel.style.left = "";
      panel.style.top = "";
      panel.style.right = "";
      return;
    }
    var tBox = trigger.getBoundingClientRect();
    var inset = 16;
    var pw = panel.offsetWidth || 320;
    var ph = panel.offsetHeight || 220;
    var left = tBox.left;
    var top = tBox.bottom + 8;
    var maxLeft = Math.max(inset, window.innerWidth - pw - inset);
    if (left > maxLeft) left = maxLeft;
    if (left < inset) left = inset;
    var maxTop = Math.max(inset, window.innerHeight - ph - inset);
    if (top > maxTop) top = Math.max(inset, tBox.top - ph - 8);
    if (top < inset) top = inset;
    panel.style.position = "fixed";
    panel.style.left = Math.round(left) + "px";
    panel.style.top = Math.round(top) + "px";
    panel.style.right = "auto";
  }
  function closeAgeList() {
    picking = -1;
  }
  function openAgeList(i) {
    picking = i;
    paint();
    placePanel();
    requestAnimationFrame(function () {
      placePanel();
      var list = root.querySelector('[data-age-list="' + i + '"]');
      if (list) list.scrollIntoView({ block: "nearest" });
    });
  }
  function openGuest() {
    closeCalIfOpen();
    root.hidden = false;
    document.body.classList.add("guest-open");
    paint();
    placePanel();
    requestAnimationFrame(placePanel);
  }
  function closeGuest() {
    closeAgeList();
    root.hidden = true;
    document.body.classList.remove("guest-open");
    paint();
  }
  function tryDone() {
    if (!agesReady()) {
      var first = -1;
      var i;
      for (i = 0; i < children; i++) {
        if (ages[i] == null) { first = i; break; }
      }
      if (first >= 0) {
        openAgeList(first);
        var btn = root.querySelector('[data-child-age="' + first + '"]');
        if (btn) btn.focus();
      }
      return;
    }
    closeGuest();
  }
  function setAdults(n) {
    adults = clamp(n, 1, 4);
    paint();
    placePanel();
  }
  function setChildren(n) {
    children = clamp(n, 0, 4);
    while (ages.length < children) ages.push(null);
    ages.length = children;
    closeAgeList();
    paint();
    placePanel();
  }
  function setAge(i, raw) {
    if (i < 0 || i >= 4) return;
    if (raw === "") ages[i] = null;
    else {
      var n = parseInt(raw, 10);
      ages[i] = isNaN(n) ? null : clamp(n, 0, 17);
    }
    closeAgeList();
    paint();
    placePanel();
  }

  paint();
  trigger.addEventListener("click", function (e) {
    e.preventDefault();
    if (root.hidden) openGuest();
  });
  root.addEventListener("click", function (e) {
    var t = e.target;
    var opt = t.closest("[data-age-opt]");
    if (opt) {
      var list = opt.closest("[data-age-list]");
      var idx = list ? parseInt(list.getAttribute("data-age-list"), 10) : picking;
      if (!isNaN(idx)) setAge(idx, opt.getAttribute("data-age-opt"));
      return;
    }
    var ageBtn = t.closest("[data-child-age]");
    if (ageBtn) {
      var i = parseInt(ageBtn.getAttribute("data-child-age"), 10);
      if (isNaN(i)) return;
      if (picking === i) {
        closeAgeList();
        paint();
        placePanel();
      } else {
        openAgeList(i);
      }
      return;
    }
    if (picking >= 0 && !t.closest(".guest-age-row")) {
      closeAgeList();
      paint();
      placePanel();
    }
    if (t.closest("[data-guest-done]")) {
      tryDone();
      return;
    }
    if (t.closest("[data-guest-close]")) closeGuest();
    else if (t.closest('[data-guest-minus="adults"]')) setAdults(adults - 1);
    else if (t.closest('[data-guest-plus="adults"]')) setAdults(adults + 1);
    else if (t.closest('[data-guest-minus="children"]')) setChildren(children - 1);
    else if (t.closest('[data-guest-plus="children"]')) setChildren(children + 1);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (picking >= 0) {
      closeAgeList();
      paint();
      placePanel();
      return;
    }
    if (!root.hidden) closeGuest();
  });
  document.addEventListener("mousedown", function (e) {
    if (root.hidden) return;
    if (root.contains(e.target)) return;
    if (e.target.closest && e.target.closest(".guest-trigger")) return;
    closeGuest();
  });
  window.addEventListener("resize", function () {
    if (!root.hidden) placePanel();
  });
  window.addEventListener("scroll", function () {
    if (!root.hidden) placePanel();
  }, true);
})();
