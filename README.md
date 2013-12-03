spsu-auv-team.github.com
========================
This repository is our website.

**DO NOT** rename or delete this repository 

**DO NOT** create a repository named `spsu-auv-team.github.io` it will override this one.

File Naming Standards
---------------------
_NOTE: these rules differ from the AUV standard_
* *NO* underscores, spaces, dashes, or camel-casing
 * Exception: Files standard users do not go to directly (Ex. css files, posts) may have underscores or dashes
* All files need to have an extension
 * Exception: CNAME
* No word condensing
* Profile pages must be named with the member's first initial followed by their last name
* All filenames must be lowercase

Making a Post
-------------
* Create an `.md` file with the following format `yyyy-mm-dd-post-short-name.md`
  * for example a post created on Apr 30, 2013 named _New Testing Equipment_ can be named `2013-04-30-new-equipment.md`
  * use dashes for word spacing, must be all lowercase
* Paste then fill out the following in to the top of the `.md` file :

```ruby
---
layout: post
title: 
description: 
category: 
tags: []
image:
author: 
---
{% include JB/setup %}
```
Using the example from above:
```ruby
---
layout: post
title: "New Testing Equipment"
description: "Today we made our new testing equipment"
category: Structure
tags:["testing", "progress"]
image: tequip.png
author: tmartin357
---
{% include JB/setup %}
```

* There can be one main image per post; copy your image in to the `/images/` directory.
  * Main Image is optional
* The body of your post is below the copied stuff
  * It is parsed in markdown

Adding a Gallery to your post
-----------------------------
* Create a directory for your gallery in the `/galleries/` directory
* Create thumbnails

```bash
for i in $(ls *.jpg); do convert -scale 100 $i thumbs/$i; done
```
* Add your gallery to the post using the following as an example

```html
<div id="links">
    <a href="{{ BASE_PATH }}/galleries/MakerFaire/1.jpg" title="Joe">
        <img src="{{ BASE_PATH }}/galleries/MakerFaire/thumbs/1.jpg" alt="Joe">
    </a>
    <a href="{{ BASE_PATH }}/galleries/MakerFaire/2.jpg" title="People">
        <img src="{{ BASE_PATH }}/galleries/MakerFaire/thumbs/2.jpg" alt="People">
    </a>
    <a href="{{ BASE_PATH }}/galleries/MakerFaire/3.jpg" title="More People">
        <img src="{{ BASE_PATH }}/galleries/MakerFaire/thumbs/3.jpg" alt="More People">
    </a>
    <a href="{{ BASE_PATH }}/galleries/MakerFaire/4.jpg" title="Less People, More Stuff">
        <img src="{{ BASE_PATH }}/galleries/MakerFaire/thumbs/4.jpg" alt="Less People, More Stuff">
    </a>
</div>
```

