---
layout: null
---
importScripts('/js/vendor/serviceworker-cache-polyfill.js');

var cacheName = 'bigandy-cache-v27';
var filesToCache = [
	'/',
	'/index.html',
	// Stylesheets
	'/css/style.css',
	'/css/font.css',

	// Favicon
	'/favicon.ico',

	// Posts
	{% for post in site.posts %}
	'{{ post.url }}/index.html', {% endfor %}

	{% for page in site.pages %}'{{ page.url }}',
	{% endfor %}
];

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if ([cacheName].indexOf(key) === -1) {
					return caches.delete(keyList[i]);
				}
			});
		})
	);
});

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('caching files');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('fetch', function(event) {
	var requestUrl = new URL(event.request.url);

	event.respondWith(
		caches.match(event.request)
			.then(function(match) {
				if (match) {
					console.log('* [Serving cached]: ' + event.request.url);
					return match;
				}

				// Redirecting /about to /about/index.html
				if ((requestUrl.pathname == '/about') || (requestUrl.pathname === '/about/')) {
					console.log('about success!');
					return fetch('/about/index.html');
				}

				// Redirecting /blog to /blog/index.html
				if ((requestUrl.pathname == '/blog') || (requestUrl.pathname === '/blog/')) {
					console.log('blog success!');
					return fetch('/blog/index.html');
				}

				// Redirecting /demos to /demos/index.html
				if ((requestUrl.pathname == '/demos') || (requestUrl.pathname === '/demos/')) {
					console.log('demos success!');
					return fetch('/demos/index.html');
				}

				console.log('* [Fetching]: ' + event.request.url);
				return fetch(event.request);
			}
		)
	);

});
