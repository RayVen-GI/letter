// Minimal Service Worker for letter site.
// Needed to show notifications + required for push (OneSignal / Web Push).
// NOTE: by itself it does NOT send pushes to a closed tablet -
// pushes are sent via OneSignal dashboard (see ONESIGNAL_SETUP.txt).

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// Show notification when push arrives (OneSignal / Web Push uses this too)
self.addEventListener('push', (event) => {
  let data = { title: '💌 Тебе письмо!', body: 'Открой сайт — там новое ❤️', url: './' };
  try {
    if (event.data) {
      const j = event.data.json();
      data = { ...data, ...j };
    }
  } catch (e) { /* keep defaults */ }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './screenshots/photo1.jpg',
      data: { url: data.url || './' }
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || './';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ('focus' in c) {
          c.navigate(url);
          return c.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
