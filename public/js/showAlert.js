function showAlert(variant, message) {
    const iconType = {
        "primary": "info-circle",
        "success": "check2-circle",
        "neutral": "gear",
        "warning": "exclamation-triangle",
        "danger": "exclamation-octagon",
    };

    // Create alert element
    const alert = document.createElement("sl-alert", {
        variant,
        closable: true,
        duration: 3000,
        innerHTML: `
            <sl-icon slot="icon" name="${iconType[variant]}"></sl-icon>
            ${message}
        `,
    });
    // alert.variant = variant; // "success", "warning", "danger", "primary"
    // alert.closable = true;
    // alert.duration = 3000; // auto-hide after 3s
    // alert.innerHTML = `
    //     <sl-icon slot="icon" name="${type === 'success' ? 'check2-circle' : 'exclamation-triangle'}"></sl-icon>
    //     ${message}
    // `;

    // Append to alerts container
    document.querySelector(".sl-alert-container").appendChild(alert);

    // Show it
    alert.toast();
}

module.exports = showAlert;