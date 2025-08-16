// Add Folder
const addFolder = document.querySelector(".sl-btn.new-folder");
const folderModal = document.querySelector(".modal-container.new-folder");
const closeFolder = document.querySelector(".new-folder .close-modal");

addFolder.addEventListener("click", () => {
    folderModal.show();
});

closeFolder.addEventListener("click", () => {
    folderModal.hide();
});

// Add File
const addFile = document.querySelector(".sl-btn.new-file");
const fileModal = document.querySelector(".modal-container.new-file");
const closeFile = document.querySelector(".new-file .close-modal");

addFile.addEventListener("click", () => {
    fileModal.show();
});

closeFile.addEventListener("click", () => {
    fileModal.hide();
})