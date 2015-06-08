---
layout: null
---
importScripts('js/vendor/serviceworker-cache-polyfill.js');

var cacheName = 'bigandy.github.io-cache-v1';
var filesToCache = [
    // Stylesheets
    '/css/style.css',
    '/css/font.css',

    // Posts
    {% for post in site.posts %}
    "{{ post.url }}", {% endfor %}

    {% for page in site.pages %}'{{ page.url }}',
    {% endfor %}
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {

    console.log(event);
    var requestUrl = new URL(event.request.url);


    event.respondWith(
        caches.match(event.request)
            .then(function(match) {
                if (match) {
                    console.log('* [Serving cached]: ' + event.request.url);
                    return match;
                }

                // Redirecting /blog to /blog/index.html
                if ((requestUrl.pathname == '/blog') || (requestUrl.pathname == '/blog/')) {
                    return fetch('/blog/index.html');
                }

                console.log('* [Fetching]: ' + event.request.url);
                return fetch(event.request);
            }
        )
    );
});