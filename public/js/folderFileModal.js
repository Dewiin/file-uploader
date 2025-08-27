// Add Folder
const addFolderButton = document.querySelector(".sl-btn.new-folder");
const addFolderModal = document.querySelector(".modal-container.new-folder");
addFolderButton.addEventListener("click", () => {
	addFolderModal.show();
});

// Add File
const addFileButton = document.querySelector(".sl-btn.new-file");
const addFileModal = document.querySelector(".modal-container.new-file");
addFileButton.addEventListener("click", () => {
	addFileModal.show();
});

// Edit Folder
const editFolderButton = document.querySelector(".sl-btn.edit-folder");
const editFolderModal = document.querySelector(".modal-container.edit-folder");
editFolderButton.addEventListener("click", () => {
	editFolderModal.show();
});

// Delete Folder
const deleteFolderButton = document.querySelector(".sl-btn.delete-folder");
const deleteFolderModal = document.querySelector(".modal-container.delete-folder");
deleteFolderButton.addEventListener("click", () => {
	deleteFolderModal.show();
});

