(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------ navbar */

  const nav = $("#nav");
  const sheet = $("#nav-sheet");
  const toggle = $("#menu-toggle");
  const iconMenu = $("#icon-menu");
  const iconClose = $("#icon-close");

  const onScroll = () => {
    nav.dataset.scrolled = String(window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    sheet.dataset.open = String(open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    iconMenu.hidden = open;
    iconClose.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => setMenu(sheet.dataset.open !== "true"));
  $$("a", sheet).forEach((link) => link.addEventListener("click", () => setMenu(false)));

  // Scroll spy: the section nearest the top of the viewport band is the active one.
  const navLinks = $$("[data-nav]");
  const spyTargets = Array.from(new Set(navLinks.map((link) => link.dataset.nav)))
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.dataset.active = String(link.dataset.nav === id);
    });
  };

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    spyTargets.forEach((section) => spy.observe(section));
  }

  /* ------------------------------------------------------------ reveal */

  const revealItems = $$(".reveal");

  if ("IntersectionObserver" in window) {
    const reveal = new IntersectionObserver(
      (records) => {
        records.forEach((record) => {
          if (!record.isIntersecting) return;
          record.target.dataset.shown = "true";
          reveal.unobserve(record.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    revealItems.forEach((item) => reveal.observe(item));
  } else {
    revealItems.forEach((item) => {
      item.dataset.shown = "true";
    });
  }

  /* --------------------------------------------------------- accordion */

  // One row open at a time per list, matching the original behaviour.
  $$("[data-accordion]").forEach((list) => {
    const rows = $$(".work-row", list);

    const setRow = (row, open) => {
      const button = $(".work-toggle", row);
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const sign = $(".work-sign", row);
      row.dataset.open = String(open);
      button.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
      sign.textContent = open ? "−" : "+";
    };

    rows.forEach((row) => {
      $(".work-toggle", row).addEventListener("click", () => {
        const willOpen = row.dataset.open !== "true";
        rows.forEach((other) => setRow(other, other === row ? willOpen : false));
      });
    });
  });

  /* ------------------------------------------------------- log filters */

  const tabsBox = $("#log-tabs");
  const indicator = $("#log-indicator");

  if (tabsBox && indicator) {
    const tabs = $$('[role="tab"]', tabsBox);
    const items = $$(".log-item");

    const measureIndicator = (scrollIntoView) => {
      const active = tabs.find((tab) => tab.getAttribute("aria-selected") === "true");
      if (!active) return;

      indicator.style.left = `${active.offsetLeft}px`;
      indicator.style.width = `${active.offsetWidth}px`;

      if (scrollIntoView) {
        const target = active.offsetLeft - (tabsBox.clientWidth - active.offsetWidth) / 2;
        tabsBox.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
      }
    };

    // The fade only appears on a side that actually has more to scroll to.
    let fadeFrame = 0;
    const measureFade = () => {
      fadeFrame = 0;
      const max = tabsBox.scrollWidth - tabsBox.clientWidth;
      if (max <= 1) {
        tabsBox.dataset.fade = "none";
        return;
      }
      const atStart = tabsBox.scrollLeft <= 1;
      const atEnd = tabsBox.scrollLeft >= max - 1;
      tabsBox.dataset.fade = atStart ? "end" : atEnd ? "start" : "both";
    };
    const scheduleFade = () => {
      if (!fadeFrame) fadeFrame = requestAnimationFrame(measureFade);
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const kind = tab.dataset.filter;
        tabs.forEach((other) => other.setAttribute("aria-selected", String(other === tab)));
        items.forEach((item) => {
          item.hidden = kind !== "All" && item.dataset.kind !== kind;
        });
        measureIndicator(true);
      });
    });

    tabsBox.addEventListener("scroll", scheduleFade, { passive: true });
    window.addEventListener("resize", () => {
      measureIndicator(false);
      scheduleFade();
    });

    measureIndicator(false);
    scheduleFade();
    // Web fonts change the tab widths once they load.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measureIndicator(false);
        scheduleFade();
      });
    }
  }

  /* ------------------------------------------------------------ ticker */

  const track = $("#ticker-track");

  if (track) {
    // Duplicate the list once: the minimum a -50% translate loop needs to be seamless.
    Array.from(track.children).forEach((child) => track.appendChild(child.cloneNode(true)));

    let tickFrame = 0;
    const measureTicker = () => {
      tickFrame = 0;
      const speed =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--marquee-speed"),
        ) || 26;
      const loopDistance = track.scrollWidth / 2;
      if (loopDistance > 0) track.style.animationDuration = `${loopDistance / speed}s`;
    };
    const scheduleTicker = () => {
      if (!tickFrame) tickFrame = requestAnimationFrame(measureTicker);
    };

    scheduleTicker();
    window.addEventListener("resize", scheduleTicker, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleTicker);
  }
})();
