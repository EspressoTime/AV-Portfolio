var staticCacheName = 'angelav-portfolio-v1';
const urlsToCache = [ //list of resources to cache
	'/',
	'/index.html',
	'/manifest.json',
	'/css/styles.css',
	'/img/HeadshotFinalSM.webp',
	'/img/github.svg',
	'/img/hypnotize.webp',
	'/img/linkedin.svg',
	'/img/RaylanFaviconBlue.png',

];

//Add resources to cache during service worker install
self.addEventListener('install', function(event) {
	self.skipWaiting();
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			console.log('Adding initial resources to cache.')
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function(event){
	if(event.request.method === 'PUT' || event.request.method === 'POST'){  //Omit PUT/POST requests from service worker https://stackoverflow.com/questions/35270702/can-service-workers-cache-post-requests
		return;
	}

	//Respond from cache, then network
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) return response;
			return fetch(event.request).then(function(response) {
				let responseClone = response.clone(); //clone response to cache and return
				//add any new resources to cache
				if (!event.request.url.includes('proj')) {
					caches.open(staticCacheName).then(function(cache) {
						cache.put(event.request, responseClone);
					});
				}
				return response;
			});
		})
	);

});