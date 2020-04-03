/* eslint-disable no-restricted-globals */

const PRECACHE = 'messenger-v1'
const PRECACHE_URLS = [
  './',
  './**/*.*',
  './profile',
  './chat_info',
  './group_chat_info',
  './rtc',
  './settings',
  './profile',
  ',/chat',
  './list',
  './login',
]

self.addEventListener('install', () => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) =>
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))),
  ),
)

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return (
        resp ||
        fetch(event.request).then((response) => {
          return caches.open(PRECACHE).then((cache) => {
            cache.put(event.request, response.clone())
            return response
          })
        })
      )
    }),
  )
})
