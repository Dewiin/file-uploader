function showAlert(variant, title, message) {
    const iconType = {
        "primary": "info-circle",
        "success": "check2-circle",
        "neutral": "gear",
        "warning": "exclamation-triangle",
        "danger": "exclamation-octagon",
    };

    // Create alert element
    const alert = document.createElement("sl-alert");
    alert.variant = variant;
    alert.closable = true;
    alert.duration = 3000; 
    alert.innerHTML = `
        <sl-icon slot="icon" name="${iconType[variant]}"></sl-icon>
        <strong style="font-size: 1rem">${title}</strong> <br>
        ${message}
    `;

    // Append to alerts container
    document.querySelector(".sl-alert-container").appendChild(alert);

    // Show it
    alert.toast();
}

// Empty Preview Alert
document.addEventListener("DOMContentLoaded", () => {
    const emptyPreview = document.querySelector(".empty-preview");
    if (emptyPreview) {
        showAlert("primary", "This folder is empty", "Upload files and create folders using the buttons on the left.");
    }
});

// Upload File Alert
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("status") === "success") {
        showAlert("success", "Folder created successfully!");
    }
});