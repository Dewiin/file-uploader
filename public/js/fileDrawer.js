const files = document.querySelectorAll(".files-container > .file");

files.forEach((file) => {
    file.addEventListener("click", () => {
        const drawer = file.nextElementSibling;
        drawer.show();
    })
});

const closeButtons = document.querySelectorAll('sl-drawer > .drawer-close-button');
closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
        const drawer = closeButton.parentElement;
        drawer.hide();
    })
});


