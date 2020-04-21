var version = "0.0.4";
var cacheName = "fenki.net";
if (location.search.indexOf('nosw') == -1 && false){
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/css/style.{{time}}.css',
        '/assets/js/app.{{time}}.js',
        '/assets/font/fenki.woff',
        '/assets/img/fenki_icon.svg',
        '/assets/snd/right_answer.mp3',
        '/assets/snd/click.m4a',
        '/assets/snd/lesson_complete.mp3',
        '/assets/snd/lesson_failed.mp3',
        '/assets/snd/wrong_answer.mp3',
        '/assets/snd/loop.m4a',
        "/assets/img/golden_star.png",
        "/assets/img/t-shirt.png",
        "/assets/img/trophy_badge.png",
        "/assets/img/uranus.png",
        "/assets/img/congratulations.png",
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if ( event.request.url.indexOf( 'data/ver.json' ) !== -1 ) {
      return false;
  }
    event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
}
