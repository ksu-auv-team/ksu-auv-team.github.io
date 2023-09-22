document.addEventListener("DOMContentLoaded", function () {
    const currentPageUrl = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");
        if (currentPageUrl.endsWith(linkHref)) {
            link.classList.add("active");
        }
    });
});

function openDialog() {
    document.getElementById('dialog').style.display = 'initial';
}

function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}