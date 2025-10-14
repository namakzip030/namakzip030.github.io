// Service Worker for 나막집 웹사이트
// 버전을 업데이트하면 새로운 캐시가 생성됩니다
const CACHE_NAME = 'namakzip-v2.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/indexen.html',
  '/indexja.html',
  '/indexzh-Hans.html',
  '/indexzh-Hant.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - 즉시 활성화
self.addEventListener('install', (event) => {
  self.skipWaiting(); // 즉시 활성화
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - Network First 전략 (항상 최신 버전 우선)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 네트워크에서 가져온 후 캐시 업데이트
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // 네트워크 실패 시에만 캐시 사용
        return caches.match(event.request);
      })
  );
});

// Activate event - 즉시 제어권 획득
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // 즉시 모든 클라이언트 제어
    })
  );
});

