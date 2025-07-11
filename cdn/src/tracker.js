(function () {
    const scripts = document.getElementsByTagName("script");
    const currentScript = scripts[scripts.length - 1];
    const queryParams = new URLSearchParams(currentScript.src.split("?")[1]);
    const propertyId = queryParams.get("propertyId");
  
    if (!propertyId) return console.warn("Missing propertyId in script src");
  
    const VISITOR_KEY = `visitorId-${propertyId}`;
    const SESSION_KEY = `sessionId-${propertyId}`;
    const SESSION_DATA_KEY = `sessionData-${propertyId}`;
  
    let visitorId = localStorage.getItem(VISITOR_KEY);
    if (!visitorId) {
      visitorId =
        "v-" + (crypto.randomUUID?.() || Math.random().toString(36).substring(2));
      localStorage.setItem(VISITOR_KEY, visitorId);
    }
  
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId =
        "s-" + (crypto.randomUUID?.() || Math.random().toString(36).substring(2));
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }
  
    // Load session data or initialize
    let sessionData = JSON.parse(sessionStorage.getItem(SESSION_DATA_KEY)) || {
      pageViews: 0,
      clicks: 0,
      maxScrollDepth: 0,
      idleTime: 0,
      mouseMoves: 0,
      focusChanges: 0,
      honeypotTriggered: false,
      honeypotValue: null,
    };
  
    const domain = location.hostname.replace(/^www\./, "").toLowerCase();
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const referrer = document.referrer;
    let lastActivity = Date.now();
  
    // Set API host from environment variable or default
    const API_HOST = window.MINIRIPPLE_API_HOST;
  
    fetch(`${API_HOST}/api/v2/blocked-ip/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId, userAgent }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.blocked) {
          console.warn("Blocked visitor:", data.reason || "No reason provided.");
          if (data.redirectUrl) window.location.href = data.redirectUrl;
          return;
        }
  
        trackVisitor();
        createVisitorSession();
        trackPageView();
        setupSPATracking();
        setupBehavioralTracking();
        setupHoneypotDetection();
        startHeartbeat();
        setupEventListeners();
      });
  
    function saveSessionData() {
      sessionStorage.setItem(SESSION_DATA_KEY, JSON.stringify(sessionData));
    }
  
    function trackVisitor() {
      fetch(`${API_HOST}/api/v2/visitor/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Always send string IDs for backend lookup
          visitorId, // string, required
          propertyId, // string, required
          domain,
          userAgent,
          language,
          timezone,
          referrer,
        }),
      }).catch((e) => console.error("[trackVisitor]", e));
    }
  
    function createVisitorSession() {
      fetch(`${API_HOST}/api/v2/visitor/session-start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId, // string, required
          propertyId, // string, required
          sessionId, // string, required
          referrer,
        }),
      }).catch((e) => console.error("[createVisitorSession]", e));
    }
  
    function trackPageView() {
      sessionData.pageViews++;
      saveSessionData();
      fetch(`${API_HOST}/api/v2/visitor/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId, // string, required
          sessionId, // string, required
          propertyId, // string, required
          url: window.location.href,
          url_title: document.title,  // new addition
        }),
      }).catch((e) => console.error("[trackPageView]", e));
    }
  
    // --- Modular Behavioral tracking for bot detection ---
    function setupBehavioralTracking() {
      // Load or initialize behavioral fields
      sessionData.mouseMoves = sessionData.mouseMoves || 0;
      sessionData.focusChanges = sessionData.focusChanges || 0;
      // Remove persist function, use saveSessionData directly
      document.addEventListener("mousemove", () => {
        sessionData.mouseMoves++;
        saveSessionData();
      });
      window.addEventListener("focus", () => {
        sessionData.focusChanges++;
        saveSessionData();
      });
      window.addEventListener("blur", () => {
        sessionData.focusChanges++;
        saveSessionData();
      });
    }
  
    // --- Modular Honeypot field detection ---
    function setupHoneypotDetection() {
      const honeypotName = "_miniripple_hp";
      function injectHoneypot(form) {
        if (form.querySelector(`[name='${honeypotName}']`)) return;
        const input = document.createElement("input");
        input.type = "text";
        input.name = honeypotName;
        input.style.display = "none";
        form.appendChild(input);
      }
      document.querySelectorAll("form").forEach(injectHoneypot);
      const observer = new MutationObserver(() => {
        document.querySelectorAll("form").forEach(injectHoneypot);
      });
      observer.observe(document.body, { childList: true, subtree: true });
      // Listen for form submissions and update sessionData if triggered
      document.addEventListener("submit", function (e) {
        const form = e.target;
        const hp = form.querySelector(`[name='${honeypotName}']`);
        if (hp && hp.value) {
          sessionData.honeypotTriggered = true;
          sessionData.honeypotValue = hp.value;
          saveSessionData();
        }
      }, true);
    }
  
    function startHeartbeat() {
      setInterval(() => {
        const now = Date.now();
        sessionData.idleTime += now - lastActivity;
        lastActivity = now;
        saveSessionData();
        fetch(`${API_HOST}/api/v2/visitor/heartbeat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId, // string, required
            sessionId, // string, required
            propertyId, // string, required
            pageViews: sessionData.pageViews,
            clicks: sessionData.clicks,
            scrollDepth: Math.round(sessionData.maxScrollDepth),
            idleTime: Math.round(sessionData.idleTime / 1000),
            mouseMoves: sessionData.mouseMoves || 0,
            focusChanges: sessionData.focusChanges || 0,
            endTime: new Date().toISOString(),
            honeypotTriggered: sessionData.honeypotTriggered || false,
            honeypotValue: sessionData.honeypotValue || null,
          }),
        }).catch(e => console.error("[startHeartbeat]", e));
      }, 5000);
    }
  
    function trackSessionEnd() {
      const payload = JSON.stringify({
        visitorId, // string, required
        sessionId, // string, required
        propertyId, // string, required
        pageViews: sessionData.pageViews,
        clicks: sessionData.clicks,
        scrollDepth: Math.round(sessionData.maxScrollDepth),
        idleTime: Math.round(sessionData.idleTime / 1000),
        mouseMoves: sessionData.mouseMoves || 0,
        focusChanges: sessionData.focusChanges || 0,
        honeypotTriggered: sessionData.honeypotTriggered || false,
        honeypotValue: sessionData.honeypotValue || null,
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          `${API_HOST}/api/v2/visitor/session-end`,
          new Blob([payload], { type: "application/json" })
        );
      } else {
        fetch(`${API_HOST}/api/v2/visitor/session-end`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
        }).catch((e) => console.error("[trackSessionEnd]", e));
      }
    }
  
    // --- Event Listeners ---
    function setupEventListeners() {
      document.addEventListener("click", () => {
        sessionData.clicks++;
        lastActivity = Date.now();
        saveSessionData();
      });
  
      // Debounced scroll handler for performance
      let scrollTimeout;
      document.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const scrolled =
            (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
          const depth = Math.min(scrolled * 100, 100);
          if (depth > sessionData.maxScrollDepth) {
            sessionData.maxScrollDepth = depth;
            saveSessionData();
          }
          lastActivity = Date.now();
        }, 100);
      });
  
      window.addEventListener("beforeunload", () => {
        trackSessionEnd();
      });
    }
  
    function setupSPATracking() {
      let lastTrackedUrl = window.location.href;
      function handlePageViewChange() {
        if (window.location.href !== lastTrackedUrl) {
          lastTrackedUrl = window.location.href;
          trackPageView();
        }
      }
  
      window.addEventListener("popstate", handlePageViewChange);
      const origPushState = history.pushState;
      const origReplaceState = history.replaceState;
      history.pushState = function (...args) {
        origPushState.apply(this, args);
        handlePageViewChange();
      };
      history.replaceState = function (...args) {
        origReplaceState.apply(this, args);
        handlePageViewChange();
      };
      window.addEventListener("hashchange", handlePageViewChange);
    }
  })();
  