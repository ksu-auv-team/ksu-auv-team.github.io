document.addEventListener("DOMContentLoaded", function () {
    const copyText = document.querySelector(".copy-text");

    copyText.addEventListener("click", function () {
        // Get the text within the element
        const textToCopy = copyText.textContent;

        // Create a temporary textarea element to hold the text
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);

        // Select and copy the text from the textarea
        textarea.select();
        document.execCommand("copy");

        // Remove the temporary textarea
        document.body.removeChild(textarea);

        copyText.classList.add("copied-animation");

        setTimeout(() => {
            copyText.classList.remove("copied-animation");
        }, 400);
    });
});
