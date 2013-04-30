spsu-auv-team.github.com
========================
This repository is our website.

**DO NOT** rename or delete this repository 

**DO NOT** create a repository named `spsu-auv-team.github.io` it will override this one.

Editing webpages
----------------
0. Understand compile script
1. Edit webpages that are in the prebuild folder
2. run the compile script
3. Move files from the build directory to the top directory
4. **DO NOT** edit files in the top directory. Exceptions:
   * any *.css file
   * CNAME
   * README.md

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
1. Create an `.md` file with the following format `yyyy-mm-dd-post-short-name.md`
  * for example a post created on Apr 30, 2013 named _New Testing Equipment_ can be named `2013-04-30-new-equipment.md`
  * use dashes for word spacing, must be all lowercase
2. Paste the following in to the top of the `.md` file :
```ruby
---
layout: post
title: "New Website is Up and Running"
description: 
category: 
tags: []
image:
---
{% include JB/setup %}
```

3. foo



