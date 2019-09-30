---
title: "About"
permalink: "/about.html"
description: "Platform Operations will be working on creating tutorials and practical implementation of the dockerisation of any application. Tutorials created here are purely example based, which will help you dockerize your application and run it as a container"
image: assets/images/logo.png
---

{{site.description}}

**Features**

Containerising the following

<ul>
  {% for tech in site.article-catergories %}
  <li>
    {{tech}}
  </li>
  {% endfor %}
</ul>
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://jinnabalu.github.io/resume/" allowfullscreen
    scrolling="no"></iframe>
</div>

<br><br>
<a target="_blank" class="text-dark" href="https://www.wowthemes.net/pintereso-free-bootstrap-jekyll-theme/">
Made with
<i class="fa fa-heart text-danger"></i>
<u>Pintereso Jekyll Theme</u>.
</a>!

{% include buy-me-a-coffee.html %}