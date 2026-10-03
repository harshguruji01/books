/**
 * HarshGuruJi Admin Access Guard — Books Subdomain
 * Strict Security Policy:
 * Admin management is EXCLUSIVELY permitted from the Master Admin Panel (admin.html) at the main site (www.webguruji.online).
 * Direct access to admin pages on the books subdomain is permanently forbidden and denied permission.
 */
(function () {
  'use strict';

  var REQUIRED_EMAIL = 'harshguruji01@gmail.com';
  var REQUIRED_ID = '2547277654';
  var AUTH_STATE_KEY = 'hg_2step_verified';
  var AUTH_TOKEN_KEY = 'hg_2step_token';
  var EXPECTED_HASH = btoa(REQUIRED_EMAIL + ':' + REQUIRED_ID + ':HGJ_MASTER_ADMIN_2026');

  function isVerified() {
    try {
      var isAuth = (sessionStorage.getItem(AUTH_STATE_KEY) === 'true') || (localStorage.getItem(AUTH_STATE_KEY) === 'true');
      var token = sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY);
      var email = sessionStorage.getItem('admin_apk_email') || localStorage.getItem('admin_apk_email');

      if (isAuth && token === EXPECTED_HASH && email && email.toLowerCase() === REQUIRED_EMAIL) {
        return true;
      }
    } catch (e) {}
    return false;
  }

  // If not verified from admin.html on main site, block completely
  if (!isVerified()) {
    if (document.documentElement) {
      document.documentElement.style.display = 'none';
    }
    try {
      sessionStorage.clear();
      alert("⛔ Access Denied — Permission Denied\n\nAdministrative controls are strictly restricted.\nAdmin access is ONLY allowed through the Master Admin Panel (admin.html) on the main website.\n\nRedirecting to main site...");
    } catch (e) {}

    window.location.replace('https://www.webguruji.online/admin.html');
  }
})();
