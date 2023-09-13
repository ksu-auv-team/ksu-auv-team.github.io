document.addEventListener("DOMContentLoaded", function () {
    const bubblesContainer = document.getElementById("home_main");

    // Number of bubbles to create
    const numberOfBubbles = 15;

    // Range for bubble width (minWidth and maxWidth)
    const minWidth = 2; // 2rem
    const maxWidth = 5; // 5rem

    // Generate and append bubbles
    for (let i = 0; i < numberOfBubbles; i++) {
        const bubble = document.createElement("span");
        bubble.classList.add("underwater_bubble");

        // Random position within the container
        const randomX = Math.random() * 95; // 0% to 100%
        const randomY = Math.random() * 95; // 0% to 100%
        bubble.style.left = `${randomX}%`;
        bubble.style.top = `${randomY}%`;

        // Random width within the specified range
        const randomWidth = minWidth + Math.random() * (maxWidth - minWidth);
        bubble.style.width = `${randomWidth}rem`;

        bubblesContainer.appendChild(bubble);
    }
});