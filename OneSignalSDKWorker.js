// OneSignal Web Push worker (v16) for GitHub Pages project site.
// Lives at /letter/OneSignalSDKWorker.js, so index.html passes
// serviceWorkerPath + scope in OneSignal.init() (see OneSignal docs:
// "If the file is not at the site root and you omit these options,
// the SDK still fetches https://yoursite.com/OneSignalSDKWorker.js
// and registration fails").
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');
