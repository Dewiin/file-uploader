function showAlert(variant, message) {
    console.log("ping!");
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
    alert.duration = 5000; 
    alert.innerHTML = `
        <sl-icon slot="icon" name="${iconType[variant]}"></sl-icon>
        ${message}
    `;

    // Append to alerts container
    document.querySelector(".sl-alert-container").appendChild(alert);

    // Show it
    alert.toast();
}

window.showAlert = showAlert;