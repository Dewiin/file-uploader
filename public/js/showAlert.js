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

// Alerts
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const type = params.get("type");
    const action = params.get("action");
    const status = params.get("status");

    const alertConfigs = {
        folder: {
            create: {
                success: {
                    variant: "success",
                    title: "Folder created successfully!",
                    message: "View new folders in the sidebar.",
                },
                error: {
                    variant: "warning",
                    title: "Something went wrong",
                    message: "Your folder could not be created.",
                },
            },
            delete: {
                success: {
                    variant: "danger",
                    title: "Folder removed",
                    message: "Your folder has been permanently deleted."
                },
                error: {
                    variant: "warning",
                    title: "Something went wrong",
                    message: "Your folder failed to be deleted."
                }
            },
            update: {
                success: {
                    variant: "success",
                    title: "File successfully edited!",
                    message: "Your folder has been renamed."
                },
                error: {
                    variant: "warning",
                    title: "Something went wrong",
                    message: "Your folder failed to update."
                }
            }
        },
        file: {
            create: {
                success: {
                    variant: "success",
                    title: "File uploaded successfully!",
                    message: "Click on files to view details and information.",
                },
                error: {
                    variant: "warning",
                    title: "Something went wrong",
                    message: "Your file failed to upload.",
                },
            },
            delete: {
                success: {
                    variant: "danger",
                    title: "File removed",
                    message: "Your file has been permanently deleted."
                },
                error: {
                    variant: "warning",
                    title: "Something went wrong",
                    message: "Your file failed to be deleted."
                }
            },
        },
    };

    const config = alertConfigs[type][action][status];
    if (config) {
        showAlert(config.variant, config.title, config.message);
    }
});