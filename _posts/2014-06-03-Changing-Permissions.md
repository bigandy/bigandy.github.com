---
layout: post
published: true
category: blog
title: Changing File Permissions on OSX
summary: I wanted to find out how to create a read-only file, and here's how I did it.
post_id: 7
---

I wanted to create a read-only template for future posts on this site (I'm using [jekyll](http://jekyllrb.com/) because of github pages integration).

Using the terminal, I use [iTerm2](http://www.iterm2.com/#/section/home) because it is the dog's bollocks, type:

<pre><code>chmod 0444 /path/to/file/file.md</code></pre>

e.g. in my case I have done this for this site

<pre><code>chmod 0444 _posts/2014-01-01-READ_ONLY.md</code></pre>

so when I create a new post I have a starting point.