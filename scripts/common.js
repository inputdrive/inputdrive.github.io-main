/* common.js
 * Shared small utility used across pages:
 * - sets a `lastModified` element text when present
 * - fetches basic IP/region info and writes into a `demo` element when present
 * Runs automatically on DOMContentLoaded.
 */
(function () {
  'use strict';

  function setLastModified(id) {
    var el = document.getElementById(id || 'lastModified');
    if (!el) return;
    try {
      var d = new Date(document.lastModified);
      el.textContent = 'Page last edited: ' + d;
    } catch (e) {
      // swallow errors; don't break page
      console.error('setLastModified error', e);
    }
  }

  function fetchAndRenderIP(id) {
    var el = document.getElementById(id || 'demo');
    if (!el) return;

    // Allow deployments to opt-out of external IP fetching for privacy
    var disableViaBody = document.body && document.body.dataset && document.body.dataset.disableIpFetch === 'true';
    var meta = document.querySelector('meta[name="disable-ip-fetch"]');
    var disableViaMeta = meta && meta.getAttribute('content') === 'true';
    if (disableViaBody || disableViaMeta) {
      // explicit opt-out present; do not fetch
      return;
    }

    // Keep this call minimal and privacy-conscious: only show region and IP
    fetch('https://ipapi.co/json/')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data) return;
        if (data.region) el.innerHTML += '<p>Your browser Region: ' + data.region + '</p>';
        if (data.ip) el.innerHTML += '<p>Your browser IP Address: ' + data.ip + '</p>';
      })
      .catch(function (err) {
        // Fail silently for users who block external requests
        console.error('ip fetch error', err);
      });
  }

  function run() {
    setLastModified();
    fetchAndRenderIP();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
