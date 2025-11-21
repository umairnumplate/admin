const CACHE_NAME = 'noor-ul-masajid-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.ts',
  '/components/Sidebar.tsx',
  '/components/Header.tsx',
  '/components/Dashboard.tsx',
  '/components/StudentProfile.tsx',
  '/components/DashboardSlider.tsx',
  '/components/TeacherDashboard.tsx',
  '/components/StudentDashboard.tsx',
  '/components/LoginPage.tsx',
  '/components/SignupPage.tsx',
  '/components/Reports.tsx'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Add all assets to the cache, but don't block the service worker from installing if some fail.
        return cache.addAll(urlsToCache).catch(err => {
            console.warn('Not all assets were cached:', err);
        });
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});