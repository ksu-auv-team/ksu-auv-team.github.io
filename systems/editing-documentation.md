# Editing Documentation

This website is hosted on [GitHub Pages](https://pages.github.com/) with [Jekyll](https://jekyllrb.com/). This means that we don't have to deal with separate hosting, and we can write site pages in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), which Jekyll will render as soon as the new files are pushed to the repository. All the content on the site is stored in the /_docs folder of the [ksu-auv-team.github.io repository.](https://github.com/ksu-auv-team/ksu-auv-team.github.io) 

### Editing a page
Edit that page in the repository and commit it. The changes will show up in a few minutes.

### Adding a new page
Create a new Markdown (recommended) or HTML file in the _docs folder of the repository, like if you were editing a page. For the new page to be loaded in the bar, you'll need YAML "front matter" at the beginning of the file. YAML is a markup language. The acronym is either [Yet Another Markup Language or YAML Ain't Markup Language](http://yaml.org/), depending on who you ask, and Jekyll uses it for its configuration. For these documentation pages, you only need a few lines (note that they're case sensitive): 

```yaml
---
title: Title
category: Category
order: Number
---
```

The title field will be displayed as the page title. The category field determines what category the page will be listed under in the sidebar. The order field determines what order pages are listed in on the sidebar. The page URL will be the same as the file path from the /_docs folder, not the title in the front matter.

### Removing a page
To remove a page, delete that file.

### Configuration

We can also edit site configuration (like style) by editing repo files.

#### Jekyll/theme

This site uses the [Edition Jekyll theme](https://github.com/CloudCannon/edition-jekyll-template), which is made for documentation, which is why it provides the navigation sidebar. That theme's configuration file is _config.yml, a YAML file. The theme tells Jekyll how to load and render the HTML, CSS, and Markdown files.

#### HTML/CSS
The site layout is HTML files in /_layouts, styles are in main.scss and /_sass, and images are in /images. Since the site is rebuilt every time you push to it, you can edit those files too, even though they're part of the theme. It has already been modified to use our images and color and to make the text smaller.